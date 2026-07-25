import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { CatmullRomCurve3, Vector3 } from 'three';
import { trafficConfig } from './spaceTrafficConfig.js';
import { AlienCraft, AlienVisitor, Astronaut, Station, Vehicle } from './SpaceTrafficObjects.jsx';

function createRoutes(stations, routeConfig) {
  return routeConfig.map((route) => {
    const start = new Vector3(...stations[route.from].position);
    const control = new Vector3(...route.bend);
    const end = new Vector3(...stations[route.to].position);
    const curve = new CatmullRomCurve3([start, control, end], false, 'catmullrom', 0.45);

    return {
      ...route,
      curve,
    };
  });
}

export function SpaceTraffic({ isMobile }) {
  const vehicleRefs = useRef([]);
  const astronautRefs = useRef([]);
  const alienRefs = useRef([]);
  const alienCraftRefs = useRef([]);
  const sceneConfig = isMobile ? trafficConfig.mobile : trafficConfig.desktop;
  const craftConfigs = sceneConfig.crafts ?? [sceneConfig.craft];
  const routes = useMemo(
    () => createRoutes(sceneConfig.stations, sceneConfig.routes),
    [sceneConfig.routes, sceneConfig.stations],
  );

  useFrame(({ clock }) => {
    if (document.hidden) {
      return;
    }

    const elapsed = clock.getElapsedTime();

    routes.forEach((route, index) => {
      const vehicle = vehicleRefs.current[index];

      if (!vehicle) {
        return;
      }

      const progress = (elapsed * route.speed + route.offset) % 1;
      const nextProgress = (progress + 0.01) % 1;
      const current = route.curve.getPointAt(progress);
      const next = route.curve.getPointAt(nextProgress);
      const direction = next.clone().sub(current);

      vehicle.position.copy(current);
      vehicle.position.z += 0.16;
      vehicle.scale.setScalar(route.size * (1 + Math.sin(elapsed * 4.2 + index) * 0.025));
      vehicle.rotation.set(0.1, -0.08, Math.atan2(direction.y, direction.x));
    });

    sceneConfig.astronauts.forEach((astronaut, index) => {
      const astronautGroup = astronautRefs.current[index];

      if (!astronautGroup) {
        return;
      }

      const drift = Math.sin(elapsed * 0.42 + astronaut.phase);
      const counterDrift = Math.cos(elapsed * 0.36 + astronaut.phase);
      const slowOrbit = Math.sin(elapsed * 0.18 + astronaut.phase * 0.7);

      astronautGroup.position.set(
        astronaut.position[0] + drift * (isMobile ? 0.07 : 0.13),
        astronaut.position[1] + counterDrift * (isMobile ? 0.052 : 0.092),
        astronaut.position[2] + slowOrbit * 0.035,
      );
      astronautGroup.rotation.x = 0.1 + Math.sin(elapsed * 0.22 + astronaut.phase) * 0.08;
      astronautGroup.rotation.z = astronaut.rotation + Math.sin(elapsed * 0.34 + astronaut.phase) * 0.17;
      astronautGroup.rotation.y = -0.22 + Math.cos(elapsed * 0.28 + astronaut.phase) * 0.14;
      astronautGroup.scale.setScalar(astronaut.scale * (1 + Math.sin(elapsed * 0.72 + astronaut.phase) * 0.025));
    });

    sceneConfig.aliens.forEach((alien, index) => {
      const alienGroup = alienRefs.current[index];

      if (!alienGroup) {
        return;
      }

      const drift = Math.sin(elapsed * 0.48 + alien.phase);
      const lift = Math.cos(elapsed * 0.42 + alien.phase);
      const depthDrift = Math.sin(elapsed * 0.2 + alien.phase * 1.2);

      alienGroup.position.set(
        alien.position[0] + drift * (isMobile ? 0.052 : 0.105),
        alien.position[1] + lift * (isMobile ? 0.042 : 0.076),
        alien.position[2] + depthDrift * 0.03,
      );
      alienGroup.rotation.x = 0.04 + Math.sin(elapsed * 0.3 + alien.phase) * 0.07;
      alienGroup.rotation.z = alien.rotation + Math.sin(elapsed * 0.4 + alien.phase) * 0.16;
      alienGroup.rotation.y = -0.12 + Math.cos(elapsed * 0.34 + alien.phase) * 0.13;
      alienGroup.scale.setScalar(alien.scale * (1 + Math.sin(elapsed * 0.95 + alien.phase) * 0.035));
    });

    craftConfigs.forEach((craft, index) => {
      const alienCraft = alienCraftRefs.current[index];

      if (!alienCraft) {
        return;
      }

      const { center, drift, radius, phase = 0 } = craft;
      const patrolX =
        center[0] + Math.sin(elapsed * 0.12 + phase) * radius[0] + Math.sin(elapsed * 0.23 + phase) * drift[0];
      const patrolY =
        center[1] +
        Math.cos(elapsed * 0.1 + 1.4 + phase) * radius[1] +
        Math.sin(elapsed * 0.17 + phase) * drift[1];
      const patrolZ = center[2] + Math.sin(elapsed * 0.14 + phase) * 0.12;

      alienCraft.position.set(patrolX, patrolY, patrolZ);
      alienCraft.rotation.set(
        0.12 + Math.sin(elapsed * 0.16 + phase) * 0.06,
        -0.18 + Math.cos(elapsed * 0.14 + phase) * 0.1,
        Math.sin(elapsed * 0.2 + phase) * 0.16,
      );
    });
  });

  return (
    <group>
      {sceneConfig.stations.map((station) => (
        <Station key={station.id} station={station} />
      ))}
      {routes.map((route, index) => (
        <Vehicle
          key={`${route.from}-${route.to}-${route.speed}`}
          route={route}
          vehicleRef={(node) => {
            vehicleRefs.current[index] = node;
          }}
        />
      ))}
      {sceneConfig.astronauts.map((astronaut, index) => (
        <Astronaut
          key={astronaut.id}
          astronaut={astronaut}
          astronautRef={(node) => {
            astronautRefs.current[index] = node;
          }}
        />
      ))}
      {sceneConfig.aliens.map((alien, index) => (
        <AlienVisitor
          key={alien.id}
          alien={alien}
          alienRef={(node) => {
            alienRefs.current[index] = node;
          }}
        />
      ))}
      {craftConfigs.map((craft, index) => (
        <AlienCraft
          key={craft.id}
          craftRef={(node) => {
            alienCraftRefs.current[index] = node;
          }}
          config={craft}
        />
      ))}
    </group>
  );
}
