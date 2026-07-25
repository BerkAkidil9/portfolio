import { useEffect, useRef } from 'react';

export function PingPongVideo({ className, endTrimSeconds = 0.65, reverseSpeed = 0.86, src, startTrimSeconds = 0.08, type }) {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const directionRef = useRef(1);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    const startForward = async () => {
      directionRef.current = 1;
      video.playbackRate = 1;

      try {
        await video.play();
      } catch {
        // Autoplay can be blocked in unusual browser states; the decorative fallback remains visible.
      }
    };

    const tick = (timestamp) => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const startAt = startTrimSeconds;
      const endAt = Math.max(startAt, duration - endTrimSeconds);
      const previousTimestamp = lastFrameRef.current || timestamp;
      const delta = Math.min((timestamp - previousTimestamp) / 1000, 0.05);

      lastFrameRef.current = timestamp;

      if (duration > 0 && !document.hidden) {
        if (directionRef.current === 1 && video.currentTime >= endAt) {
          directionRef.current = -1;
          video.pause();
          video.currentTime = endAt;
        }

        if (directionRef.current === -1) {
          video.currentTime = Math.max(startAt, video.currentTime - delta * reverseSpeed);

          if (video.currentTime <= startAt + 0.01) {
            video.currentTime = startAt;
            startForward();
          }
        }
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    video.currentTime = startTrimSeconds;
    startForward();
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [endTrimSeconds, reverseSpeed, startTrimSeconds]);

  return (
    <span className={className} aria-hidden="true">
      <video ref={videoRef} muted playsInline preload="auto">
        <source src={src} type={type} />
      </video>
    </span>
  );
}
