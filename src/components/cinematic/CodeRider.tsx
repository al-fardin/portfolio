"use client";

import {
  useEffect,
  useMemo,
} from "react";

import {
  RoundedBox,
  useTexture,
} from "@react-three/drei";

import * as THREE from "three";

/* =========================================================
   LIMB

   Two points-এর মাঝে automatically
   arm / leg তৈরি করে।

   তাই আগের মতো disconnected
   ball/capsule look হবে না।
========================================================= */

function Limb({
  from,
  to,
  radius = 0.08,
  color,
}: {
  from: [number, number, number];
  to: [number, number, number];
  radius?: number;
  color: string;
}) {
  const data = useMemo(() => {
    const start =
      new THREE.Vector3(...from);

    const end =
      new THREE.Vector3(...to);

    const direction =
      end.clone().sub(start);

    const length =
      direction.length();

    const midpoint =
      start
        .clone()
        .add(end)
        .multiplyScalar(0.5);

    const quaternion =
      new THREE.Quaternion();

    quaternion.setFromUnitVectors(
      new THREE.Vector3(
        0,
        1,
        0
      ),
      direction
        .clone()
        .normalize()
    );

    return {
      midpoint,
      quaternion,
      length,
    };
  }, [from, to]);

  return (
    <mesh
      position={[
        data.midpoint.x,
        data.midpoint.y,
        data.midpoint.z,
      ]}
      quaternion={
        data.quaternion
      }
      castShadow
    >
      <cylinderGeometry
        args={[
          radius * 0.9,
          radius,
          data.length,
          20,
        ]}
      />

      <meshStandardMaterial
        color={color}
        roughness={0.78}
      />
    </mesh>
  );
}

/* =========================================================
   CODE GENERATED RIDER
========================================================= */

