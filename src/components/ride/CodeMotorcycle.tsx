"use client";

import {
  useMemo,
  useRef,
  type MutableRefObject,
} from "react";

import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  speedRef: MutableRefObject<number>;
  engineRef: MutableRefObject<number>;
};

function Tube({
  from,
  to,
  radius = 0.035,
  color = "#17191d",
  metalness = 0.8,
  roughness = 0.25,
}: {
  from: [number, number, number];
  to: [number, number, number];
  radius?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
}) {
  const data = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);

    const direction = b.clone().sub(a);
    const length = direction.length();

    const center = a
      .clone()
      .add(b)
      .multiplyScalar(0.5);

    const quaternion =
      new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.clone().normalize()
      );

    return {
      center,
      quaternion,
      length,
    };
  }, [from, to]);

  return (
    <mesh
      position={data.center}
      quaternion={data.quaternion}
      castShadow
    >
      <cylinderGeometry
        args={[
          radius,
          radius,
          data.length,
          16,
        ]}
      />

      <meshPhysicalMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        clearcoat={0.35}
        clearcoatRoughness={0.25}
      />
    </mesh>
  );
}

function WheelVisual() {
  return (
    <>
      {/* tyre */}

      <mesh
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
        castShadow
      >
        <torusGeometry
          args={[
            0.48,
            0.105,
            22,
            54,
          ]}
        />

        <meshPhysicalMaterial
          color="#050607"
          roughness={0.64}
          metalness={0.08}
        />
      </mesh>

      {/* rim */}

      <mesh
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.33,
            0.032,
            14,
            42,
          ]}
        />

        <meshPhysicalMaterial
          color="#b57a2b"
          metalness={0.95}
          roughness={0.18}
          clearcoat={0.6}
        />
      </mesh>

      {/* hub */}

      <mesh
        rotation={[
          0,
          0,
          Math.PI / 2,
        ]}
      >
        <cylinderGeometry
          args={[
            0.105,
            0.105,
            0.18,
            24,
          ]}
        />

        <meshStandardMaterial
          color="#272a2e"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* brake disc */}

      <mesh
        rotation={[
          0,
          0,
          Math.PI / 2,
        ]}
        position={[
          0.075,
          0,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.245,
            0.245,
            0.018,
            38,
          ]}
        />

        <meshStandardMaterial
          color="#777b7e"
          metalness={0.92}
          roughness={0.25}
        />
      </mesh>

      {/* spokes */}

      {Array.from({
        length: 10,
      }).map((_, index) => (
        <mesh
          key={index}
          rotation={[
            index *
              (Math.PI / 5),
            0,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.025,
              0.59,
              0.025,
            ]}
          />

          <meshStandardMaterial
            color="#b67b2c"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}
    </>
  );
}

