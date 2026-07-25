export const trafficConfig = {
  desktop: {
    stations: [
      { id: 'northwest', position: [-4.1, 1.5, -2.45], scale: 0.34, rotation: 0.28 },
      { id: 'northeast', position: [4.05, 1.2, -2.65], scale: 0.31, rotation: -0.22 },
      { id: 'southeast', position: [4.08, -1.65, -2.8], scale: 0.32, rotation: 0.18 },
    ],
    routes: [
      { from: 0, to: 1, bend: [0.2, 2.16, -2.78], speed: 0.017, offset: 0.08, size: 0.7 },
      { from: 1, to: 2, bend: [4.82, -0.25, -2.84], speed: 0.014, offset: 0.42, size: 0.58 },
    ],
    astronauts: [
      { id: 'eva-northwest', position: [-3.74, 1.3, -2.28], scale: 0.19, phase: 0.2, rotation: -0.36 },
      { id: 'eva-southeast', position: [3.72, -1.28, -2.55], scale: 0.18, phase: 3.3, rotation: -0.18 },
    ],
    aliens: [
      { id: 'alien-northeast', position: [3.28, 1.06, -2.45], scale: 0.2, phase: 0.9, rotation: -0.26 },
      { id: 'alien-southeast', position: [3.46, -1.52, -2.54], scale: 0.2, phase: 2.4, rotation: 0.3 },
    ],
    craft: {
      scale: 0.58,
      center: [2.18, -0.55, -2.2],
      radius: [1.0, 0.64],
      drift: [0.24, 0.18],
    },
  },
  mobile: {
    stations: [
      { id: 'upper', position: [2.15, 0.92, -2.72], scale: 0.25, rotation: -0.22 },
      { id: 'lower', position: [-2.12, -1.78, -2.95], scale: 0.24, rotation: 0.32 },
    ],
    routes: [{ from: 0, to: 1, bend: [0.18, -0.22, -3.02], speed: 0.013, offset: 0.16, size: 0.5 }],
    astronauts: [{ id: 'eva-mobile', position: [1.74, 1.08, -2.54], scale: 0.14, phase: 0.8, rotation: 0.34 }],
    aliens: [{ id: 'alien-mobile', position: [1.34, 0.86, -2.52], scale: 0.17, phase: 1.1, rotation: -0.2 }],
    craft: {
      scale: 0.46,
      center: [1.28, -0.46, -2.28],
      radius: [0.55, 0.36],
      drift: [0.14, 0.12],
    },
  },
};
