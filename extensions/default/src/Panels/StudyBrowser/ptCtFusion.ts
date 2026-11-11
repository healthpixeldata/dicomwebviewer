import { classes } from '@ohif/core';

/**
 * Innowave: "Fusion" series thumbnails for PET/CT studies.
 *
 * For every reconstructable PT series x every reconstructable CT series, a synthetic thumbnail is appended to the study's
 * series list. Double-clicking it applies a hanging protocol (built on the fly,
 * bound to exactly that CT + PT pair) showing PET fused on CT in axial,
 * sagittal and coronal views. The URL and the current mode do not change.
 */
const { MetadataProvider } = classes;

export const FUSION_PREFIX = 'innowave-fusion';
const PROTOCOL_ID = 'innowave-ptct-fusion';
const PT_VOI_ATTRIBUTE = 'innowavePTVOIRange';

type Services = { servicesManager: any; commandsManager: any };

const isFusionUID = (uid: string) => typeof uid === 'string' && uid.startsWith(`${FUSION_PREFIX}:`);

function findPairs(studyEntries: any[], displaySetService) {
  const pairs = [];
  const resolved = studyEntries
    .map(e => ({ entry: e, ds: displaySetService.getDisplaySetByUID(e.displaySetInstanceUID) }))
    .filter(x => x.ds && !x.ds.unsupported);

  const cts = resolved.filter(
    x => x.ds.Modality === 'CT' && x.ds.isReconstructable
  );
  const pts = resolved.filter(
    x =>
      x.ds.Modality === 'PT' &&
      x.ds.isReconstructable &&
      !/^fusion/i.test(x.ds.SeriesDescription || '')
  );

  // Every PT x CT combination, like the streaming viewer's auto-generated
  // "Fusion: <CT> / <PT>" series: all CTs for the first PET, then all CTs for the next.
  // The volumes are placed by their patient coordinates, so the frame-of-reference
  // UID is not required to match.
  const bySeries = (a, b) => (Number(a.ds.SeriesNumber) || 0) - (Number(b.ds.SeriesNumber) || 0);
  [...pts].sort(bySeries).forEach(pt => {
    [...cts].sort(bySeries).forEach(ct => {
      pairs.push({ ct, pt });
    });
  });
  return pairs;
}

/** Adds fusion thumbnails to the tabs produced by createStudyBrowserTabs. */
export function appendFusionThumbnails(tabs, displaySetService) {
  try {
    return tabs.map(tab => ({
      ...tab,
      studies: tab.studies.map(study => {
        const pairs = findPairs(study.displaySets || [], displaySetService);
        if (!pairs.length) {
          return study;
        }
        const extra = pairs.map(({ ct, pt }) => ({
          displaySetInstanceUID: `${FUSION_PREFIX}:${ct.ds.displaySetInstanceUID}:${pt.ds.displaySetInstanceUID}`,
          description: `Fusion: ${ct.ds.SeriesNumber ?? ''} - ${ct.ds.SeriesDescription || 'CT'} / ${pt.ds.SeriesNumber ?? ''} - ${pt.ds.SeriesDescription || 'PT'}`,
          seriesNumber: 'F',
          modality: 'PT/CT',
          seriesDate: pt.entry.seriesDate,
          numInstances: pt.entry.numInstances,
          StudyInstanceUID: study.studyInstanceUid,
          componentType: 'thumbnail',
          imageSrc: pt.entry.imageSrc || ct.entry.imageSrc,
        }));
        return { ...study, displaySets: [...extra, ...study.displaySets] };
      }),
    }));
  } catch (e) {
    console.warn('Fusion thumbnails skipped:', e);
    return tabs;
  }
}

const cameraSync = (id: string) => ({ type: 'cameraPosition', id, source: true, target: true });

