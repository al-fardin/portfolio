"use client";

import { useRef } from "react";

import {
  useFrame,
  useThree,
} from "@react-three/fiber";

import * as THREE from "three";

import {
  useJourneyStore,
} from "@/store/useJourneyStore";

import CinematicBike from "./CinematicBike";

import {
  getJourneyFrame,
} from "./journeyPath";

export default function JourneyRig() {
  const bikeRootRef =
    useRef<THREE.Group>(null);

  const bikeVisualRef =
    useRef<THREE.Group>(null);

  const actualProgress =
    useRef(0);

  const lastStoredProgress =
    useRef(0);

  const cameraLookRef =
    useRef(
      new THREE.Vector3()
    );

  const { camera } =
    useThree();

  useFrame(
    (
      state,
      delta
    ) => {
      if (
        !bikeRootRef.current ||
        !bikeVisualRef.current
      ) {
        return;
      }

      const journey =
        useJourneyStore.getState();

      const targetProgress =
        journey.started
          ? journey.targetProgress
          : 0;

      /* ===========================
         SLOW CINEMATIC MOVEMENT
      =========================== */

      const movementSmooth =
        1 -
        Math.exp(
          -1.0 * delta
        );

      actualProgress.current =
        THREE.MathUtils.lerp(
          actualProgress.current,
          targetProgress,
          movementSmooth
        );

      const progress =
        actualProgress.current;

      if (
        Math.abs(
          progress -
            lastStoredProgress.current
        ) > 0.00015
      ) {
        lastStoredProgress.current =
          progress;

        journey.setProgress(
          progress
        );
      }

      /* ===========================
         ROAD
      =========================== */

      const frame =
        getJourneyFrame(
          progress
        );

      bikeRootRef.current.position.copy(
        frame.point
      );

      bikeRootRef.current.rotation.y =
        frame.roadYaw +
        Math.PI;

      /* ===========================
         SUBTLE LEAN
      =========================== */

      const ahead =
        getJourneyFrame(
          Math.min(
            1,
            progress +
              0.004
          )
        );

      const curve =
        THREE.MathUtils.clamp(
          ahead.roadYaw -
            frame.roadYaw,
          -0.18,
          0.18
        );

      bikeVisualRef.current.rotation.z =
        THREE.MathUtils.lerp(
          bikeVisualRef.current.rotation.z,
          -curve * 0.1,
          0.04
        );

      /* ===========================
         ROAD VIBRATION
      =========================== */

      const movementAmount =
        Math.abs(
          targetProgress -
            progress
        );

      const bounce =
        Math.sin(
          state.clock.elapsedTime *
            7
        ) *
        Math.min(
          0.002,
          movementAmount *
            0.015
        );

      bikeVisualRef.current.position.y =
        THREE.MathUtils.lerp(
          bikeVisualRef.current.position.y,
          bounce,
          0.06
        );

      /* ===========================
         REAR CAMERA
      =========================== */

      const desiredCamera =
        frame.point
          .clone()
          .addScaledVector(
            frame.tangent,
            -8.4
          );

      desiredCamera.y += 3;

      /* ===========================
         LOOK FORWARD
      =========================== */

      const desiredLook =
        frame.point
          .clone()
          .addScaledVector(
            frame.tangent,
            14
          );

      desiredLook.y += 1.35;

      /* ===========================
         CAMERA SMOOTHING
      =========================== */

      camera.position.lerp(
        desiredCamera,
        1 -
          Math.exp(
            -2.5 *
              delta
          )
      );

      cameraLookRef.current.lerp(
        desiredLook,
        1 -
          Math.exp(
            -3 *
              delta
          )
      );

      camera.lookAt(
        cameraLookRef.current
      );

      /* ===========================
         FOV
      =========================== */

      const perspective =
        camera as THREE.PerspectiveCamera;

      if (
        perspective.isPerspectiveCamera
      ) {
        perspective.fov =
          THREE.MathUtils.lerp(
            perspective.fov,
            46,
            0.025
          );

        perspective.updateProjectionMatrix();
      }
    }
  );

  return (
    <group
      ref={bikeRootRef}
    >
      <group
        ref={bikeVisualRef}
      >
        <CinematicBike />
      </group>
    </group>
  );
}