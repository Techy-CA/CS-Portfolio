import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  tx: number; ty: number;   // target (text shape)
  ox: number; oy: number;   // origin (random float)
  vx: number; vy: number;
  color: string;
  size: number;
  state: 'float' | 'form' | 'explode';
  delay: number;
}

const RED    = '#e63946';
const WHITE  = '#f1f1f1';
const GRAY   = '#888888';

export default function ParticleMorph({ initials = 'SK' }: { initials?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles  = useRef<Particle[]>([]);
  const rafRef     = useRef<number>(0);
  const stateRef   = useRef<'float' | 'form' | 'explode'>('float');
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    /* ── Sample text pixel positions ─────────────────────── */
    const sampleText = (): { x: number; y: number }[] => {
      const off = document.createElement('canvas');
      off.width = W; off.height = H;
      const c = off.getContext('2d')!;
      const fs = Math.min(W, H) * 0.55;
      c.font         = `900 ${fs}px 'Inter', sans-serif`;
      c.fillStyle    = '#fff';
      c.textAlign    = 'center';
      c.textBaseline = 'middle';
      c.fillText(initials, W / 2, H / 2);
      const d = c.getImageData(0, 0, W, H).data;
      const pts: { x: number; y: number }[] = [];
      const gap = Math.max(4, Math.floor(W / 80));
      for (let y = 0; y < H; y += gap)
        for (let x = 0; x < W; x += gap)
          if (d[(y * W + x) * 4 + 3] > 128) pts.push({ x, y });
      return pts;
    };

    /* ── Build particles ──────────────────────────────────── */
    const buildParticles = () => {
      const pts = sampleText();
      const COLORS = [RED, WHITE, GRAY, '#c1121f', '#e0e0e0'];
      particles.current = pts.map((pt, i) => {
        const ox = Math.random() * W;
        const oy = Math.random() * H;
        return {
          x: ox, y: oy,
          tx: pt.x, ty: pt.y,
          ox, oy,
          vx: 0, vy: 0,
          color: COLORS[i % COLORS.length],
          size: Math.random() * 1.8 + 0.6,
          state: 'float',
          delay: Math.random() * 60,
        };
      });
    };

    buildParticles();

    /* ── Auto-cycle: float → form → explode ──────────────── */
    const cycle = () => {
      stateRef.current = 'form';
      timerRef.current = setTimeout(() => {
        stateRef.current = 'explode';
        particles.current.forEach(p => {
          p.vx = (Math.random() - 0.5) * 18;
          p.vy = (Math.random() - 0.5) * 18;
        });
        timerRef.current = setTimeout(() => {
          stateRef.current = 'float';
          particles.current.forEach(p => { p.x = p.ox; p.y = p.oy; });
          timerRef.current = setTimeout(cycle, 2000);
        }, 1800);
      }, 3000);
    };

    timerRef.current = setTimeout(cycle, 800);

    /* ── Mouse repulsion ─────────────────────────────────── */
    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    /* ── Click: instant explode ──────────────────────────── */
    const onClick = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      stateRef.current = 'explode';
      particles.current.forEach(p => {
        p.vx = (Math.random() - 0.5) * 22;
        p.vy = (Math.random() - 0.5) * 22;
      });
      timerRef.current = setTimeout(() => {
        stateRef.current = 'float';
        particles.current.forEach(p => { p.x = p.ox; p.y = p.oy; });
        timerRef.current = setTimeout(cycle, 2000);
      }, 1500);
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('click', onClick);

    /* ── Resize ──────────────────────────────────────────── */
    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      buildParticles();
    };
    window.addEventListener('resize', onResize);

    /* ── Draw loop ───────────────────────────────────────── */
    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;

      const ps = particles.current;
      const s  = stateRef.current;

      ps.forEach(p => {
        if (s === 'float') {
          // gentle random drift
          p.x += Math.sin(frame * 0.01 + p.delay) * 0.4;
          p.y += Math.cos(frame * 0.013 + p.delay) * 0.4;

          // mouse repulsion
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            const f = (80 - d) / 80;
            p.x += (dx / d) * f * 3;
            p.y += (dy / d) * f * 3;
          }

          // wrap
          if (p.x < 0) p.x = W;
          if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H;
          if (p.y > H) p.y = 0;

        } else if (s === 'form') {
          if (frame < p.delay) return;
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          p.x += dx * 0.09;
          p.y += dy * 0.09;

        } else if (s === 'explode') {
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.x  += p.vx;
          p.y  += p.vy;
        }

        /* glow on RED particles */
        if (p.color === RED) {
          ctx.shadowBlur  = 8;
          ctx.shadowColor = RED;
        } else {
          ctx.shadowBlur  = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle  = p.color;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur  = 0;
      });

      /* subtle scanline overlay */
      ctx.fillStyle = 'rgba(0,0,0,0.03)';
      for (let y = 0; y < H; y += 4) {
        ctx.fillRect(0, y, W, 1);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('click', onClick);
    };
  }, [initials]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        background: 'transparent',
        cursor: 'crosshair',
      }}
    />
  );
}
