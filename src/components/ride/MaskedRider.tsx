"use client";

import {
  useRef,
  type MutableRefObject,
} from "react";

import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export type RiderMotion = {
  time: number;
  walk: number;
  mount: number;
  ride: number;
};

type Props = {
  motionRef: MutableRefObject<RiderMotion>;
};

function smooth01(value: number) {
  const t = THREE.MathUtils.clamp(
    value,
    0,
    1
  );

  return t * t * (3 - 2 * t);
}

function mixVector(
  a: THREE.Vector3,
  b: THREE.Vector3,
  amount: number
) {
  return a.clone().lerp(
    b,
    amount
  );
}

function setSegment(
  mesh: THREE.Mesh | null,
  start: THREE.Vector3,
  end: THREE.Vector3
) {
  if (!mesh) return;

  const direction = end
    .clone()
    .sub(start);

  const length =
    direction.length();

  if (length < 0.0001) {
    return;
  }

  const middle = start
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

  mesh.position.copy(
    middle
  );

  mesh.quaternion.copy(
    quaternion
  );

  mesh.scale.set(
    1,
    length,
    1
  );
}

export default function MaskedRider({
  motionRef,
}: Props) {
  const torsoRef =
    useRef<THREE.Mesh>(
      null
    );

  const hipRef =
    useRef<THREE.Mesh>(
      null
    );

  const headRef =
    useRef<THREE.Group>(
      null
    );

  const leftShoulderRef =
    useRef<THREE.Mesh>(
      null
    );

  const rightShoulderRef =
    useRef<THREE.Mesh>(
      null
    );

  const leftUpperArmRef =
    useRef<THREE.Mesh>(
      null
    );

  const rightUpperArmRef =
    useRef<THREE.Mesh>(
      null
    );

  const leftForearmRef =
    useRef<THREE.Mesh>(
      null
    );

  const rightForearmRef =
    useRef<THREE.Mesh>(
      null
    );

  const leftHandRef =
    useRef<THREE.Mesh>(
      null
    );

  const rightHandRef =
    useRef<THREE.Mesh>(
      null
    );

  const leftThighRef =
    useRef<THREE.Mesh>(
      null
    );

  const rightThighRef =
    useRef<THREE.Mesh>(
      null
    );

  const leftShinRef =
    useRef<THREE.Mesh>(
      null
    );

  const rightShinRef =
    useRef<THREE.Mesh>(
      null
    );

  const leftFootRef =
    useRef<THREE.Mesh>(
      null
    );

  const rightFootRef =
    useRef<THREE.Mesh>(
      null
    );

  useFrame(() => {
    const {
      time,
      walk,
      mount,
      ride,
    } = motionRef.current;

    const seated =
      smooth01(
        Math.max(
          mount,
          ride
        )
      );

    const walking =
      walk *
      (1 - seated);

    const step =
      Math.sin(
        time * 7.2
      );

    /* =========================================
       STANDING / WALKING POSE
    ========================================= */

    const standHipCenter =
      new THREE.Vector3(
        0,
        0.92,
        0
      );

    const standShoulderCenter =
      new THREE.Vector3(
        0,
        1.48,
        -0.01
      );

    const standHead =
      new THREE.Vector3(
        0,
        1.92,
        -0.035
      );

    const standLeftShoulder =
      new THREE.Vector3(
        -0.29,
        1.48,
        -0.01
      );

    const standRightShoulder =
      new THREE.Vector3(
        0.29,
        1.48,
        -0.01
      );

    const standLeftElbow =
      new THREE.Vector3(
        -0.31,
        1.2,
        step *
          0.16 *
          walking
      );

    const standRightElbow =
      new THREE.Vector3(
        0.31,
        1.2,
        -step *
          0.16 *
          walking
      );

    const standLeftHand =
      new THREE.Vector3(
        -0.31,
        0.92,
        step *
          0.31 *
          walking
      );

    const standRightHand =
      new THREE.Vector3(
        0.31,
        0.92,
        -step *
          0.31 *
          walking
      );

    const standLeftHip =
      new THREE.Vector3(
        -0.14,
        0.9,
        0
      );

    const standRightHip =
      new THREE.Vector3(
        0.14,
        0.9,
        0
      );

    const standLeftKnee =
      new THREE.Vector3(
        -0.15,
        0.48,
        -step *
          0.17 *
          walking
      );

    const standRightKnee =
      new THREE.Vector3(
        0.15,
        0.48,
        step *
          0.17 *
          walking
      );

    const standLeftFoot =
      new THREE.Vector3(
        -0.15,
        0.08,
        -step *
          0.28 *
          walking
      );

    const standRightFoot =
      new THREE.Vector3(
        0.15,
        0.08,
        step *
          0.28 *
          walking
      );

    /* =========================================
       FINAL MOTORCYCLE RIDING POSE

       Bike local forward = -Z

       Handlebar:
       x ≈ ±0.70
       y ≈ 1.50
       z ≈ -0.93

       Foot pegs:
       x ≈ ±0.46
       y ≈ 0.58
       z ≈ 0.15
    ========================================= */

    const rideHipCenter =
      new THREE.Vector3(
        0,
        1.13,
        0.48
      );

    const rideShoulderCenter =
      new THREE.Vector3(
        0,
        1.57,
        0.08
      );

    /*
      Head সামনে থাকবে।

      পিছনে আর যাবে না।
    */

    const rideHead =
      new THREE.Vector3(
        0,
        1.91,
        -0.04
      );

    const rideLeftShoulder =
      new THREE.Vector3(
        -0.3,
        1.57,
        0.08
      );

    const rideRightShoulder =
      new THREE.Vector3(
        0.3,
        1.57,
        0.08
      );

    /*
      Natural elbows.
    */

    const rideLeftElbow =
      new THREE.Vector3(
        -0.48,
        1.34,
        -0.48
      );

    const rideRightElbow =
      new THREE.Vector3(
        0.48,
        1.34,
        -0.48
      );

    /*
      EXACT GRIPS

      Right = accelerator.
    */

    const rideLeftHand =
      new THREE.Vector3(
        -0.69,
        1.5,
        -0.93
      );

    const rideRightHand =
      new THREE.Vector3(
        0.69,
        1.5,
        -0.93
      );

    /*
      Both legs symmetrical.
    */

    const rideLeftHip =
      new THREE.Vector3(
        -0.16,
        1.12,
        0.45
      );

    const rideRightHip =
      new THREE.Vector3(
        0.16,
        1.12,
        0.45
      );

    const rideLeftKnee =
      new THREE.Vector3(
        -0.34,
        0.85,
        -0.02
      );

    const rideRightKnee =
      new THREE.Vector3(
        0.34,
        0.85,
        -0.02
      );

    /*
      Exact foot pegs.
    */

    const rideLeftFoot =
      new THREE.Vector3(
        -0.46,
        0.58,
        0.15
      );

    const rideRightFoot =
      new THREE.Vector3(
        0.46,
        0.58,
        0.15
      );

    /* =========================================
       INTERPOLATED JOINTS
    ========================================= */

    const hipCenter =
      mixVector(
        standHipCenter,
        rideHipCenter,
        seated
      );

    const shoulderCenter =
      mixVector(
        standShoulderCenter,
        rideShoulderCenter,
        seated
      );

    const head =
      mixVector(
        standHead,
        rideHead,
        seated
      );

    const leftShoulder =
      mixVector(
        standLeftShoulder,
        rideLeftShoulder,
        seated
      );

    const rightShoulder =
      mixVector(
        standRightShoulder,
        rideRightShoulder,
        seated
      );

    const leftElbow =
      mixVector(
        standLeftElbow,
        rideLeftElbow,
        seated
      );

    const rightElbow =
      mixVector(
        standRightElbow,
        rideRightElbow,
        seated
      );

    const leftHand =
      mixVector(
        standLeftHand,
        rideLeftHand,
        seated
      );

    const rightHand =
      mixVector(
        standRightHand,
        rideRightHand,
        seated
      );

    const leftHip =
      mixVector(
        standLeftHip,
        rideLeftHip,
        seated
      );

    const rightHip =
      mixVector(
        standRightHip,
        rideRightHip,
        seated
      );

    const leftKnee =
      mixVector(
        standLeftKnee,
        rideLeftKnee,
        seated
      );

    const rightKnee =
      mixVector(
        standRightKnee,
        rideRightKnee,
        seated
      );

    const leftFoot =
      mixVector(
        standLeftFoot,
        rideLeftFoot,
        seated
      );

    const rightFoot =
      mixVector(
        standRightFoot,
        rideRightFoot,
        seated
      );

    /* =========================================
       TORSO
    ========================================= */

    setSegment(
      torsoRef.current,
      hipCenter,
      shoulderCenter
    );

    if (
      hipRef.current
    ) {
      hipRef.current.position.copy(
        hipCenter
      );
    }

    if (
      headRef.current
    ) {
      headRef.current.position.copy(
        head
      );

      /*
        Head সবসময় সামনে।

        No random backward rotation.
      */

      headRef.current.rotation.set(
        0,
        0,
        0
      );
    }

    /* =========================================
       SHOULDERS
    ========================================= */

    if (
      leftShoulderRef.current
    ) {
      leftShoulderRef.current.position.copy(
        leftShoulder
      );
    }

    if (
      rightShoulderRef.current
    ) {
      rightShoulderRef.current.position.copy(
        rightShoulder
      );
    }

    /* =========================================
       ARMS
    ========================================= */

    setSegment(
      leftUpperArmRef.current,
      leftShoulder,
      leftElbow
    );

    setSegment(
      leftForearmRef.current,
      leftElbow,
      leftHand
    );

    setSegment(
      rightUpperArmRef.current,
      rightShoulder,
      rightElbow
    );

    setSegment(
      rightForearmRef.current,
      rightElbow,
      rightHand
    );

    if (
      leftHandRef.current
    ) {
      leftHandRef.current.position.copy(
        leftHand
      );
    }

    if (
      rightHandRef.current
    ) {
      rightHandRef.current.position.copy(
        rightHand
      );
    }

    /* =========================================
       LEGS
    ========================================= */

    setSegment(
      leftThighRef.current,
      leftHip,
      leftKnee
    );

    setSegment(
      rightThighRef.current,
      rightHip,
      rightKnee
    );

    setSegment(
      leftShinRef.current,
      leftKnee,
      leftFoot
    );

    setSegment(
      rightShinRef.current,
      rightKnee,
      rightFoot
    );

    if (
      leftFootRef.current
    ) {
      leftFootRef.current.position.copy(
        leftFoot
      );

      leftFootRef.current.rotation.set(
        0,
        0,
        0
      );
    }

    if (
      rightFootRef.current
    ) {
      rightFootRef.current.position.copy(
        rightFoot
      );

      rightFootRef.current.rotation.set(
        0,
        0,
        0
      );
    }
  });

  return (
    <group>
      {/* =========================================
          TORSO
      ========================================= */}

      <mesh
        ref={torsoRef}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.28,
            0.23,
            1,
            24,
          ]}
        />

        <meshPhysicalMaterial
          color="#060709"
          roughness={0.74}
          clearcoat={0.08}
        />
      </mesh>

      {/* =========================================
          HIPS
      ========================================= */}

      <mesh
        ref={hipRef}
        scale={[
          1,
          0.7,
          0.78,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[
            0.24,
            22,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#050607"
          roughness={0.8}
        />
      </mesh>

      {/* =========================================
          HEAD
      ========================================= */}

      <group ref={headRef}>
        {/* skin */}

        <mesh
          scale={[
            0.78,
            1,
            0.82,
          ]}
          castShadow
        >
          <sphereGeometry
            args={[
              0.225,
              30,
              24,
            ]}
          />

          <meshStandardMaterial
            color="#83543e"
            roughness={0.84}
          />
        </mesh>

        {/* hair */}

        <mesh
          position={[
            0,
            0.16,
            0.01,
          ]}
          scale={[
            0.86,
            0.4,
            0.85,
          ]}
        >
          <sphereGeometry
            args={[
              0.24,
              26,
              18,
            ]}
          />

          <meshStandardMaterial
            color="#030405"
            roughness={0.98}
          />
        </mesh>

        {/* black hacker mask FRONT = -Z */}

        <RoundedBox
          args={[
            0.32,
            0.165,
            0.07,
          ]}
          radius={0.04}
          smoothness={5}
          position={[
            0,
            -0.05,
            -0.195,
          ]}
        >
          <meshPhysicalMaterial
            color="#010203"
            roughness={0.8}
          />
        </RoundedBox>
      </group>

      {/* =========================================
          SHOULDERS
      ========================================= */}

      <mesh
        ref={
          leftShoulderRef
        }
        castShadow
      >
        <sphereGeometry
          args={[
            0.11,
            18,
            14,
          ]}
        />

        <meshStandardMaterial
          color="#060709"
        />
      </mesh>

      <mesh
        ref={
          rightShoulderRef
        }
        castShadow
      >
        <sphereGeometry
          args={[
            0.11,
            18,
            14,
          ]}
        />

        <meshStandardMaterial
          color="#060709"
        />
      </mesh>

      {/* =========================================
          ARM SEGMENTS
      ========================================= */}

      <mesh
        ref={
          leftUpperArmRef
        }
        castShadow
      >
        <cylinderGeometry
          args={[
            0.078,
            0.085,
            1,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#060709"
          roughness={0.8}
        />
      </mesh>

      <mesh
        ref={
          leftForearmRef
        }
        castShadow
      >
        <cylinderGeometry
          args={[
            0.065,
            0.073,
            1,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#050607"
          roughness={0.82}
        />
      </mesh>

      <mesh
        ref={
          rightUpperArmRef
        }
        castShadow
      >
        <cylinderGeometry
          args={[
            0.078,
            0.085,
            1,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#060709"
          roughness={0.8}
        />
      </mesh>

      <mesh
        ref={
          rightForearmRef
        }
        castShadow
      >
        <cylinderGeometry
          args={[
            0.065,
            0.073,
            1,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#050607"
          roughness={0.82}
        />
      </mesh>

      {/* =========================================
          HANDS / BLACK GLOVES
      ========================================= */}

      <mesh
        ref={
          leftHandRef
        }
        scale={[
          1.25,
          0.75,
          1.1,
        ]}
      >
        <sphereGeometry
          args={[
            0.073,
            16,
            12,
          ]}
        />

        <meshStandardMaterial
          color="#010203"
        />
      </mesh>

      <mesh
        ref={
          rightHandRef
        }
        scale={[
          1.25,
          0.75,
          1.1,
        ]}
      >
        <sphereGeometry
          args={[
            0.073,
            16,
            12,
          ]}
        />

        <meshStandardMaterial
          color="#010203"
        />
      </mesh>

      {/* =========================================
          LEGS
      ========================================= */}

      <mesh
        ref={
          leftThighRef
        }
        castShadow
      >
        <cylinderGeometry
          args={[
            0.085,
            0.095,
            1,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#040506"
          roughness={0.86}
        />
      </mesh>

      <mesh
        ref={
          rightThighRef
        }
        castShadow
      >
        <cylinderGeometry
          args={[
            0.085,
            0.095,
            1,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#040506"
          roughness={0.86}
        />
      </mesh>

      <mesh
        ref={
          leftShinRef
        }
        castShadow
      >
        <cylinderGeometry
          args={[
            0.065,
            0.075,
            1,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#030405"
        />
      </mesh>

      <mesh
        ref={
          rightShinRef
        }
        castShadow
      >
        <cylinderGeometry
          args={[
            0.065,
            0.075,
            1,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#030405"
        />
      </mesh>

      {/* =========================================
          BOOTS
      ========================================= */}

      <mesh
        ref={
          leftFootRef
        }
      >
        <boxGeometry
          args={[
            0.16,
            0.12,
            0.32,
          ]}
        />

        <meshStandardMaterial
          color="#010203"
          roughness={0.7}
        />
      </mesh>

      <mesh
        ref={
          rightFootRef
        }
      >
        <boxGeometry
          args={[
            0.16,
            0.12,
            0.32,
          ]}
        />

        <meshStandardMaterial
          color="#010203"
          roughness={0.7}
        />
      </mesh>
    </group>
  );
}