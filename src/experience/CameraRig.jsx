import { useFrame } from '@react-three/fiber';

export function CameraRig({ reducedMotion }) {
  useFrame((state) => {
    if (reducedMotion || document.hidden) {
      return;
    }

    const { camera, pointer } = state;

    camera.position.x += (pointer.x * 0.18 - camera.position.x) * 0.025;
    camera.position.y += (pointer.y * 0.12 - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
