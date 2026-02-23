import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DirectionalLight, Vector3, Color } from 'three';
import { getSubSolarPoint, latLonToVector3, EARTH_RADIUS } from '../utils/astronomy';

export const Sun = () => {
  const lightRef = useRef<DirectionalLight>(null);

  useFrame(() => {
    if (lightRef.current) {
      const now = new Date();
      const { lat, lon } = getSubSolarPoint(now);
      
      // Position the light far away in the direction of the sub-solar point
      const sunDirection = latLonToVector3(lat, lon, EARTH_RADIUS * 10);
      lightRef.current.position.copy(sunDirection);
      lightRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <directionalLight
        ref={lightRef}
        intensity={2.5}
        color={new Color(0xffffee)}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <ambientLight intensity={0.05} color={0x404040} /> 
      {/* Very low ambient light to make the night side dark but not pitch black */}
    </>
  );
};
