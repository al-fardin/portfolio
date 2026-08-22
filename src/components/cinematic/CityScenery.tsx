"use client";

import {
  useMemo,
  useRef,
} from "react";

import {
  useFrame,
} from "@react-three/fiber";

import {
  useGLTF,
} from "@react-three/drei";

import * as THREE from "three";

import {
  clone,
} from "three/examples/jsm/utils/SkeletonUtils.js";

import {
  getJourneyFrame,
} from "./journeyPath";

/* =========================================================
   COMMON
========================================================= */

function getPlacement(
  t: number,
  side: -1 | 1,
  offset: number
) {
  const frame =
    getJourneyFrame(t);

  const position =
    frame.point
      .clone()
      .addScaledVector(
        frame.normal,
        side * offset
      );

  return {
    frame,
    position,
  };
}

function setupObject(
  object: THREE.Object3D
) {
  object.traverse(
    (child) => {
      if (
        child instanceof
        THREE.Mesh
      ) {
        child.castShadow =
          true;

        child.receiveShadow =
          true;
      }
    }
  );
}

/* =========================================================
   BUILDING02 INDIVIDUAL BUILDING
========================================================= */

function CityBuilding({
  name,
  t,
  side,
  offset,
  targetHeight,
  yaw = 0,
}: {
  name: string;
  t: number;
  side: -1 | 1;
  offset: number;
  targetHeight: number;
  yaw?: number;
}) {
  const gltf =
    useGLTF(
      "/models/environment/building02.glb"
    );

  const prepared =
    useMemo(() => {
      const source =
        gltf.scene.getObjectByName(
          name
        );

      if (!source) {
        console.warn(
          `Building not found: ${name}`
        );

        return null;
      }

      const object =
        clone(source);

      setupObject(object);

      object.updateMatrixWorld(
        true
      );

      const box =
        new THREE.Box3().setFromObject(
          object
        );

      const size =
        new THREE.Vector3();

      const center =
        new THREE.Vector3();

      box.getSize(size);
      box.getCenter(center);

      const originalHeight =
        Math.max(
          size.y,
          0.0001
        );

      const scale =
        targetHeight /
        originalHeight;

      return {
        object,
        scale,

        x:
          -center.x,

        y:
          -box.min.y,

        z:
          -center.z,
      };
    }, [
      gltf.scene,
      name,
      targetHeight,
    ]);

  const placement =
    useMemo(
      () =>
        getPlacement(
          t,
          side,
          offset
        ),
      [
        t,
        side,
        offset,
      ]
    );

  if (!prepared) {
    return null;
  }

  return (
    <group
      position={[
        placement.position.x,
        0,
        placement.position.z,
      ]}
      rotation={[
        0,
        placement.frame
          .roadYaw + yaw,
        0,
      ]}
    >
      <group
        scale={
          prepared.scale
        }
      >
        <group
          position={[
            prepared.x,
            prepared.y,
            prepared.z,
          ]}
        >
          <primitive
            object={
              prepared.object
            }
          />
        </group>
      </group>
    </group>
  );
}

/* =========================================================
   MOSQUE - HERO LANDMARK

   Mosque side-এর সামনে intentionally
   কোনো tall building রাখা হচ্ছে না.
========================================================= */

function MosqueLandmark() {
  const gltf =
    useGLTF(
      "/models/environment/mosque.glb"
    );

  const prepared =
    useMemo(() => {
      const object =
        clone(
          gltf.scene
        );

      setupObject(object);

      object.updateMatrixWorld(
        true
      );

      const box =
        new THREE.Box3().setFromObject(
          object
        );

      const size =
        new THREE.Vector3();

      const center =
        new THREE.Vector3();

      box.getSize(size);
      box.getCenter(center);

      const originalHeight =
        Math.max(
          size.y,
          0.0001
        );

      /*
        Mosque আগের চেয়ে
        একটু বড় করা হলো.
      */

      const targetHeight =
        13.8;

      const scale =
        targetHeight /
        originalHeight;

      return {
        object,
        scale,

        x:
          -center.x,

        y:
          -box.min.y,

        z:
          -center.z,
      };
    }, [
      gltf.scene,
    ]);

  const placement =
    useMemo(
      () =>
        getPlacement(
          0.083,
          -1,
          22.5
        ),
      []
    );

  return (
    <group
      position={[
        placement.position.x,
        0,
        placement.position.z,
      ]}
      rotation={[
        0,
        placement.frame
          .roadYaw -
          Math.PI / 2,
        0,
      ]}
    >
      <group
        scale={
          prepared.scale
        }
      >
        <group
          position={[
            prepared.x,
            prepared.y,
            prepared.z,
          ]}
        >
          <primitive
            object={
              prepared.object
            }
          />
        </group>
      </group>
    </group>
  );
}

