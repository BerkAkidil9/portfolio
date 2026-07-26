import { useEffect, useRef, useState } from 'react';

export function PingPongVideo({
  className,
  endTrimSeconds = 0.65,
  fps = 12,
  playbackFps = 18,
  src,
  startTrimSeconds = 0.08,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const directionRef = useRef(1);
  const frameIndexRef = useRef(0);
  const framesRef = useRef([]);
  const lastFrameRef = useRef(0);
  const loadRunRef = useRef(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let cancelled = false;
    const loadRun = loadRunRef.current + 1;
    const context = canvas.getContext('2d', { alpha: true });
    const video = document.createElement('video');

    loadRunRef.current = loadRun;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    const waitForMetadata = () =>
      new Promise((resolve, reject) => {
        if (video.readyState >= 1) {
          resolve();
          return;
        }

        const cleanup = () => {
          video.removeEventListener('loadedmetadata', handleLoaded);
          video.removeEventListener('error', handleError);
        };
        const handleLoaded = () => {
          cleanup();
          resolve();
        };
        const handleError = () => {
          cleanup();
          reject(new Error('Unable to load decorative video.'));
        };

        video.addEventListener('loadedmetadata', handleLoaded, { once: true });
        video.addEventListener('error', handleError, { once: true });
        video.load();
      });

    const seekTo = (time) =>
      new Promise((resolve, reject) => {
        if (Math.abs(video.currentTime - time) < 0.015 && video.readyState >= 2) {
          resolve();
          return;
        }

        let timeoutId;
        const cleanup = () => {
          window.clearTimeout(timeoutId);
          video.removeEventListener('seeked', handleSeeked);
          video.removeEventListener('error', handleError);
        };
        const handleSeeked = () => {
          cleanup();
          resolve();
        };
        const handleError = () => {
          cleanup();
          reject(new Error('Unable to decode decorative video frame.'));
        };

        video.addEventListener('seeked', handleSeeked, { once: true });
        video.addEventListener('error', handleError, { once: true });
        video.currentTime = time;
        timeoutId = window.setTimeout(() => {
          if (video.readyState >= 2) {
            cleanup();
            resolve();
          }
        }, 900);
      });

    const drawFrame = (frame) => {
      if (!context || !frame) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(frame, 0, 0, canvas.width, canvas.height);
    };

    const captureFrame = () => {
      const frame = document.createElement('canvas');
      const frameContext = frame.getContext('2d', { alpha: true });

      frame.width = 640;
      frame.height = 360;
      frameContext.drawImage(video, 0, 0, frame.width, frame.height);

      return frame;
    };

    const animate = (timestamp) => {
      const frames = framesRef.current;

      if (frames.length > 1 && !document.hidden) {
        if (!lastFrameRef.current) {
          lastFrameRef.current = timestamp;
        }

        const frameInterval = 1000 / playbackFps;

        if (timestamp - lastFrameRef.current >= frameInterval) {
          lastFrameRef.current = timestamp;
          frameIndexRef.current += directionRef.current;

          if (frameIndexRef.current >= frames.length - 1) {
            frameIndexRef.current = frames.length - 1;
            directionRef.current = -1;
          } else if (frameIndexRef.current <= 0) {
            frameIndexRef.current = 0;
            directionRef.current = 1;
          }

          drawFrame(frames[frameIndexRef.current]);
        }
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    const loadFrames = async () => {
      video.src = src;
      await waitForMetadata();

      if (cancelled || loadRunRef.current !== loadRun) {
        return;
      }

      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const startAt = Math.min(startTrimSeconds, Math.max(duration - 0.2, 0));
      const endAt = Math.max(startAt + 0.2, duration - endTrimSeconds);
      const frameCount = Math.max(24, Math.round((endAt - startAt) * fps));
      const nextFrames = [];

      canvas.width = 640;
      canvas.height = 360;

      for (let index = 0; index < frameCount; index += 1) {
        if (cancelled || loadRunRef.current !== loadRun) {
          return;
        }

        const progress = frameCount === 1 ? 0 : index / (frameCount - 1);
        const time = startAt + (endAt - startAt) * progress;

        await seekTo(time);
        nextFrames.push(captureFrame());
      }

      framesRef.current.forEach((frame) => frame.close?.());
      framesRef.current = nextFrames;
      frameIndexRef.current = 0;
      directionRef.current = 1;
      drawFrame(nextFrames[0]);
      setIsReady(true);
      rafRef.current = window.requestAnimationFrame(animate);
    };

    loadFrames().catch(() => {
      framesRef.current = [];
    });

    return () => {
      cancelled = true;
      setIsReady(false);

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      framesRef.current.forEach((frame) => frame.close?.());
      framesRef.current = [];
      video.removeAttribute('src');
      video.load();
    };
  }, [endTrimSeconds, fps, playbackFps, src, startTrimSeconds]);

  return (
    <span className={className} data-ready={isReady ? 'true' : 'false'} aria-hidden="true">
      <video autoPlay muted loop playsInline preload="auto">
        <source src={src} type="video/mp4" />
      </video>
      <canvas ref={canvasRef} />
    </span>
  );
}
