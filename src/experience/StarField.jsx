import { Stars } from '@react-three/drei';

export function StarField({ isMobile }) {
  return (
    <Stars
      radius={80}
      depth={32}
      count={isMobile ? 550 : 1200}
      factor={isMobile ? 2.6 : 3.4}
      saturation={0}
      fade
      speed={0.25}
    />
  );
}
