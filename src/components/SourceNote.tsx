export type SourceNoteData = { text: string; label: string; href: string };

export default function SourceNote({ note }: { note: SourceNoteData }) {
  return <p className="mt-6 text-[13px] leading-relaxed text-brand-body">
    <span aria-label="Source note">* </span>{note.text}{' '}
    <a href={note.href} target="_blank" rel="noopener noreferrer" className="text-brand-blue underline underline-offset-2 hover:text-brand-bluehover">{note.label}</a>
  </p>;
}
