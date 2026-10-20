export const INQUIRY_ENTRIES = {
  'part-number': {
    label: 'Part number',
    needs: 'Manufacturer, reference and expected demand.',
    referenceHelp: 'Add the manufacturer and part number. Include the revision or replacement reference if known.',
    requirementsHelp: 'Describe the intended use and what must remain compatible. Include any alternatives you are considering.',
  },
  drawing: {
    label: 'Drawing',
    needs: 'Drawing revision, material and key requirements.',
    referenceHelp: 'Add the drawing number and revision. Attach the drawing in your email app after reviewing the draft.',
    requirementsHelp: 'Describe the function, material and critical requirements shown on the drawing. Note any details still to be agreed.',
  },
  application: {
    label: 'Application',
    needs: 'Function, interfaces and operating conditions.',
    referenceHelp: 'Name the component category or describe its function. A part number is optional.',
    requirementsHelp: 'What should the component do? Include known interfaces, operating conditions and the result you need. Open questions are welcome.',
  },
} as const;

export type InquiryEntry = keyof typeof INQUIRY_ENTRIES;
export type InquiryStartingPoint = InquiryEntry | '';

/** Only recognised query values select an entry; arbitrary URL input is never shown. */
export function parseInquiryEntry(value: string | null): InquiryStartingPoint {
  return value && Object.hasOwn(INQUIRY_ENTRIES, value) ? value as InquiryEntry : '';
}
