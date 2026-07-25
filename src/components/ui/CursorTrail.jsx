import { useEffect, useRef, useState } from 'react';
import styles from './CursorTrail.module.css';

const TRAIL_COUNT = 10;
const TRAIL_ITEMS = Array.from({ length: TRAIL_COUNT }, (_, index) => index);

export function CursorTrail() {
  const trailRef = useRef(null);
  const frameRef = useRef();
  const targetRef = useRef({ x: 0, y: 0, active: false });
  const pointsRef = useRef(TRAIL_ITEMS.map(() => ({ x: 0, y: 0 })));
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');

    const syncEnabled = () => {
      setEnabled(finePointerQuery.matches && motionQuery.matches);
    };

    syncEnabled();
    finePointerQuery.addEventListener('change', syncEnabled);
    motionQuery.addEventListener('change', syncEnabled);

    return () => {
      finePointerQuery.removeEventListener('change', syncEnabled);
      motionQuery.removeEventListener('change', syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const updateTarget = (event) => {
      targetRef.current = {
        x: event.clientX,
        y: event.clientY,
        active: true,
      };

      trailRef.current?.classList.add(styles.visible);
    };

    const hideTrail = () => {
      targetRef.current.active = false;
      trailRef.current?.classList.remove(styles.visible);
    };

    const animate = () => {
      const nodes = trailRef.current?.children;
      const points = pointsRef.current;
      const target = targetRef.current;

      if (nodes && target.active) {
        points[0].x += (target.x - points[0].x) * 0.38;
        points[0].y += (target.y - points[0].y) * 0.38;

        for (let index = 1; index < points.length; index += 1) {
          points[index].x += (points[index - 1].x - points[index].x) * 0.42;
          points[index].y += (points[index - 1].y - points[index].y) * 0.42;
        }

        for (let index = 0; index < nodes.length; index += 1) {
          nodes[index].style.transform = `translate3d(${points[index].x}px, ${points[index].y}px, 0) translate(-50%, -50%)`;
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', updateTarget, { passive: true });
    window.addEventListener('pointerleave', hideTrail);
    window.addEventListener('blur', hideTrail);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', updateTarget);
      window.removeEventListener('pointerleave', hideTrail);
      window.removeEventListener('blur', hideTrail);
      cancelAnimationFrame(frameRef.current);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div className={styles.trail} ref={trailRef} aria-hidden="true">
      {TRAIL_ITEMS.map((item) => (
        <span className={styles.particle} key={item} />
      ))}
    </div>
  );
}
