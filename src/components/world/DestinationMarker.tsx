"use client";

import { useRef } from "react";

import {
  Html,
} from "@react-three/drei";

import {
  useFrame,
} from "@react-three/fiber";

import * as THREE from "three";

type DestinationMarkerProps = {
  position: [
    number,
    number,
    number
  ];

  index: string;
  title: string;

  color: string;

  active: boolean;
  completed: boolean;
};

export default function DestinationMarker({
  position,
  index,
  title,
  color,
  active,
  completed,
}: DestinationMarkerProps) {
  const ringRef =
    useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (
      ringRef.current &&
      active
    ) {
      ringRef.current.rotation.z +=
        delta * 0.65;
    }
  });

  /*
    Completed destination
    no longer needs marker
  */

  if (completed) {
    return null;
  }

  const opacity =
    active ? 1 : 0.18;

  return (
    <group position={position}>

      <mesh
        ref={ringRef}
        position={[0, 0.09, 0]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            3,
            0.08,
            16,
            64,
          ]}
        />

        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={
            active ? 5 : 0.5
          }
          transparent
          opacity={opacity}
        />
      </mesh>

      {active && (
        <>
          <mesh
            position={[
              0,
              4,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                0.07,
                0.07,
                8,
                16,
              ]}
            />

            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={5}
              transparent
              opacity={0.35}
            />
          </mesh>

          <pointLight
            position={[
              0,
              2,
              0,
            ]}
            color={color}
            intensity={30}
            distance={18}
          />

          <Html
            position={[
              0,
              5.2,
              0,
            ]}
            center
            distanceFactor={18}
          >
            <div
              style={{
                minWidth: "190px",
                padding: "10px 14px",

                border: `1px solid ${color}`,

                background:
                  "rgba(4,6,10,0.78)",

                color: "white",

                textAlign:
                  "center",

                fontFamily:
                  "monospace",

                letterSpacing:
                  "0.12em",

                fontSize:
                  "11px",

                backdropFilter:
                  "blur(10px)",

                pointerEvents:
                  "none",
              }}
            >
              <div
                style={{
                  opacity: 0.5,
                  fontSize: "9px",
                }}
              >
                DESTINATION {index}
              </div>

              <div
                style={{
                  marginTop: "4px",
                  fontWeight: 700,
                }}
              >
                {title}
              </div>
            </div>
          </Html>
        </>
      )}

    </group>
  );
}