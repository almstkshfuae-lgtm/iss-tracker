import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, MeshStandardMaterial, SphereGeometry, Color } from 'three';
import { EARTH_RADIUS } from '../utils/astronomy';

export const Earth = () => {
  // Using high-res textures from a reliable public source (NASA or similar mirrors)
  // These are standard placeholders often used in Three.js examples
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg', // Base texture
    'https://unpkg.com/three-globe/example/img/earth-topology.png',    // Normal/Bump
    'https://unpkg.com/three-globe/example/img/earth-water.png',       // Specular (water reflection)
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png' // Clouds
  ]);

  return (
    <group>
      {/* Earth Sphere */}
      <mesh rotation={[0, 0, 0]}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          specular={new Color(0x333333)}
          shininess={15}
        />
      </mesh>

      {/* Atmosphere / Clouds */}
      <mesh scale={[1.01, 1.01, 1.01]}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.8}
          blending={2} // Additive blending looks nice for clouds sometimes, but standard transparent is safer for day/night
          side={2} // Double side
          depthWrite={false}
        />
      </mesh>
      
      {/* Atmospheric Glow (Simple Shader or just a rim mesh) */}
       <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshBasicMaterial
          color={0x4488ff}
          transparent={true}
          opacity={0.1}
          side={1} // BackSide
          blending={2} // Additive
        />
      </mesh>
    </group>
  );
};
