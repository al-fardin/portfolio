"use client";

import { useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useGameStore } from "@/store/useGameStore";

export default function DestinationMarker() {
  const ringRef = useRef<THREE.Mesh>(null);

  const reached = useGameStore(
    (state) => state.destinationReached
  );

  const markerColor = reached
    ? "#22d3ee"
    : "#8b5cf6";

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z +=
        delta * 0.5;
    }
  });

  return (
    <group position={[0, 0, -120]}>
      {/* Ground marker */}
      <mesh
        ref={ringRef}
        position={[0, 0.08, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <torusGeometry
          args={[3, 0.08, 16, 64]}
        />

        <meshStandardMaterial
          color={markerColor}
          emissive={markerColor}
          emissiveIntensity={4}
        />
      </mesh>

      {/* Vertical beacon */}
      <mesh position={[0, 4, 0]}>
        <cylinderGeometry
          args={[0.08, 0.08, 8, 16]}
        />

        <meshStandardMaterial
          color={markerColor}
          emissive={markerColor}
          emissiveIntensity={5}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Beacon light */}
      <pointLight
        position={[0, 2, 0]}
        color={markerColor}
        intensity={30}
        distance={18}
      />

      {/* Destination floating label */}
      <Html
        position={[0, 5.2, 0]}
        center
        distanceFactor={18}
      >
        <div
          style={{
            minWidth: "180px",
            padding: "10px 14px",
            border: `1px solid ${markerColor}`,
            background: "rgba(4, 6, 10, 0.78)",
            color: "white",
            textAlign: "center",
            fontFamily: "monospace",
            letterSpacing: "0.12em",
            fontSize: "11px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              opacity: 0.55,
              fontSize: "9px",
            }}
          >
            DESTINATION 01
          </div>

          <div
            style={{
              marginTop: "4px",
              fontWeight: 700,
            }}
          >
            {reached
              ? "DESTINATION REACHED"
              : "ABOUT VIEWPOINT"}
          </div>
        </div>
      </Html>
    </group>
  );
}