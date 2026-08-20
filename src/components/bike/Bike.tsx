"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useGameStore } from "@/store/useGameStore";

export default function Bike() {
  const frontWheelRef = useRef<THREE.Group>(null);
  const rearWheelRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const speed = useGameStore.getState().speed;

    const rotationAmount = speed * delta * 0.06;

    if (frontWheelRef.current) {
      frontWheelRef.current.rotation.x -= rotationAmount;
    }

    if (rearWheelRef.current) {
      rearWheelRef.current.rotation.x -= rotationAmount;
    }
  });

  return (
    <group>
      {/* Main chassis */}
      <mesh position={[0, 0.78, 0]} castShadow>
        <boxGeometry args={[0.65, 0.35, 1.65]} />
        <meshStandardMaterial
          color="#5b21b6"
          metalness={0.45}
          roughness={0.35}
        />
      </mesh>

      {/* Fuel tank */}
      <mesh position={[0, 1.08, -0.3]} castShadow>
        <boxGeometry args={[0.7, 0.5, 0.75]} />
        <meshStandardMaterial
          color="#7c3aed"
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Rear seat */}
      <mesh position={[0, 1.04, 0.65]} castShadow>
        <boxGeometry args={[0.58, 0.16, 0.75]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Front wheel */}
      <group
        ref={frontWheelRef}
        position={[0, 0.45, -1.18]}
      >
        <mesh
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry
            args={[0.45, 0.45, 0.18, 32]}
          />

          <meshStandardMaterial
            color="#050505"
            roughness={0.9}
          />
        </mesh>
      </group>

      {/* Rear wheel */}
      <group
        ref={rearWheelRef}
        position={[0, 0.45, 1.15]}
      >
        <mesh
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry
            args={[0.45, 0.45, 0.2, 32]}
          />

          <meshStandardMaterial
            color="#050505"
            roughness={0.9}
          />
        </mesh>
      </group>

      {/* Front fork left */}
      <mesh
        position={[-0.2, 0.85, -1.08]}
        rotation={[0.18, 0, 0]}
        castShadow
      >
        <boxGeometry args={[0.07, 1, 0.07]} />
        <meshStandardMaterial color="#777777" />
      </mesh>

      {/* Front fork right */}
      <mesh
        position={[0.2, 0.85, -1.08]}
        rotation={[0.18, 0, 0]}
        castShadow
      >
        <boxGeometry args={[0.07, 1, 0.07]} />
        <meshStandardMaterial color="#777777" />
      </mesh>

      {/* Handle bar */}
      <mesh position={[0, 1.43, -0.92]} castShadow>
        <boxGeometry args={[1.15, 0.07, 0.07]} />
        <meshStandardMaterial
          color="#888888"
          metalness={0.8}
        />
      </mesh>

      {/* Headlight */}
      <mesh position={[0, 1.17, -1.05]}>
        <sphereGeometry args={[0.21, 24, 24]} />

        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={3}
        />
      </mesh>

      {/* Headlight beam */}
      <spotLight
        position={[0, 1.2, -1]}
        target-position={[0, 0, -15]}
        intensity={20}
        distance={30}
        angle={0.35}
        penumbra={0.8}
        color="#ffffff"
      />

      {/* Rider torso */}
      <mesh
        position={[0, 1.72, 0.28]}
        rotation={[0.15, 0, 0]}
        castShadow
      >
        <boxGeometry args={[0.58, 0.95, 0.4]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* Rider head / helmet */}
      <mesh
        position={[0, 2.38, 0.18]}
        castShadow
      >
        <sphereGeometry args={[0.32, 32, 32]} />

        <meshStandardMaterial
          color="#090909"
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>

      {/* Rider left leg */}
      <mesh
        position={[-0.23, 1.05, 0.55]}
        rotation={[0.55, 0, 0]}
        castShadow
      >
        <boxGeometry args={[0.18, 0.9, 0.2]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Rider right leg */}
      <mesh
        position={[0.23, 1.05, 0.55]}
        rotation={[0.55, 0, 0]}
        castShadow
      >
        <boxGeometry args={[0.18, 0.9, 0.2]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  );
}