"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useGameStore } from "@/store/useGameStore";

function Wheel({
  position,
  wheelRef,
}: {
  position: [number, number, number];
  wheelRef: React.RefObject<THREE.Group | null>;
}) {
  return (
    <group
      ref={wheelRef}
      position={position}
    >
      {/* Tyre */}
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <torusGeometry
          args={[
            0.43,
            0.12,
            16,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#050506"
          roughness={0.9}
        />
      </mesh>

      {/* Rim */}
      <mesh
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.3,
            0.3,
            0.12,
            24,
          ]}
        />

        <meshStandardMaterial
          color="#20242b"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* Brake disc */}
      <mesh
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
        position={[
          -0.075,
          0,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.22,
            0.22,
            0.025,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#8b9199"
          metalness={1}
          roughness={0.25}
        />
      </mesh>

      {/* Hub */}
      <mesh>
        <sphereGeometry
          args={[
            0.1,
            16,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#4b5563"
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

export default function Bike() {
  const frontWheelRef =
    useRef<THREE.Group>(null);

  const rearWheelRef =
    useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const speed =
      useGameStore.getState().speed;

    const rotationAmount =
      speed * delta * 0.11;

    if (
      frontWheelRef.current
    ) {
      frontWheelRef.current.rotation.x -=
        rotationAmount;
    }

    if (
      rearWheelRef.current
    ) {
      rearWheelRef.current.rotation.x -=
        rotationAmount;
    }
  });

  return (
    <group>
      {/* ========================= */}
      {/* WHEELS */}
      {/* ========================= */}

      <Wheel
        position={[
          0,
          0.48,
          -1.28,
        ]}
        wheelRef={
          frontWheelRef
        }
      />

      <Wheel
        position={[
          0,
          0.48,
          1.2,
        ]}
        wheelRef={
          rearWheelRef
        }
      />

      {/* ========================= */}
      {/* FRAME */}
      {/* ========================= */}

      <mesh
        position={[
          0,
          0.8,
          0.05,
        ]}
        rotation={[
          0.05,
          0,
          0,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.42,
            0.28,
            1.7,
          ]}
        />

        <meshStandardMaterial
          color="#15171c"
          metalness={0.8}
          roughness={0.28}
        />
      </mesh>

      {/* ========================= */}
      {/* ENGINE */}
      {/* ========================= */}

      <mesh
        position={[
          0,
          0.78,
          0.15,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.68,
            0.62,
            0.72,
          ]}
        />

        <meshStandardMaterial
          color="#262a31"
          metalness={0.9}
          roughness={0.32}
        />
      </mesh>

      <mesh
        position={[
          -0.35,
          0.78,
          0.1,
        ]}
        rotation={[
          0,
          0,
          Math.PI / 2,
        ]}
      >
        <cylinderGeometry
          args={[
            0.2,
            0.2,
            0.14,
            20,
          ]}
        />

        <meshStandardMaterial
          color="#626872"
          metalness={1}
          roughness={0.25}
        />
      </mesh>

      <mesh
        position={[
          0.35,
          0.78,
          0.1,
        ]}
        rotation={[
          0,
          0,
          Math.PI / 2,
        ]}
      >
        <cylinderGeometry
          args={[
            0.2,
            0.2,
            0.14,
            20,
          ]}
        />

        <meshStandardMaterial
          color="#626872"
          metalness={1}
          roughness={0.25}
        />
      </mesh>

      {/* ========================= */}
      {/* LOWER FAIRING */}
      {/* ========================= */}

      <mesh
        position={[
          0,
          0.72,
          -0.46,
        ]}
        rotation={[
          -0.15,
          0,
          0,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.74,
            0.55,
            0.95,
          ]}
        />

        <meshStandardMaterial
          color="#4c1d95"
          metalness={0.65}
          roughness={0.2}
        />
      </mesh>

      {/* Left fairing */}
      <mesh
        position={[
          -0.38,
          0.9,
          -0.4,
        ]}
        rotation={[
          -0.15,
          0.08,
          0.08,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.12,
            0.62,
            1.05,
          ]}
        />

        <meshStandardMaterial
          color="#7c3aed"
          metalness={0.75}
          roughness={0.18}
        />
      </mesh>

      {/* Right fairing */}
      <mesh
        position={[
          0.38,
          0.9,
          -0.4,
        ]}
        rotation={[
          -0.15,
          -0.08,
          -0.08,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.12,
            0.62,
            1.05,
          ]}
        />

        <meshStandardMaterial
          color="#7c3aed"
          metalness={0.75}
          roughness={0.18}
        />
      </mesh>

      {/* ========================= */}
      {/* FUEL TANK */}
      {/* ========================= */}

      <mesh
        position={[
          0,
          1.22,
          -0.18,
        ]}
        scale={[
          1,
          0.72,
          1.25,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[
            0.55,
            32,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#7c3aed"
          metalness={0.8}
          roughness={0.18}
        />
      </mesh>

      {/* Tank center detail */}
      <mesh
        position={[
          0,
          1.56,
          -0.2,
        ]}
        scale={[
          0.5,
          0.08,
          0.55,
        ]}
      >
        <sphereGeometry
          args={[
            0.5,
            20,
            20,
          ]}
        />

        <meshStandardMaterial
          color="#111318"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* ========================= */}
      {/* SEAT */}
      {/* ========================= */}

      <mesh
        position={[
          0,
          1.18,
          0.72,
        ]}
        rotation={[
          -0.1,
          0,
          0,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.58,
            0.16,
            0.92,
          ]}
        />

        <meshStandardMaterial
          color="#08090c"
          roughness={0.92}
        />
      </mesh>

      {/* Tail fairing */}
      <mesh
        position={[
          0,
          1.23,
          1.18,
        ]}
        rotation={[
          -0.18,
          0,
          0,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.55,
            0.28,
            0.62,
          ]}
        />

        <meshStandardMaterial
          color="#5b21b6"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* ========================= */}
      {/* TAIL LIGHT */}
      {/* ========================= */}

      <mesh
        position={[
          0,
          1.28,
          1.5,
        ]}
      >
        <boxGeometry
          args={[
            0.38,
            0.09,
            0.05,
          ]}
        />

        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={5}
        />
      </mesh>

      <pointLight
        position={[
          0,
          1.25,
          1.65,
        ]}
        color="#ef4444"
        intensity={5}
        distance={4}
      />

      {/* ========================= */}
      {/* FRONT FORKS */}
      {/* ========================= */}

      <mesh
        position={[
          -0.22,
          0.9,
          -1.1,
        ]}
        rotation={[
          0.23,
          0,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.045,
            0.045,
            1.25,
            12,
          ]}
        />

        <meshStandardMaterial
          color="#a4a8ae"
          metalness={1}
          roughness={0.2}
        />
      </mesh>

      <mesh
        position={[
          0.22,
          0.9,
          -1.1,
        ]}
        rotation={[
          0.23,
          0,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.045,
            0.045,
            1.25,
            12,
          ]}
        />

        <meshStandardMaterial
          color="#a4a8ae"
          metalness={1}
          roughness={0.2}
        />
      </mesh>

      {/* ========================= */}
      {/* FRONT NOSE */}
      {/* ========================= */}

      <mesh
        position={[
          0,
          1.35,
          -1.02,
        ]}
        rotation={[
          -0.25,
          0,
          0,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.72,
            0.55,
            0.55,
          ]}
        />

        <meshStandardMaterial
          color="#6d28d9"
          metalness={0.8}
          roughness={0.16}
        />
      </mesh>

      {/* Windscreen */}
      <mesh
        position={[
          0,
          1.72,
          -0.95,
        ]}
        rotation={[
          -0.35,
          0,
          0,
        ]}
      >
        <planeGeometry
          args={[
            0.62,
            0.58,
          ]}
        />

        <meshStandardMaterial
          color="#182133"
          transparent
          opacity={0.55}
          metalness={0.5}
          roughness={0.08}
          side={
            THREE.DoubleSide
          }
        />
      </mesh>

      {/* ========================= */}
      {/* DUAL HEADLIGHT */}
      {/* ========================= */}

      <mesh
        position={[
          -0.2,
          1.38,
          -1.31,
        ]}
      >
        <sphereGeometry
          args={[
            0.12,
            20,
            20,
          ]}
        />

        <meshStandardMaterial
          color="#ffffff"
          emissive="#dbeafe"
          emissiveIntensity={6}
        />
      </mesh>

      <mesh
        position={[
          0.2,
          1.38,
          -1.31,
        ]}
      >
        <sphereGeometry
          args={[
            0.12,
            20,
            20,
          ]}
        />

        <meshStandardMaterial
          color="#ffffff"
          emissive="#dbeafe"
          emissiveIntensity={6}
        />
      </mesh>

      {/* Headlight beam */}
      <spotLight
        position={[
          0,
          1.4,
          -1.4,
        ]}
        intensity={35}
        distance={35}
        angle={0.34}
        penumbra={0.75}
        color="#e0f2fe"
        castShadow
      />

      {/* ========================= */}
      {/* HANDLE BAR */}
      {/* ========================= */}

      <mesh
        position={[
          0,
          1.58,
          -0.72,
        ]}
      >
        <boxGeometry
          args={[
            1,
            0.055,
            0.055,
          ]}
        />

        <meshStandardMaterial
          color="#6b7280"
          metalness={1}
        />
      </mesh>

      {/* ========================= */}
      {/* EXHAUST */}
      {/* ========================= */}

      <mesh
        position={[
          0.46,
          0.65,
          0.88,
        ]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.12,
            0.16,
            1.05,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#6b7280"
          metalness={1}
          roughness={0.2}
        />
      </mesh>

      {/* ========================= */}
      {/* RIDER */}
      {/* ========================= */}

      {/* Torso */}
      <mesh
        position={[
          0,
          1.9,
          0.25,
        ]}
        rotation={[
          0.33,
          0,
          0,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.62,
            0.95,
            0.38,
          ]}
        />

        <meshStandardMaterial
          color="#111827"
          roughness={0.6}
        />
      </mesh>

      {/* Shoulder armour */}
      <mesh
        position={[
          -0.37,
          2.13,
          0.05,
        ]}
      >
        <sphereGeometry
          args={[
            0.17,
            16,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#232936"
          metalness={0.45}
        />
      </mesh>

      <mesh
        position={[
          0.37,
          2.13,
          0.05,
        ]}
      >
        <sphereGeometry
          args={[
            0.17,
            16,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#232936"
          metalness={0.45}
        />
      </mesh>

      {/* Left arm */}
      <mesh
        position={[
          -0.39,
          1.82,
          -0.38,
        ]}
        rotation={[
          0.75,
          0,
          -0.25,
        ]}
      >
        <capsuleGeometry
          args={[
            0.1,
            0.65,
            8,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#111827"
        />
      </mesh>

      {/* Right arm */}
      <mesh
        position={[
          0.39,
          1.82,
          -0.38,
        ]}
        rotation={[
          0.75,
          0,
          0.25,
        ]}
      >
        <capsuleGeometry
          args={[
            0.1,
            0.65,
            8,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#111827"
        />
      </mesh>

      {/* Left leg */}
      <mesh
        position={[
          -0.27,
          1.2,
          0.48,
        ]}
        rotation={[
          0.75,
          0,
          -0.1,
        ]}
      >
        <capsuleGeometry
          args={[
            0.12,
            0.85,
            8,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#090b10"
        />
      </mesh>

      {/* Right leg */}
      <mesh
        position={[
          0.27,
          1.2,
          0.48,
        ]}
        rotation={[
          0.75,
          0,
          0.1,
        ]}
      >
        <capsuleGeometry
          args={[
            0.12,
            0.85,
            8,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#090b10"
        />
      </mesh>

      {/* ========================= */}
      {/* HELMET */}
      {/* ========================= */}

      <mesh
        position={[
          0,
          2.57,
          -0.02,
        ]}
        scale={[
          1,
          1.05,
          1.05,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[
            0.34,
            32,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#07090d"
          metalness={0.75}
          roughness={0.14}
        />
      </mesh>

      {/* Helmet visor */}
      <mesh
        position={[
          0,
          2.59,
          -0.32,
        ]}
        rotation={[
          -0.05,
          0,
          0,
        ]}
      >
        <sphereGeometry
          args={[
            0.28,
            24,
            24,
            0,
            Math.PI * 2,
            0,
            Math.PI / 2,
          ]}
        />

        <meshStandardMaterial
          color="#111827"
          emissive="#172554"
          emissiveIntensity={0.45}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>

      {/* Helmet purple detail */}
      <mesh
        position={[
          0,
          2.82,
          0.03,
        ]}
      >
        <boxGeometry
          args={[
            0.08,
            0.04,
            0.42,
          ]}
        />

        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}