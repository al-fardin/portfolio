"use client";

import {
  useEffect,
  useRef,
} from "react";

import {
  useFrame,
  useThree,
} from "@react-three/fiber";

import * as THREE from "three";

import CodeMotorcycle from "./CodeMotorcycle";

import MaskedRider, {
  type RiderMotion,
} from "./MaskedRider";

import {
  getJourneyFrame,
} from "@/components/cinematic/journeyPath";

import {
  useIntroFlow,
} from "@/store/useIntroFlow";

function ease(
  start: number,
  end: number,
  value: number
) {
  const t =
    THREE.MathUtils.clamp(
      (value - start) /
        (end - start),
      0,
      1
    );

  return (
    t *
    t *
    (3 - 2 * t)
  );
}

export default function BikeRevealSequence() {
  const { camera } =
    useThree();

  const setStage =
    useIntroFlow(
      (state) =>
        state.setStage
    );

  const bikeRoot =
    useRef<THREE.Group>(
      null
    );

  const riderRoot =
    useRef<THREE.Group>(
      null
    );

  const timeRef =
    useRef(0);

  const startCamera =
    useRef(
      new THREE.Vector3()
    );

  const cameraLook =
    useRef(
      new THREE.Vector3()
    );

  const speedRef =
    useRef(0);

  const engineRef =
    useRef(0);

  const riderMotion =
    useRef<RiderMotion>({
      time: 0,
      walk: 0,
      mount: 0,
      ride: 0,
    });

  const done =
    useRef(false);

  const frame =
    getJourneyFrame(
      0.145
    );

  useEffect(() => {
    startCamera.current.copy(
      camera.position
    );
  }, [camera]);

  useFrame((_, delta) => {
    if (
      !bikeRoot.current ||
      !riderRoot.current
    ) {
      return;
    }

    timeRef.current +=
      delta;

    const time =
      timeRef.current;

    riderMotion.current.time =
      time;

    bikeRoot.current.position.copy(
      frame.point
    );

    bikeRoot.current.rotation.y =
      frame.roadYaw +
      Math.PI;

    /* =========================================
       TIMELINE
    ========================================= */

    const walk =
      ease(
        1.6,
        4.7,
        time
      );

    const mount =
      ease(
        4.7,
        7.6,
        time
      );

    const rearBlend =
      ease(
        7.4,
        9.3,
        time
      );

    riderMotion.current.walk =
      time >= 1.6 &&
      time < 4.8
        ? 1
        : 0;

    riderMotion.current.mount =
      mount;

    riderMotion.current.ride =
      mount;

    /* =========================================
       WALK TO MOTORCYCLE
    ========================================= */

    const start =
      new THREE.Vector3(
        -2.25,
        0,
        1.15
      );

    const beside =
      new THREE.Vector3(
        -0.72,
        0,
        0.48
      );

    /*
      IMPORTANT:

      Final rider root = bike origin.

      Skeleton-এর ride pose
      নিজেই seat/grip/peg coordinates use করে।
    */

    const seated =
      new THREE.Vector3(
        0,
        0,
        0
      );

    const walkingPosition =
      start
        .clone()
        .lerp(
          beside,
          walk
        );

    const finalPosition =
      walkingPosition
        .clone()
        .lerp(
          seated,
          mount
        );

    /*
      Mounting upward arc.
    */

    finalPosition.y +=
      Math.sin(
        mount *
          Math.PI
      ) *
      0.32;

    riderRoot.current.position.copy(
      finalPosition
    );

    /* =========================================
       FACE MOTORCYCLE WHILE WALKING
    ========================================= */

    if (
      mount < 0.08
    ) {
      const direction =
        new THREE.Vector3(
          0,
          0,
          0
        )
          .sub(
            finalPosition
          );

      const targetYaw =
        Math.atan2(
          -direction.x,
          -direction.z
        );

      riderRoot.current.rotation.y =
        THREE.MathUtils.lerp(
          riderRoot.current.rotation.y,
          targetYaw,
          1 -
            Math.exp(
              -6 *
                delta
            )
        );
    } else {
      /*
        Once mounting,
        align exactly with motorcycle.
      */

      riderRoot.current.rotation.y =
        THREE.MathUtils.lerp(
          riderRoot.current.rotation.y,
          0,
          1 -
            Math.exp(
              -5 *
                delta
            )
        );
    }

    /* =========================================
       IGNITION
    ========================================= */

    engineRef.current =
      ease(
        7.3,
        8,
        time
      );

    speedRef.current =
      0;

    /* =========================================
       CAMERAS
    ========================================= */

    const revealCamera =
      frame.point
        .clone()
        .addScaledVector(
          frame.normal,
          7.4
        )
        .addScaledVector(
          frame.tangent,
          -4.8
        );

    revealCamera.y +=
      2.9;

    const walkCamera =
      frame.point
        .clone()
        .addScaledVector(
          frame.normal,
          3.8
        )
        .addScaledVector(
          frame.tangent,
          -1.7
        );

    walkCamera.y +=
      1.75;

    const mountCamera =
      frame.point
        .clone()
        .addScaledVector(
          frame.normal,
          3.2
        )
        .addScaledVector(
          frame.tangent,
          -0.15
        );

    mountCamera.y +=
      1.75;

    const rearCamera =
      frame.point
        .clone()
        .addScaledVector(
          frame.tangent,
          -8.2
        );

    rearCamera.y +=
      3.05;

    const revealBlend =
      ease(
        0,
        1.6,
        time
      );

    const walkCameraBlend =
      ease(
        1.6,
        4.5,
        time
      );

    const mountCameraBlend =
      ease(
        4.5,
        7.3,
        time
      );

    const desiredCamera =
      startCamera.current
        .clone()
        .lerp(
          revealCamera,
          revealBlend
        );

    desiredCamera.lerp(
      walkCamera,
      walkCameraBlend
    );

    desiredCamera.lerp(
      mountCamera,
      mountCameraBlend
    );

    desiredCamera.lerp(
      rearCamera,
      rearBlend
    );

    camera.position.lerp(
      desiredCamera,
      1 -
        Math.exp(
          -2.3 *
            delta
        )
    );

    /* =========================================
       LOOK TARGET
    ========================================= */

    const riderLook =
      finalPosition.clone();

    riderLook.y +=
      1.45;

    riderLook.applyAxisAngle(
      new THREE.Vector3(
        0,
        1,
        0
      ),
      bikeRoot.current.rotation.y
    );

    riderLook.add(
      bikeRoot.current.position
    );

    const forwardLook =
      frame.point
        .clone()
        .addScaledVector(
          frame.tangent,
          7
        );

    forwardLook.y +=
      1.35;

    const desiredLook =
      riderLook
        .clone()
        .lerp(
          forwardLook,
          rearBlend
        );

    cameraLook.current.lerp(
      desiredLook,
      1 -
        Math.exp(
          -3 *
            delta
        )
    );

    camera.lookAt(
      cameraLook.current
    );

    /* =========================================
       FINISH
    ========================================= */

    if (
      time >= 9.4 &&
      !done.current
    ) {
      done.current =
        true;

      setStage(
        "bike"
      );
    }
  });

  return (
    <group
      ref={bikeRoot}
    >
      <CodeMotorcycle
        speedRef={
          speedRef
        }
        engineRef={
          engineRef
        }
      />

      <group
        ref={riderRoot}
        position={[
          -2.25,
          0,
          1.15,
        ]}
      >
        <MaskedRider
          motionRef={
            riderMotion
          }
        />
      </group>
    </group>
  );
}