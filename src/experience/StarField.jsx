import { Stars } from '@react-three/drei';

export function StarField({ isMobile }) {
  return (
    <Stars
      radius={80}
      depth={32}
      count={isMobile ? 900 : 3200}
      factor={isMobile ? 2.8 : 4.1}
      saturation={0}
      fade
      speed={0.16}
    />
  );
}