function fusionViewport(name: string, orientation: string, camId: string) {
  return {
    viewportOptions: {
      viewportId: `fusion${name}`,
      viewportType: 'volume',
      orientation,
      toolGroupId: 'mpr',
      initialImageOptions: { preset: 'middle' },
      syncGroups: [
        cameraSync(camId),
        { type: 'voi', id: 'fusionCTWLSync', source: false, target: true },
        {
          type: 'voi',
          id: 'fusionWLSync',
          source: true,
          target: true,
          options: { syncColormap: true },
        },
        {
          type: 'voi',
          id: 'fusionPTWLSync',
          source: false,
          target: true,
          options: { syncColormap: false, syncInvertState: false },
        },
      ],
    },
    displaySets: [
      { id: 'ctDisplaySet' },
      {
        id: 'ptDisplaySet',
        options: {
          colormap: {
            name: 'hsv',
            opacity: [
              { value: 0, opacity: 0 },
              { value: 0.1, opacity: 0.8 },
              { value: 1, opacity: 0.9 },
            ],
          },
          voi: { custom: PT_VOI_ATTRIBUTE },
        },
      },
    ],
  };
}

function buildProtocol(ctUID: string, ptUID: string) {
  const byUID = (uid: string, modality: string) => ({
    seriesMatchingRules: [
      { attribute: 'Modality', constraint: { equals: modality }, required: true },
      { attribute: 'displaySetInstanceUID', constraint: { equals: uid }, required: true },
    ],
  });
  const narrow = typeof window !== 'undefined' && window.innerWidth <= 768;
  return {
    id: PROTOCOL_ID,
    locked: true,
    name: 'PET/CT fusion',
    createdDate: '2026-01-01T00:00:00.000Z',
    modifiedDate: '2026-01-01T00:00:00.000Z',
    availableTo: {},
    editableBy: {},
    imageLoadStrategy: 'interleaveTopToBottom',
    protocolMatchingRules: [],
    displaySetSelectors: {
      ctDisplaySet: byUID(ctUID, 'CT'),
      ptDisplaySet: byUID(ptUID, 'PT'),
    },
    stages: [
      {
        name: 'Fusion',
        viewportStructure: {
          layoutType: 'grid',
          properties: narrow ? { rows: 3, columns: 1 } : { rows: 1, columns: 3 },
        },
        viewports: [
          fusionViewport('AXIAL', 'axial', 'axialSync'),
          fusionViewport('SAGITTAL', 'sagittal', 'sagittalSync'),
          fusionViewport('CORONAL', 'coronal', 'coronalSync'),
        ],
        createdDate: '2026-01-01T00:00:00.000Z',
      },
    ],
    numberOfPriorsReferenced: -1,
  };
}

/** Applies the fusion layout for the clicked synthetic thumbnail. */
export function openFusion(uid: string, { servicesManager, commandsManager }: Services): boolean {
  if (!isFusionUID(uid)) {
    return false;
  }
  const [, ctUID, ptUID] = uid.split(':');
  const { hangingProtocolService, displaySetService } = servicesManager.services;
  const pt = displaySetService.getDisplaySetByUID(ptUID);
  if (!pt || !displaySetService.getDisplaySetByUID(ctUID)) {
    return true;
  }

  // Window/level for PT: SUV 0-5 when SUV scaling is available, like the TMTV mode.
  hangingProtocolService.addCustomAttribute(PT_VOI_ATTRIBUTE, 'PT VOI for fusion', props => {
    const ptDisplaySet = props.find(imageSet => imageSet.Modality === 'PT');
    if (!ptDisplaySet) {
      return;
    }
    const { imageId } = ptDisplaySet.images[0];
    const scaling = MetadataProvider.get('scalingModule', imageId);
    if (scaling && scaling.suvbw) {
      return { windowWidth: 5, windowCenter: 2.5 };
    }
    return;
  });

  hangingProtocolService.addProtocol(PROTOCOL_ID, buildProtocol(ctUID, ptUID) as any);
  commandsManager.runCommand('setHangingProtocol', {
    protocolId: PROTOCOL_ID,
    activeStudyUID: pt.StudyInstanceUID,
    reset: true,
    restoreCachedLayout: false,
  });
  return true;
}