/* =========================================================
   MOSQUE WALKWAY

   Road/sidewalk থেকে mosque পর্যন্ত
   একটা clear pedestrian approach.
========================================================= */

function MosqueWalkway() {
  const data =
    useMemo(() => {
      const frame =
        getJourneyFrame(
          0.083
        );

      const side:
        -1 | 1 = -1;

      const start =
        frame.point
          .clone()
          .addScaledVector(
            frame.normal,
            side * 7.3
          );

      const end =
        frame.point
          .clone()
          .addScaledVector(
            frame.normal,
            side * 20
          );

      const middle =
        start
          .clone()
          .add(end)
          .multiplyScalar(
            0.5
          );

      const direction =
        end
          .clone()
          .sub(start);

      const length =
        direction.length();

      const yaw =
        Math.atan2(
          direction.x,
          direction.z
        );

      return {
        middle,
        length,
        yaw,
      };
    }, []);

  return (
    <group
      position={[
        data.middle.x,
        0.035,
        data.middle.z,
      ]}
      rotation={[
        0,
        data.yaw,
        0,
      ]}
    >
      <mesh
        receiveShadow
      >
        <boxGeometry
          args={[
            3.4,
            0.08,
            data.length,
          ]}
        />

        <meshStandardMaterial
          color="#aaa59a"
          roughness={0.95}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   WALKING MOSQUE VISITOR

   Small distant silhouette.
   Later real human GLB দিয়ে replace করা যাবে.
========================================================= */

function MosqueVisitor({
  t,
  phase,
  speed,
  laneShift = 0,
}: {
  t: number;
  phase: number;
  speed: number;
  laneShift?: number;
}) {
  const rootRef =
    useRef<THREE.Group>(
      null
    );

  const leftLegRef =
    useRef<THREE.Mesh>(
      null
    );

  const rightLegRef =
    useRef<THREE.Mesh>(
      null
    );

  const frame =
    useMemo(
      () =>
        getJourneyFrame(t),
      [t]
    );

  useFrame(
    ({ clock }) => {
      if (
        !rootRef.current
      ) {
        return;
      }

      /*
        Continuous loop:
        sidewalk → mosque.
      */

      const rawProgress =
        (
          clock.elapsedTime *
            speed +
          phase
        ) % 1;

      const walkProgress =
        rawProgress *
        rawProgress *
        (
          3 -
          2 *
            rawProgress
        );

      const startOffset =
        7.6;

      const endOffset =
        19.2;

      const offset =
        THREE.MathUtils.lerp(
          startOffset,
          endOffset,
          walkProgress
        );

      const position =
        frame.point
          .clone()
          .addScaledVector(
            frame.normal,
            -offset
          );

      /*
        Slight t/lane variation
        যাতে সবাই একই line-এ না চলে.
      */

      position.addScaledVector(
        frame.tangent,
        laneShift
      );

      rootRef.current.position.set(
        position.x,
        0.1,
        position.z
      );

      /*
        Face toward mosque.
      */

      const direction =
        frame.normal
          .clone()
          .multiplyScalar(
            -1
          );

      rootRef.current.rotation.y =
        Math.atan2(
          direction.x,
          direction.z
        );

      /*
        Simple walking legs.
      */

      const walk =
        Math.sin(
          clock.elapsedTime *
            7 +
          phase * 10
        ) * 0.35;

      if (
        leftLegRef.current
      ) {
        leftLegRef.current.rotation.x =
          walk;
      }

      if (
        rightLegRef.current
      ) {
        rightLegRef.current.rotation.x =
          -walk;
      }
    }
  );

  return (
    <group
      ref={rootRef}
      scale={0.9}
    >
      {/* torso */}

      <mesh
        position={[
          0,
          0.92,
          0,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.32,
            0.72,
            0.22,
          ]}
        />

        <meshStandardMaterial
          color="#34383a"
          roughness={0.9}
        />
      </mesh>

      {/* head */}

      <mesh
        position={[
          0,
          1.38,
          0,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[
            0.13,
            14,
            10,
          ]}
        />

        <meshStandardMaterial
          color="#9a735e"
          roughness={0.9}
        />
      </mesh>

      {/* white prayer cap / tupi */}

      <mesh
        position={[
          0,
          1.5,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.13,
            0.13,
            0.08,
            18,
          ]}
        />

        <meshStandardMaterial
          color="#e3ded1"
          roughness={0.85}
        />
      </mesh>

      {/* left leg */}

      <mesh
        ref={leftLegRef}
        position={[
          -0.09,
          0.38,
          0,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.11,
            0.65,
            0.12,
          ]}
        />

        <meshStandardMaterial
          color="#24282b"
          roughness={0.95}
        />
      </mesh>

      {/* right leg */}

      <mesh
        ref={rightLegRef}
        position={[
          0.09,
          0.38,
          0,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.11,
            0.65,
            0.12,
          ]}
        />

        <meshStandardMaterial
          color="#24282b"
          roughness={0.95}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   PEOPLE FLOW
========================================================= */

function MosqueVisitors() {
  return (
    <>
      <MosqueVisitor
        t={0.074}
        phase={0}
        speed={0.045}
        laneShift={-1.1}
      />

      <MosqueVisitor
        t={0.078}
        phase={0.2}
        speed={0.05}
        laneShift={-0.35}
      />

      <MosqueVisitor
        t={0.083}
        phase={0.4}
        speed={0.047}
        laneShift={0.25}
      />

      <MosqueVisitor
        t={0.088}
        phase={0.63}
        speed={0.052}
        laneShift={0.8}
      />

      <MosqueVisitor
        t={0.092}
        phase={0.82}
        speed={0.046}
        laneShift={1.35}
      />
    </>
  );
}

/* =========================================================
   BUILDING01 BACKGROUND DISTRICT
========================================================= */

function ScannedDistrict() {
  const gltf =
    useGLTF(
      "/models/environment/building01.glb"
    );

  const prepared =
    useMemo(() => {
      const object =
        clone(
          gltf.scene
        );

      setupObject(object);

      object.updateMatrixWorld(
        true
      );

      const box =
        new THREE.Box3().setFromObject(
          object
        );

      const size =
        new THREE.Vector3();

      const center =
        new THREE.Vector3();

      box.getSize(size);
      box.getCenter(center);

      /*
        Scale by footprint.
      */

      const footprint =
        Math.max(
          size.x,
          size.z,
          0.0001
        );

      const scale =
        12 /
        footprint;

      return {
        object,
        scale,

        x:
          -center.x,

        y:
          -box.min.y,

        z:
          -center.z,
      };
    }, [
      gltf.scene,
    ]);

  /*
    Far away and opposite
    mosque sightline.
  */

  const placement =
    useMemo(
      () =>
        getPlacement(
          0.18,
          1,
          34
        ),
      []
    );

  return (
    <group
      position={[
        placement.position.x,
        -0.2,
        placement.position.z,
      ]}
      rotation={[
        0,
        placement.frame
          .roadYaw +
          0.4,
        0,
      ]}
    >
      <group
        scale={
          prepared.scale
        }
      >
        <group
          position={[
            prepared.x,
            prepared.y,
            prepared.z,
          ]}
        >
          <primitive
            object={
              prepared.object
            }
          />
        </group>
      </group>
    </group>
  );
}

/* =========================================================
   STREET LAMP
========================================================= */

function StreetLamp({
  t,
  side,
}: {
  t: number;
  side: -1 | 1;
}) {
  const placement =
    useMemo(
      () =>
        getPlacement(
          t,
          side,
          6.75
        ),
      [t, side]
    );

  return (
    <group
      position={[
        placement.position.x,
        0,
        placement.position.z,
      ]}
      rotation={[
        0,
        placement.frame
          .roadYaw,
        0,
      ]}
    >
      <mesh
        position={[
          0,
          3,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.035,
            0.055,
            6,
            10,
          ]}
        />

        <meshStandardMaterial
          color="#3e4345"
          metalness={0.7}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   FINAL CITY
========================================================= */

export default function CityScenery() {
  return (
    <group>
      {/* =========================================
          MOSQUE HERO AREA

          NO LARGE BUILDING IN FRONT
      ========================================= */}

      <MosqueLandmark />

      <MosqueWalkway />

      <MosqueVisitors />

      {/* =========================================
          OPPOSITE SIDE CITY

          আগের blocking brick building
          mosque-এর opposite side-এ সরানো হয়েছে.
      ========================================= */}

      <CityBuilding
        name="LM_Laundrette"
        t={0.018}
        side={1}
        offset={11}
        targetHeight={6.5}
        yaw={Math.PI}
      />

      <CityBuilding
        name="LM_PawnShop1"
        t={0.038}
        side={1}
        offset={12}
        targetHeight={7}
        yaw={Math.PI}
      />

      <CityBuilding
        name="LM_Clinic2"
        t={0.06}
        side={1}
        offset={13}
        targetHeight={8.5}
        yaw={Math.PI}
      />

      {/* THIS was blocking mosque before */}

      <CityBuilding
        name="LM_Paramount7"
        t={0.078}
        side={1}
        offset={16}
        targetHeight={11}
        yaw={Math.PI}
      />

      {/* =========================================
          MOSQUE SIDE CLEAR ZONE

          t 0.04 → 0.12 পর্যন্ত
          কোনো city building নেই.
      ========================================= */}

      {/* =========================================
          AFTER MOSQUE
      ========================================= */}

      <CityBuilding
        name="LM_Liquor"
        t={0.13}
        side={1}
        offset={12.5}
        targetHeight={8}
        yaw={Math.PI}
      />

      <CityBuilding
        name="Filler_Housing"
        t={0.14}
        side={-1}
        offset={15}
        targetHeight={9}
      />

      <CityBuilding
        name="LM_Paramount1"
        t={0.16}
        side={1}
        offset={15}
        targetHeight={12}
        yaw={Math.PI}
      />

      <CityBuilding
        name="LM_PawnShop2"
        t={0.17}
        side={-1}
        offset={13}
        targetHeight={7}
      />

      {/* =========================================
          BUILDING01 FAR BACKGROUND
      ========================================= */}

      <ScannedDistrict />

      {/* =========================================
          LATER BUILDINGS
      ========================================= */}

      <CityBuilding
        name="LM_Paramount9"
        t={0.19}
        side={1}
        offset={17}
        targetHeight={12}
        yaw={Math.PI}
      />

      <CityBuilding
        name="LM_Laundrette"
        t={0.205}
        side={-1}
        offset={14}
        targetHeight={6.5}
      />

      {/* =========================================
          LIGHTS
      ========================================= */}

      <StreetLamp
        t={0.012}
        side={-1}
      />

      <StreetLamp
        t={0.035}
        side={1}
      />

      <StreetLamp
        t={0.065}
        side={1}
      />

      {/* Mosque সামনে lamp-ও কম রাখা হয়েছে */}

      <StreetLamp
        t={0.12}
        side={1}
      />

      <StreetLamp
        t={0.155}
        side={-1}
      />

      <StreetLamp
        t={0.19}
        side={1}
      />
    </group>
  );
}

/* =========================================================
   PRELOAD
========================================================= */

useGLTF.preload(
  "/models/environment/building01.glb"
);

useGLTF.preload(
  "/models/environment/building02.glb"
);

useGLTF.preload(
  "/models/environment/mosque.glb"
);