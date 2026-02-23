import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, Mesh } from 'three';
import { Html } from '@react-three/drei';
import { latLonToVector3, EARTH_RADIUS } from '../utils/astronomy';

interface ISSMarkerProps {
  lat: number;
  lon: number;
}

export const ISSMarker = ({ lat, lon }: ISSMarkerProps) => {
  const meshRef = useRef<Mesh>(null);
  
  // Calculate position
  // Add a small offset to altitude so it floats above Earth
  const altitudeOffset = 0.2; // Scaled relative to Earth Radius 5
  const position = latLonToVector3(lat, lon, EARTH_RADIUS + altitudeOffset);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(new Vector3(0, 0, 0));
    }
  });

  return (
    <group position={position}>
      {/* The Beacon */}
      <mesh ref={meshRef}>
        <boxGeometry args={[0.1, 0.1, 0.3]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff4400"
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Glow Effect (Billboard Sprite or Sphere) */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial 
          color="#ff8800" 
          transparent 
          opacity={0.4} 
        />
      </mesh>

      {/* Label */}
      <Html distanceFactor={15}>
        <div className="pointer-events-none select-none">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ff0000]" />
            <span className="text-xs font-mono font-bold text-white/80 tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-md border border-white/10">
              ISS
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
};