export default function CodeMotorcycle({
  speedRef,
  engineRef,
}: Props) {
  const rearWheel =
    useRef<THREE.Group>(null);

  const frontWheel =
    useRef<THREE.Group>(null);

  const tailMaterial =
    useRef<THREE.MeshStandardMaterial>(
      null
    );

  const headMaterial =
    useRef<THREE.MeshStandardMaterial>(
      null
    );

  const headLight =
    useRef<THREE.PointLight>(null);

  const wheelAngle =
    useRef(0);

  useFrame((_, delta) => {
    const speed =
      THREE.MathUtils.clamp(
        speedRef.current,
        0,
        1
      );

    const engine =
      THREE.MathUtils.clamp(
        engineRef.current,
        0,
        1
      );

    wheelAngle.current +=
      delta *
      speed *
      30;

    if (rearWheel.current) {
      rearWheel.current.rotation.x =
        wheelAngle.current;
    }

    if (frontWheel.current) {
      frontWheel.current.rotation.x =
        wheelAngle.current;
    }

    if (tailMaterial.current) {
      tailMaterial.current.emissiveIntensity =
        THREE.MathUtils.lerp(
          0.4,
          7,
          engine
        );
    }

    if (headMaterial.current) {
      headMaterial.current.emissiveIntensity =
        THREE.MathUtils.lerp(
          0,
          5,
          engine
        );
    }

    if (headLight.current) {
      headLight.current.intensity =
        THREE.MathUtils.lerp(
          0,
          6,
          engine
        );
    }
  });

  return (
    <group>
      {/* =================================
          WHEELS
      ================================= */}

      <group
        ref={rearWheel}
        position={[
          0,
          0.52,
          1.08,
        ]}
      >
        <WheelVisual />
      </group>

      <group
        ref={frontWheel}
        position={[
          0,
          0.52,
          -1.36,
        ]}
      >
        <WheelVisual />
      </group>

      {/* =================================
          SWING ARM
      ================================= */}

      <Tube
        from={[
          -0.22,
          0.56,
          0.92,
        ]}
        to={[
          -0.25,
          0.72,
          0.08,
        ]}
        radius={0.055}
      />

      <Tube
        from={[
          0.22,
          0.56,
          0.92,
        ]}
        to={[
          0.25,
          0.72,
          0.08,
        ]}
        radius={0.055}
      />

      {/* =================================
          MAIN FRAME
      ================================= */}

      <Tube
        from={[
          -0.24,
          0.72,
          0.08,
        ]}
        to={[
          -0.22,
          1.18,
          -0.4,
        ]}
        radius={0.045}
        color="#202328"
      />

      <Tube
        from={[
          0.24,
          0.72,
          0.08,
        ]}
        to={[
          0.22,
          1.18,
          -0.4,
        ]}
        radius={0.045}
        color="#202328"
      />

      <Tube
        from={[
          -0.22,
          1.18,
          -0.4,
        ]}
        to={[
          -0.18,
          0.65,
          -0.6,
        ]}
        radius={0.042}
        color="#202328"
      />

      <Tube
        from={[
          0.22,
          1.18,
          -0.4,
        ]}
        to={[
          0.18,
          0.65,
          -0.6,
        ]}
        radius={0.042}
        color="#202328"
      />

      {/* centre lower frame */}

      <Tube
        from={[
          -0.2,
          0.62,
          -0.58,
        ]}
        to={[
          -0.22,
          0.7,
          0.16,
        ]}
        radius={0.04}
      />

      <Tube
        from={[
          0.2,
          0.62,
          -0.58,
        ]}
        to={[
          0.22,
          0.7,
          0.16,
        ]}
        radius={0.04}
      />

      {/* =================================
          ENGINE
      ================================= */}

      <mesh
        position={[
          0,
          0.72,
          -0.05,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.58,
            0.55,
            0.56,
          ]}
        />

        <meshPhysicalMaterial
          color="#22252a"
          metalness={0.82}
          roughness={0.27}
          clearcoat={0.25}
        />
      </mesh>

      {/* engine fins */}

      {Array.from({
        length: 6,
      }).map((_, index) => (
        <mesh
          key={index}
          position={[
            0,
            0.54 +
              index * 0.08,
            -0.05,
          ]}
        >
          <boxGeometry
            args={[
              0.68,
              0.018,
              0.58,
            ]}
          />

          <meshStandardMaterial
            color={
              index % 2 === 0
                ? "#b37a31"
                : "#37393d"
            }
            metalness={0.88}
            roughness={0.24}
          />
        </mesh>
      ))}

      {/* =================================
          FUEL TANK
      ================================= */}

      <mesh
        position={[
          0,
          1.19,
          -0.32,
        ]}
        scale={[
          0.63,
          0.43,
          0.82,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[
            0.63,
            42,
            30,
          ]}
        />

        <meshPhysicalMaterial
          color="#090b0e"
          metalness={0.72}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* tank centre metal stripe */}

      <mesh
        position={[
          0,
          1.49,
          -0.35,
        ]}
      >
        <boxGeometry
          args={[
            0.07,
            0.018,
            0.72,
          ]}
        />

        <meshPhysicalMaterial
          color="#c38a37"
          metalness={0.95}
          roughness={0.16}
          clearcoat={0.7}
        />
      </mesh>

      {/* =================================
          SEAT
      ================================= */}

      <RoundedBox
        args={[
          0.66,
          0.16,
          0.82,
        ]}
        radius={0.07}
        smoothness={8}
        position={[
          0,
          1.15,
          0.52,
        ]}
        rotation={[
          -0.06,
          0,
          0,
        ]}
        castShadow
      >
        <meshPhysicalMaterial
          color="#07080a"
          roughness={0.48}
          clearcoat={0.2}
        />
      </RoundedBox>

      {/* =================================
          REAR SHOCKS
      ================================= */}

      <Tube
        from={[
          -0.3,
          0.55,
          0.98,
        ]}
        to={[
          -0.26,
          1.03,
          0.44,
        ]}
        radius={0.035}
        color="#c38b3c"
        metalness={0.95}
      />

      <Tube
        from={[
          0.3,
          0.55,
          0.98,
        ]}
        to={[
          0.26,
          1.03,
          0.44,
        ]}
        radius={0.035}
        color="#c38b3c"
        metalness={0.95}
      />

      {/* =================================
          FRONT FORK
      ================================= */}

      <Tube
        from={[
          -0.19,
          0.56,
          -1.28,
        ]}
        to={[
          -0.22,
          1.48,
          -0.92,
        ]}
        radius={0.043}
        color="#c29145"
        metalness={0.96}
      />

      <Tube
        from={[
          0.19,
          0.56,
          -1.28,
        ]}
        to={[
          0.22,
          1.48,
          -0.92,
        ]}
        radius={0.043}
        color="#c29145"
        metalness={0.96}
      />

      {/* =================================
          HANDLEBAR
      ================================= */}

      <Tube
        from={[
          -0.69,
          1.5,
          -0.93,
        ]}
        to={[
          0.69,
          1.5,
          -0.93,
        ]}
        radius={0.033}
        color="#131519"
      />

      {/* raised bars */}

      <Tube
        from={[
          -0.2,
          1.46,
          -0.9,
        ]}
        to={[
          -0.52,
          1.56,
          -0.94,
        ]}
        radius={0.03}
      />

      <Tube
        from={[
          0.2,
          1.46,
          -0.9,
        ]}
        to={[
          0.52,
          1.56,
          -0.94,
        ]}
        radius={0.03}
      />

      {/* grips */}

      <RoundedBox
        args={[
          0.23,
          0.075,
          0.075,
        ]}
        radius={0.025}
        smoothness={4}
        position={[
          -0.71,
          1.5,
          -0.93,
        ]}
      >
        <meshStandardMaterial
          color="#050607"
          roughness={0.8}
        />
      </RoundedBox>

      <RoundedBox
        args={[
          0.23,
          0.075,
          0.075,
        ]}
        radius={0.025}
        smoothness={4}
        position={[
          0.71,
          1.5,
          -0.93,
        ]}
      >
        <meshStandardMaterial
          color="#050607"
          roughness={0.8}
        />
      </RoundedBox>

      {/* =================================
          MIRRORS
      ================================= */}

      <Tube
        from={[
          -0.55,
          1.54,
          -0.94,
        ]}
        to={[
          -0.76,
          1.77,
          -0.95,
        ]}
        radius={0.018}
      />

      <Tube
        from={[
          0.55,
          1.54,
          -0.94,
        ]}
        to={[
          0.76,
          1.77,
          -0.95,
        ]}
        radius={0.018}
      />

      <mesh
        position={[
          -0.8,
          1.82,
          -0.95,
        ]}
        scale={[
          1.3,
          0.85,
          0.3,
        ]}
      >
        <sphereGeometry
          args={[
            0.12,
            20,
            14,
          ]}
        />

        <meshPhysicalMaterial
          color="#1b2026"
          metalness={0.7}
          roughness={0.18}
          clearcoat={0.8}
        />
      </mesh>

      <mesh
        position={[
          0.8,
          1.82,
          -0.95,
        ]}
        scale={[
          1.3,
          0.85,
          0.3,
        ]}
      >
        <sphereGeometry
          args={[
            0.12,
            20,
            14,
          ]}
        />

        <meshPhysicalMaterial
          color="#1b2026"
          metalness={0.7}
          roughness={0.18}
          clearcoat={0.8}
        />
      </mesh>

      {/* =================================
          HEADLIGHT
      ================================= */}

      <mesh
        position={[
          0,
          1.31,
          -1.17,
        ]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.2,
            0.22,
            0.15,
            30,
          ]}
        />

        <meshPhysicalMaterial
          color="#22252a"
          metalness={0.8}
          roughness={0.18}
        />
      </mesh>

      <mesh
        position={[
          0,
          1.31,
          -1.255,
        ]}
      >
        <circleGeometry
          args={[
            0.165,
            28,
          ]}
        />

        <meshStandardMaterial
          ref={headMaterial}
          color="#fff4dc"
          emissive="#ffe8b8"
          emissiveIntensity={0}
        />
      </mesh>

      <pointLight
        ref={headLight}
        position={[
          0,
          1.3,
          -1.45,
        ]}
        color="#ffe2b0"
        intensity={0}
        distance={14}
      />

      {/* =================================
          REAR FENDER
      ================================= */}

      <mesh
        position={[
          0,
          0.94,
          0.99,
        ]}
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.52,
            0.035,
            12,
            28,
            Math.PI
          ]}
        />

        <meshPhysicalMaterial
          color="#0b0d10"
          metalness={0.72}
          roughness={0.2}
          clearcoat={0.8}
        />
      </mesh>

      {/* =================================
          TAIL LIGHT
      ================================= */}

      <mesh
        position={[
          0,
          1.18,
          1.02,
        ]}
      >
        <boxGeometry
          args={[
            0.33,
            0.09,
            0.07,
          ]}
        />

        <meshStandardMaterial
          ref={tailMaterial}
          color="#d3242f"
          emissive="#ff1729"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* =================================
          EXHAUST
      ================================= */}

      <Tube
        from={[
          0.31,
          0.57,
          -0.05,
        ]}
        to={[
          0.42,
          0.5,
          1.17,
        ]}
        radius={0.075}
        color="#21242a"
        metalness={0.92}
        roughness={0.18}
      />

      <mesh
        position={[
          0.43,
          0.5,
          1.19,
        ]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.075,
            0.018,
            10,
            24,
          ]}
        />

        <meshStandardMaterial
          color="#c38b3c"
          metalness={0.94}
          roughness={0.2}
        />
      </mesh>

      {/* foot pegs */}

      <Tube
        from={[
          -0.22,
          0.58,
          0.15,
        ]}
        to={[
          -0.5,
          0.58,
          0.15,
        ]}
        radius={0.035}
      />

      <Tube
        from={[
          0.22,
          0.58,
          0.15,
        ]}
        to={[
          0.5,
          0.58,
          0.15,
        ]}
        radius={0.035}
      />
    </group>
  );
}