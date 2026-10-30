import { useEffect, useRef } from 'react';
import { spinFrame } from '../../data/home-v7';


/**
 * Frame-sequence turntable (no WebGL): frames are drawn into a canvas. The parent owns the frame index,
 * so drag, slider and keyboard all drive the same value. Frames load lazily once the part is selected;
 * until a frame is decoded the static rendering (poster) stays visible underneath.
 */
export default function Spin({ slug, count, frame, poster }: { slug: string; count: number; frame: number; poster: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const current = useRef(frame);

  const draw = (i: number) => {
    const c = canvas.current; const img = images.current[i];
    if (!c || !img || !img.complete || !img.naturalWidth) return false;
    const ctx = c.getContext('2d'); if (!ctx) return false;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    c.dataset.ready = '';
    return true;
  };

  useEffect(() => {
    // Load every 3rd frame first so the whole turn is roughly covered, then the rest.
    const order = [...Array(count).keys()].sort((a, b) => (a % 3 === 0 ? 0 : 1) - (b % 3 === 0 ? 0 : 1) || a - b);
    const list: HTMLImageElement[] = [];
    order.forEach(i => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => { if (i === current.current) draw(i); };
      img.src = spinFrame(slug, i);
      list[i] = img;
    });
    images.current = list;
    return () => { list.forEach(img => { img.onload = null; }); };
  }, [slug, count]);

  useEffect(() => {
    current.current = frame;
    if (draw(frame)) return;
    // Nearest loaded frame as a stand-in while the exact one is still loading.
    for (let d = 1; d < count; d++) { if (draw((frame + d) % count) || draw((frame - d + count) % count)) return; }
  }, [frame, count]);

  return <div className="kp9-spin">
    <img className="kp9-spin__poster" src={poster} alt="" width="1200" height="1200" decoding="async" />
    <canvas ref={canvas} className="kp9-spin__canvas" width={720} height={720} />
  </div>;
}
