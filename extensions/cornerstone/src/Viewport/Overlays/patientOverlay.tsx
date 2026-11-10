import React from 'react';

/**
 * Innowave: configurable patient / study text for the viewport overlay.
 *
 * Configure in app-config.js:
 *
 *   patientOverlay: {
 *     enabled: true,
 *     position: 'topLeft',          // topLeft | topRight | bottomLeft | bottomRight
 *     fontSize: '14px',
 *     color: undefined,             // e.g. '#4dd8e6'; default follows the overlay colour
 *     items: [
 *       { label: 'PN:', tag: 'PatientName', format: 'name' },
 *       { label: 'Age:', tag: 'PatientAge' },
 *       { label: 'PID:', tag: 'PatientID' },
 *       { label: 'Accession:', tag: 'AccessionNumber' },
 *       { label: 'DOB:', tag: 'PatientBirthDate', format: 'date' },
 *       // any DICOM keyword works, and `template` combines several:
 *       { template: 'Sex: {PatientSex}' },
 *       { template: '{StudyDescription} ({Modality})' },
 *     ],
 *   }
 *
 * A line whose value is empty is skipped, so missing tags never leave a blank "Age:".
 */

export type PatientOverlayItem = {
  label?: string;
  tag?: string;
  template?: string;
  format?: 'name' | 'date';
};

export type PatientOverlayConfig = {
  enabled?: boolean;
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  fontSize?: string;
  color?: string;
  items?: PatientOverlayItem[];
};

export const DEFAULT_PATIENT_OVERLAY_ITEMS: PatientOverlayItem[] = [
  { label: 'PN:', tag: 'PatientName', format: 'name' },
  { label: 'Age:', tag: 'PatientAge' },
  { label: 'PID:', tag: 'PatientID' },
  { label: 'Accession:', tag: 'AccessionNumber' },
  { label: 'DOB:', tag: 'PatientBirthDate', format: 'date' },
];

function asText(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }
  if (Array.isArray(value)) {
    return value.map(asText).filter(Boolean).join('\\');
  }
  if (typeof value === 'object') {
    // DICOM JSON person name: { Alphabetic: 'FAMILY^GIVEN' }
    const pn = value as Record<string, unknown>;
    return asText(pn.Alphabetic ?? pn.alphabetic ?? '');
  }
  return String(value).trim();
}

export function formatPatientValue(raw: unknown, format?: 'name' | 'date'): string {
  const text = asText(raw);
  if (!text) {
    return '';
  }
  if (format === 'name') {
    return text.replace(/\^+/g, ' ').replace(/\s+/g, ' ').trim();
  }
  if (format === 'date') {
    const m = /^(\d{4})(\d{2})(\d{2})$/.exec(text);
    return m ? `${m[1]}-${m[2]}-${m[3]}` : text;
  }
  return text;
}

/** Turns config items + a DICOM instance into the text lines to show. */
export function buildPatientLines(
  items: PatientOverlayItem[],
  instance: Record<string, unknown> | undefined | null
): string[] {
  if (!instance) {
    return [];
  }
  const lines: string[] = [];

  for (const item of items) {
    if (item.template) {
      let anyValue = false;
      const text = item.template.replace(
        /\{(\w+)(?::(name|date))?\}/g,
        (_match, tag: string, fmt?: 'name' | 'date') => {
          const format = fmt ?? (tag === 'PatientName' ? 'name' : undefined);
          const value = formatPatientValue(instance[tag], format);
          anyValue = anyValue || !!value;
          return value;
        }
      );
      if (anyValue && text.trim()) {
        lines.push(text.replace(/\s+/g, ' ').trim());
      }
    } else if (item.tag) {
      const value = formatPatientValue(instance[item.tag], item.format);
      if (value) {
        lines.push(item.label ? `${item.label} ${value}` : value);
      }
    }
  }
  return lines;
}

function getConfig(): PatientOverlayConfig | undefined {
  return (window as unknown as { config?: { patientOverlay?: PatientOverlayConfig } }).config
    ?.patientOverlay;
}

/** Overlay item component: registered as `innowave.patientInfo` in CustomizableViewportOverlay. */
export function PatientInfoOverlayItem({ instance, referenceInstance, customization }: any) {
  const cfg = getConfig();
  if (!cfg || cfg.enabled === false) {
    return null;
  }
  if ((cfg.position || 'topLeft') !== customization?.corner) {
    return null;
  }

  const lines = buildPatientLines(
    cfg.items && cfg.items.length ? cfg.items : DEFAULT_PATIENT_OVERLAY_ITEMS,
    instance || referenceInstance
  );
  if (!lines.length) {
    return null;
  }

  return (
    <div
      className="overlay-item flex flex-col"
      style={{ fontSize: cfg.fontSize, color: cfg.color }}
      data-cy="patient-overlay"
    >
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}