export default function CodeRider() {
  const faceTexture =
    useTexture(
      "/textures/rider-face.png"
    );

  useEffect(() => {
    faceTexture.colorSpace =
      THREE.SRGBColorSpace;

    faceTexture.anisotropy =
      8;

    faceTexture.needsUpdate =
      true;
  }, [faceTexture]);

  return (
    /*
      Position relative to
      motorcycle seat.
    */

    <group
      position={[
        0,
        0.03,
        0.04,
      ]}
      scale={1}
    >
      {/* ===============================================
          LOWER BODY / HIP
      =============================================== */}

      <mesh
        position={[
          0,
          1.02,
          0.16,
        ]}
        rotation={[
          -0.08,
          0,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.25,
            0.3,
            0.38,
            28,
          ]}
        />

        <meshStandardMaterial
          color="#15191e"
          roughness={0.86}
        />
      </mesh>

      {/* ===============================================
          TORSO
          Slight riding lean.
      =============================================== */}

      <mesh
        position={[
          0,
          1.45,
          -0.02,
        ]}
        rotation={[
          -0.24,
          0,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.35,
            0.27,
            0.78,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#07172d"
          roughness={0.76}
        />
      </mesh>

      {/* ===============================================
          BLACK / DARK WAISTCOAT

          তোমার reference photo-এর
          dark vest look.
      =============================================== */}

      <RoundedBox
        args={[
          0.61,
          0.63,
          0.28,
        ]}
        radius={0.06}
        smoothness={6}
        position={[
          0,
          1.5,
          0.105,
        ]}
        rotation={[
          -0.24,
          0,
          0,
        ]}
        castShadow
      >
        <meshStandardMaterial
          color="#101218"
          roughness={0.58}
          metalness={0.03}
        />
      </RoundedBox>

      {/* waistcoat centre seam */}

      <mesh
        position={[
          0,
          1.49,
          0.259,
        ]}
        rotation={[
          -0.24,
          0,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.018,
            0.52,
            0.01,
          ]}
        />

        <meshStandardMaterial
          color="#252932"
          roughness={0.7}
        />
      </mesh>

      {/* ===============================================
          SHOULDERS
      =============================================== */}

      <mesh
        position={[
          -0.31,
          1.66,
          -0.05,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[
            0.135,
            22,
            18,
          ]}
        />

        <meshStandardMaterial
          color="#07172d"
          roughness={0.75}
        />
      </mesh>

      <mesh
        position={[
          0.31,
          1.66,
          -0.05,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[
            0.135,
            22,
            18,
          ]}
        />

        <meshStandardMaterial
          color="#07172d"
          roughness={0.75}
        />
      </mesh>

      {/* ===============================================
          LEFT ARM
      =============================================== */}

      <Limb
        from={[
          -0.31,
          1.64,
          -0.08,
        ]}
        to={[
          -0.39,
          1.42,
          -0.38,
        ]}
        radius={0.09}
        color="#07172d"
      />

      <Limb
        from={[
          -0.39,
          1.42,
          -0.38,
        ]}
        to={[
          -0.42,
          1.24,
          -0.71,
        ]}
        radius={0.075}
        color="#07172d"
      />

      {/* ===============================================
          RIGHT ARM
      =============================================== */}

      <Limb
        from={[
          0.31,
          1.64,
          -0.08,
        ]}
        to={[
          0.39,
          1.42,
          -0.38,
        ]}
        radius={0.09}
        color="#07172d"
      />

      <Limb
        from={[
          0.39,
          1.42,
          -0.38,
        ]}
        to={[
          0.42,
          1.24,
          -0.71,
        ]}
        radius={0.075}
        color="#07172d"
      />

      {/* ===============================================
          GLOVES
      =============================================== */}

      <mesh
        position={[
          -0.42,
          1.24,
          -0.72,
        ]}
        scale={[
          1.25,
          0.85,
          1.5,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[
            0.075,
            18,
            14,
          ]}
        />

        <meshStandardMaterial
          color="#090b0e"
          roughness={0.55}
        />
      </mesh>

      <mesh
        position={[
          0.42,
          1.24,
          -0.72,
        ]}
        scale={[
          1.25,
          0.85,
          1.5,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[
            0.075,
            18,
            14,
          ]}
        />

        <meshStandardMaterial
          color="#090b0e"
          roughness={0.55}
        />
      </mesh>

      {/* ===============================================
          LEFT LEG
      =============================================== */}

      <Limb
        from={[
          -0.17,
          1.04,
          0.14,
        ]}
        to={[
          -0.31,
          0.7,
          -0.02,
        ]}
        radius={0.115}
        color="#111827"
      />

      <Limb
        from={[
          -0.31,
          0.7,
          -0.02,
        ]}
        to={[
          -0.33,
          0.39,
          -0.34,
        ]}
        radius={0.085}
        color="#111827"
      />

      {/* ===============================================
          RIGHT LEG
      =============================================== */}

      <Limb
        from={[
          0.17,
          1.04,
          0.14,
        ]}
        to={[
          0.31,
          0.7,
          -0.02,
        ]}
        radius={0.115}
        color="#111827"
      />

      <Limb
        from={[
          0.31,
          0.7,
          -0.02,
        ]}
        to={[
          0.33,
          0.39,
          -0.34,
        ]}
        radius={0.085}
        color="#111827"
      />

      {/* ===============================================
          SHOES
      =============================================== */}

      <RoundedBox
        args={[
          0.18,
          0.14,
          0.36,
        ]}
        radius={0.04}
        smoothness={4}
        position={[
          -0.34,
          0.33,
          -0.37,
        ]}
        rotation={[
          0.04,
          0,
          0,
        ]}
        castShadow
      >
        <meshStandardMaterial
          color="#080a0d"
          roughness={0.65}
        />
      </RoundedBox>

      <RoundedBox
        args={[
          0.18,
          0.14,
          0.36,
        ]}
        radius={0.04}
        smoothness={4}
        position={[
          0.34,
          0.33,
          -0.37,
        ]}
        rotation={[
          0.04,
          0,
          0,
        ]}
        castShadow
      >
        <meshStandardMaterial
          color="#080a0d"
          roughness={0.65}
        />
      </RoundedBox>

      {/* ===============================================
          NECK
      =============================================== */}

      <mesh
        position={[
          0,
          1.87,
          -0.16,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.105,
            0.115,
            0.22,
            22,
          ]}
        />

        <meshStandardMaterial
          color="#80513e"
          roughness={0.82}
        />
      </mesh>

      {/* ===============================================
          HEAD
      =============================================== */}

      <mesh
        position={[
          0,
          2.08,
          -0.19,
        ]}
        scale={[
          0.84,
          1,
          0.82,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[
            0.285,
            36,
            28,
          ]}
        />

        <meshStandardMaterial
          color="#865744"
          roughness={0.74}
        />
      </mesh>

      {/* ===============================================
          HAIR VOLUME
      =============================================== */}

      <mesh
        position={[
          0,
          2.29,
          -0.17,
        ]}
        scale={[
          1,
          0.47,
          0.92,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[
            0.285,
            28,
            22,
          ]}
        />

        <meshStandardMaterial
          color="#111015"
          roughness={0.95}
        />
      </mesh>

      {/* hair front volume */}

      <mesh
        position={[
          -0.035,
          2.32,
          -0.34,
        ]}
        scale={[
          0.9,
          0.38,
          0.5,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[
            0.22,
            24,
            18,
          ]}
        />

        <meshStandardMaterial
          color="#111015"
          roughness={0.95}
        />
      </mesh>

      {/* ===============================================
          BEARD VOLUME

          তোমার photo-এর full beard
          silhouette.
      =============================================== */}

      <mesh
        position={[
          0,
          1.94,
          -0.365,
        ]}
        scale={[
          0.82,
          0.95,
          0.48,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[
            0.23,
            28,
            22,
          ]}
        />

        <meshStandardMaterial
          color="#161015"
          roughness={0.96}
        />
      </mesh>

      {/* ===============================================
          YOUR FACE TEXTURE

          Thin decal in front of the
          coded 3D head.
      =============================================== */}

      <mesh
        position={[
          0,
          2.08,
          -0.426,
        ]}
        rotation={[
          0,
          Math.PI,
          0,
        ]}
      >
        <planeGeometry
          args={[
            0.47,
            0.52,
          ]}
        />

        <meshBasicMaterial
          map={faceTexture}
          transparent
          alphaTest={0.08}
          depthWrite={false}
          toneMapped={false}
          side={
            THREE.DoubleSide
          }
        />
      </mesh>

      {/* ===============================================
          EARS
      =============================================== */}

      <mesh
        position={[
          -0.245,
          2.08,
          -0.19,
        ]}
      >
        <sphereGeometry
          args={[
            0.055,
            18,
            14,
          ]}
        />

        <meshStandardMaterial
          color="#80513e"
          roughness={0.82}
        />
      </mesh>

      <mesh
        position={[
          0.245,
          2.08,
          -0.19,
        ]}
      >
        <sphereGeometry
          args={[
            0.055,
            18,
            14,
          ]}
        />

        <meshStandardMaterial
          color="#80513e"
          roughness={0.82}
        />
      </mesh>
    </group>
  );
}