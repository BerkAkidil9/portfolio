export const trafficConfig = {
  desktop: {
    stations: [
      { id: 'northwest', position: [-4.1, 1.5, -2.45], scale: 0.42, rotation: 0.28 },
      { id: 'northeast', position: [4.05, 1.2, -2.52], scale: 0.46, rotation: -0.22 },
      { id: 'southeast', position: [4.02, -1.62, -2.48], scale: 0.48, rotation: 0.18 },
    ],
    routes: [
      { from: 0, to: 1, bend: [0.2, 2.16, -2.78], speed: 0.017, offset: 0.08, size: 0.82 },
      { from: 1, to: 2, bend: [4.78, -0.25, -2.5], speed: 0.014, offset: 0.42, size: 0.84 },
    ],
    astronauts: [
      { id: 'eva-northwest', position: [-3.74, 1.3, -2.28], scale: 0.36, phase: 0.2, rotation: -0.36 },
      { id: 'eva-southeast', position: [3.66, -1.24, -2.26], scale: 0.46, phase: 3.3, rotation: -0.18 },
    ],
    aliens: [
      { id: 'alien-northeast', position: [3.28, 1.06, -2.34], scale: 0.48, phase: 0.9, rotation: -0.26 },
      { id: 'alien-southeast', position: [3.42, -1.48, -2.24], scale: 0.5, phase: 2.4, rotation: 0.3 },
    ],
    crafts: [
      {
        id: 'alien-craft-primary',
        scale: 0.86,
        center: [2.18, -0.55, -2.02],
        radius: [1.0, 0.64],
        drift: [0.24, 0.18],
        phase: 0,
      },
      {
        id: 'alien-craft-scout',
        scale: 0.68,
        center: [3.42, 0.82, -2.18],
        radius: [0.72, 0.44],
        drift: [0.18, 0.14],
        phase: 2.35,
      },
    ],
  },
  mobile: {
    stations: [
      { id: 'upper', position: [2.15, 0.92, -2.72], scale: 0.29, rotation: -0.22 },
      { id: 'lower', position: [-2.12, -1.78, -2.95], scale: 0.28, rotation: 0.32 },
    ],
    routes: [{ from: 0, to: 1, bend: [0.18, -0.22, -3.02], speed: 0.013, offset: 0.16, size: 0.58 }],
    astronauts: [{ id: 'eva-mobile', position: [1.74, 1.08, -2.54], scale: 0.26, phase: 0.8, rotation: 0.34 }],
    aliens: [{ id: 'alien-mobile', position: [1.34, 0.86, -2.52], scale: 0.3, phase: 1.1, rotation: -0.2 }],
    crafts: [
      {
        id: 'alien-craft-mobile-primary',
        scale: 0.52,
        center: [1.28, -0.46, -2.28],
        radius: [0.55, 0.36],
        drift: [0.14, 0.12],
        phase: 0,
      },
      {
        id: 'alien-craft-mobile-scout',
        scale: 0.42,
        center: [1.86, 0.52, -2.42],
        radius: [0.34, 0.24],
        drift: [0.1, 0.08],
        phase: 2.2,
      },
    ],
  },
};
