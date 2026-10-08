// A small signature from the Komponia brand sheet, within the template typography.
export default function BrandLabel({ children, inverse = false }: { children: React.ReactNode; inverse?: boolean }) {
  return <p className={`komponia-label${inverse ? ' komponia-label--inverse' : ''}`}>{children}</p>;
}
