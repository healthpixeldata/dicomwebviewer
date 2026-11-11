/** @type {AppTypes.Config} */

// Secure, minimal default configuration.
//
// This is what a plain production build with no APP_CONFIG produces, so it is
// deliberately locked down:
//   - The local file data source (`dicomlocal`) and the runtime `?url=` sources
//     (`dicomjson`, `dicomwebproxy`) are NOT enabled — they widen the attack
//     surface of a default deployment.
//   - `?customization=` URL loading is OFF: no `customizationUrlPrefixes` are
//     configured, so any `?customization=` value is rejected (and aborts boot
//     rather than silently loading).
//   - `dangerouslyUseDynamicConfig` (the `configUrl` query parameter) is off.
//
// It does not need to "just work" untouched — point the data source below at
// your own DICOMweb server. For a fully-featured setup with every data source
// and customization loading enabled, see config/dev.js (local development) and
// config/netlify.js (the public demo deploy).
window.config = {
  name: 'config/default.js',
  routerBasename: null,
  // whiteLabeling: {},
  extensions: [],
  modes: [],
  customizationService: {},

  // --- URL-driven customizations (?customization=) ----------------------------
  // OFF by default. To allow loading customization data files from the URL, set
  // `customizationUrlPrefixes` to a map of allowed prefixes. The `default` prefix
  // (no slashes) is used for values with no leading slash; every other prefix
  // must start AND end with a slash and is matched against the leading
  // `/segment/` of the value. Files are fetched and parsed as JSONC data — they
  // are never executed. Example (left disabled here on purpose):
  //
  // customizationUrlPrefixes: {
  //   default: './customizations/',                       // ?customization=tools/ctPresets
  //   '/remote/': 'https://cdn.example.com/ohif-custom/', // ?customization=/remote/siteA
  // },
  // ----------------------------------------------------------------------------

  // --- Native ("next") Generic Viewport --------------------------------------
  // OFF by default. Set `enabled: true` (or pass ?useNextViewports=true in the
  // URL) to drive viewports through cornerstone's native GenericViewport
  // ("next") API instead of the legacy Stack/Volume viewport classes.
  genericViewports: {
    enabled: false,
    // Render backend selection: 'cpu' | 'webgl' | 'auto' | a backend id
    // registered via cornerstone's registerRenderBackend (e.g. a webgpu
    // backend), or a map with per-viewport-type overrides, e.g.
    // { default: 'webgl', orthographic: 'cpu' }. The matching URL params take
    // precedence per-session: ?viewportRendering=cpu and
    // ?orthographic.viewportRendering=cpu.
    // viewportRendering: 'auto',
  },
  // ----------------------------------------------------------------------------
  showStudyList: true,
  // Image decoding (JPEG 2000 / JPEG-LS / RLE) runs in web workers; MPR and 3D need every slice
  // decoded, so more workers = faster volume loading. The real count is capped at
  // (CPU cores - 1). Lower this to 3 if a specific Windows machine has trouble.
  maxNumberOfWebWorkers: 8,
  // below flag is for performance reasons, but it might not work for all servers
  showWarningMessageForCrossOrigin: true,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  experimentalStudyBrowserSort: false,
  strictZSpacingForVolumeViewport: true,
  groupEnabledModesFirst: true,
  allowMultiSelectExport: false,
  maxNumRequests: {
    interaction: 100,
    thumbnail: 5,
    // Prefetch number is dependent on the http protocol. For http 2 or
    // above, the number of requests can be go a lot higher.
    // MPR / 3D volume loading uses the prefetch pool. Raise it (e.g. 50-100) when the server or
    // reverse proxy speaks HTTP/2; keep ~25 on plain HTTP/1.1 (browsers cap at 6 connections).
    prefetch: 50,
  },

  // ===========================================================================
  // Innowave options
  // ===========================================================================

  // false = show ONLY the opened study: no prior studies of the same patient are queried
  // or listed in the study browser. true (default) = list the patient's other studies.
  loadPriorStudies: true,

  // MPR / 3D crash recovery. 'reload' (default) swallows the VTK/WebGL "context lost" error and
  // reloads the page once to restore the GPU; 'off' disables it.
  webglRecovery: 'reload',

  // GPU memory for MPR / 3D: true = half-float 3D textures (half the memory, faster upload,
  // slightly less precision above ~2048 HU). Left undefined it is ON automatically for
  // iPhone/iPad (required there for MPR to render) and OFF elsewhere. Try true on slow GPUs.
  // preferSizeOverAccuracy: true,

  // Text shown over each image. Any DICOM keyword works (tag), several can be combined with a
  // template. Lines whose value is missing are skipped. Remove/add items freely.
  //   position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  //   format:   'name' (FAMILY^GIVEN -> "FAMILY GIVEN") | 'date' (20250131 -> 2025-01-31)
  patientOverlay: {
    enabled: true,
    position: 'topLeft',
    fontSize: '14px',
    items: [
      { label: 'PN:', tag: 'PatientName', format: 'name' },
      // Combined line, like the old viewer's "AMIT SAINI 31/M (M)":
      // { template: 'PN: {PatientName} {PatientAge}/{PatientSex} ({PatientSex})' },
      { label: 'Age:', tag: 'PatientAge' },
      { label: 'PID:', tag: 'PatientID' },
      { label: 'Accession:', tag: 'AccessionNumber' },
      { label: 'DOB:', tag: 'PatientBirthDate', format: 'date' },
      // { label: 'Sex:', tag: 'PatientSex' },
      // { label: 'Referring:', tag: 'ReferringPhysicianName', format: 'name' },
      // { template: '{StudyDescription} [{Modality}]' },
    ],
  },
  showErrorDetails: 'always', // 'always', 'dev', 'production'
  // `dangerouslyUseDynamicConfig` (load configuration from a `configUrl` query
  // parameter) is intentionally left OFF in the secure default build. See
  // config/dev.js for the documented shape.
  defaultDataSourceName: 'orthanc', // the dcm4chee-arc server below (name kept for existing URLs)
  dataSources: [
    {
      // Read-only public demo server. Replace with your own DICOMweb server.
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'ohif',
      configuration: {
        friendlyName: 'AWS S3 Static wado server',
        name: 'aws',
        wadoUriRoot: 'https://d14fa38qiwhyfd.cloudfront.net/dicomweb',
        qidoRoot: 'https://d14fa38qiwhyfd.cloudfront.net/dicomweb',
        wadoRoot: 'https://d14fa38qiwhyfd.cloudfront.net/dicomweb',
        qidoSupportsIncludeField: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'thumbnail',
        thumbnailRequestStrategy: 'fetch',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        staticWado: true,
        // Multiframe SEG loads fetch the whole instance as a single Part 10
        // object by default and wait for it: the per-frame endpoint is
        // efficient, but SEG frames are so small and numerous that one bulk
        // fetch beats hundreds of tiny requests. Per-frame loading is the
        // exception — set loadMultiframeAsPart10: false here to force it.
        singlepart: 'bulkdata,video',
        bulkDataURI: {
          enabled: true,
          relativeResolution: 'studies',
          transform: url => url.replace('/pixeldata.mp4', '/rendered'),
        },
        omitQuotationForMultipartRequest: true,
      },
    },

    {
      // dcm4chee-arc (Innowave / Freedom PACS). Edit the host and AE title for your server.
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'orthanc',
      configuration: {
        friendlyName: 'dcm4chee-arc',
        name: 'DCM4CHEE',
        wadoUriRoot: 'https://freedomnano.ddns.net:8443/dcm4chee-arc/aets/FREEDOM/wado',
        qidoRoot: 'https://freedomnano.ddns.net:8443/dcm4chee-arc/aets/FREEDOM/rs',
        wadoRoot: 'https://freedomnano.ddns.net:8443/dcm4chee-arc/aets/FREEDOM/rs',
        qidoSupportsIncludeField: true,
        supportsReject: true,
        dicomUploadEnabled: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: false,
        omitQuotationForMultipartRequest: true,
        bulkDataURI: { enabled: true },

        // MPR / 3D speed trade-off. By default the server sends each image in its stored
        // compression (e.g. JPEG 2000) and the browser decodes it. On a fast LAN you can ask the
        // server to send uncompressed pixels instead, which removes the decoding cost entirely:
        // requestTransferSyntaxUID: '1.2.840.10008.1.2.1', // Explicit VR Little Endian
        // (dcm4chee then transcodes on the fly: faster viewer, more server CPU and bandwidth.)
      },
    },

    // The following data sources are intentionally NOT enabled in the secure
    // default because they broaden the attack surface of a default deployment.
    // Enable them only in a deployment you control (see config/dev.js):
    //   - dicomlocal:    loads DICOM files from the user's machine.
    //   - dicomjson:     loads metadata from an arbitrary `?url=` (gate with
    //                    `dangerouslyAllowedOriginsForAuthenticatedEnvironments`).
    //   - dicomwebproxy: delegating proxy driven by `?url=`.
  ],
  httpErrorHandler: error => {
    // This is 429 when rejected from the public idc sandbox too often.
    console.warn(error.status);

    // Could use services manager here to bring up a dialog/modal if needed.
    console.warn('test, navigate to https://ohif.org/');
  },
};
