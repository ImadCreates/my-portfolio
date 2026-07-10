import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/*
  P2: film grain, site-wide. A fixed full-viewport canvas painted from a
  128px noise tile. Eight tiles are generated once up front; each frame
  cycles to the next tile and re-tiles it at a random phase offset, so
  the per-frame cost is one pattern fillRect — no per-frame pixel
  generation. Refreshes at 12fps: grain looks better slightly slow and
  costs less. Flat luminance noise, no color. Removed entirely under
  reduced motion. The canvas backing store stays at CSS-pixel size (no
  devicePixelRatio scaling); on dense screens the slight upscale softens
  the grain like film rather than sharpening it like static.
*/
const TILE = 128;
const TILE_COUNT = 8;
const FPS = 12;

function makeTiles() {
  return Array.from({ length: TILE_COUNT }, () => {
    const tile = document.createElement('canvas');
    tile.width = TILE;
    tile.height = TILE;
    const ctx = tile.getContext('2d');
    const image = ctx.createImageData(TILE, TILE);
    const data = image.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = (Math.random() * 256) | 0;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }
    ctx.putImageData(image, 0, 0);
    return tile;
  });
}

export default function Grain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const tiles = makeTiles();
    const patterns = tiles.map((tile) => ctx.createPattern(tile, 'repeat'));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    let last = 0;
    let raf;
    const step = 1000 / FPS;
    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (t - last < step) return;
      last = t;
      frame = (frame + 1) % TILE_COUNT;
      const ox = (Math.random() * TILE) | 0;
      const oy = (Math.random() * TILE) | 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(-ox, -oy);
      ctx.fillStyle = patterns[frame];
      ctx.fillRect(0, 0, canvas.width + TILE, canvas.height + TILE);
      ctx.restore();
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  if (prefersReducedMotion()) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] h-full w-full opacity-5"
    />
  );
}
