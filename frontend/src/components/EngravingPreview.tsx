import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function PendantMesh({ engravingText }: { engravingText: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group>
      {/* Disc body */}
      <mesh ref={meshRef} castShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.12, 64]} />
        <meshStandardMaterial
          color="#C9A84C"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Engraving text on front face */}
      {engravingText && (
        <Text
          position={[0, 0, 0.07]}
          fontSize={0.22}
          maxWidth={2}
          textAlign="center"
          color="#7A5C1E"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/greatvibes/v19/RWmMoKWR9v4ksMfaWd_JN9XFiaQ.woff2"
        >
          {engravingText}
        </Text>
      )}

      {/* Bail (loop at top) */}
      <mesh position={[0, 1.35, 0]}>
        <torusGeometry args={[0.18, 0.05, 16, 32]} />
        <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

interface EngravingPreviewProps {
  engravingText: string;
  onEngravingChange: (text: string) => void;
}

export function EngravingPreview({ engravingText, onEngravingChange }: EngravingPreviewProps) {
  return (
    <div>
      <p className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-etchly-charcoal/50 mb-4">
        Live Engraving Preview
      </p>

      <input
        type="text"
        value={engravingText}
        onChange={e => onEngravingChange(e.target.value)}
        placeholder="Engrave a message..."
        maxLength={30}
        className="w-full border border-border bg-transparent px-4 py-3 font-montserrat text-sm text-etchly-charcoal placeholder:text-etchly-charcoal/30 focus:outline-none focus:border-gold transition-colors"
      />
      <p className="font-montserrat text-[10px] text-etchly-charcoal/30 mt-1 text-right">
        {engravingText.length}/30
      </p>

      <div className="mt-4 bg-etchly-cream rounded-none overflow-hidden" style={{ height: 220 }}>
        <Canvas
          camera={{ position: [0, 0.5, 4], fov: 35 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-3, -2, -3]} intensity={0.3} color="#C9A84C" />
          <Suspense fallback={null}>
            <PendantMesh engravingText={engravingText} />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {engravingText && (
        <p className="font-montserrat text-[10px] text-gold mt-2 text-center tracking-wide">
          ✓ Engraving preview active
        </p>
      )}
    </div>
  );
}
