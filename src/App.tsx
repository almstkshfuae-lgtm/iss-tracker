/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Loader } from '@react-three/drei';
import { Earth } from './components/Earth';
import { Sun } from './components/Sun';
import { ISSMarker } from './components/ISSMarker';
import { Dashboard } from './components/Dashboard';
import { useISSData } from './services/issService';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export default function App() {
  const { data, error } = useISSData();

  return (
    <div className="relative w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <Suspense fallback={null}>
          {/* Scene Lighting */}
          <Sun />
          
          {/* Environment */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* Objects */}
          <Earth />
          {data && <ISSMarker lat={data.latitude} lon={data.longitude} />}

          {/* Controls */}
          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            minDistance={7} 
            maxDistance={20}
            autoRotate={!data} // Auto rotate if no data yet, otherwise let user control or maybe follow ISS? Let's just standard orbit controls.
            autoRotateSpeed={0.5}
          />

          {/* Post Processing */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={1.5} />
          </EffectComposer>
        </Suspense>
      </Canvas>
      
      <Loader />
      <Dashboard data={data} error={error} />
      
      {/* Overlay Gradient for UI readability */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />
    </div>
  );
}
