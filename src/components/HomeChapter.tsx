type HomeChapterProps = {
  number: '01' | '02' | '03' | '04' | '05';
  title: string;
  discipline?: 'engineering' | 'supply' | 'neutral';
};

export default function HomeChapter({ number, title, discipline = 'engineering' }: HomeChapterProps) {
  return <div className="kp-chapter" data-discipline={discipline}>
    <span className="kp-chapter__module" aria-hidden="true" />
    <span className="kp-chapter__number">{number}</span>
    <span className="kp-chapter__title">{title}</span>
    <span className="kp-chapter__rule" aria-hidden="true" />
  </div>;
}
