/**
 * Tool registry — single source for the homepage hub and the RelatedTools
 * module (SEO_SPEC §5). A tool with href=null is not built yet and renders
 * WITHOUT a link (no orphan/broken links). Flip href when the tool ships.
 */
export interface Tool {
  id: string;
  name: string;
  description: string;
  href: string | null;
}

export const TOOLS: Tool[] = [
  {
    id: 'brutto-netto-rechner',
    name: 'Brutto-Netto-Rechner',
    description: 'Vom Bruttolohn zum Nettolohn: AHV, IV, EO, ALV, NBU, BVG — transparent aufgeschlüsselt.',
    href: '/brutto-netto-rechner/',
  },
  {
    id: 'quellensteuer-rechner',
    name: 'Quellensteuer-Rechner',
    description: 'Quellensteuer für ausländische Arbeitnehmende — nach Kanton, Tarifcode und Gemeinde.',
    href: null,
  },
  {
    id: 'steuervergleich',
    name: 'Steuervergleich aller 26 Kantone',
    description: 'Ein Einkommen, alle Kantone: wo zahlen Sie wie viel Einkommenssteuer?',
    href: null,
  },
  {
    id: 'saeule-3a-rechner',
    name: 'Säule-3a-Rechner',
    description: 'Wie viel Steuern spart Ihre Einzahlung in die Säule 3a? Nach Kanton und Einkommen.',
    href: null,
  },
  {
    id: 'franchise-rechner',
    name: 'Franchise-Rechner Krankenkasse',
    description: 'Welche Franchise lohnt sich bei Ihren Gesundheitskosten? Break-even einfach berechnet.',
    href: null,
  },
];
