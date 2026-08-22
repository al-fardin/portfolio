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

import RoadRibbon from "@/components/cinematic/RoadRibbon";
import CityScenery from "@/components/cinematic/CityScenery";

import {
  getJourneyFrame,
} from "@/components/cinematic/journeyPath";

import CodeMotorcycle from "./CodeMotorcycle";

import MaskedRider, {
  type RiderMotion,
} from "./MaskedRider";

export default function BikeJourneyWorld() {
  const { camera } =
    useThree();

  const bikeRoot =
    useRef<THREE.Group>(
      null
    );

  const actualProgress =
    useRef(0.145);

  const targetProgress =
    useRef(0.145);

  const cameraLook =
    useRef(
      new THREE.Vector3()
    );

  const speedRef =
    useRef(0);

  const engineRef =
    useRef(1);

  const riderMotion =
    useRef<RiderMotion>({
      time: 0,
      walk: 0,
      mount: 1,
      ride: 1,
    });

  useEffect(() => {
    const handleWheel = (
      event: WheelEvent
    ) => {
      if (
        event.deltaY <= 0
      ) {
        return;
      }

      const amount =
        THREE.MathUtils.clamp(
          Math.abs(
            event.deltaY
          ) / 18000,
          0.0025,
          0.006
        );

      targetProgress.current =
        THREE.MathUtils.clamp(
          targetProgress.current +
            amount,
          0.145,
          0.24
        );
    };

    const handleKey = (
      event: KeyboardEvent
    ) => {
      if (
        event.key !== "w" &&
        event.key !== "W" &&
        event.key !==
          "ArrowUp"
      ) {
        return;
      }

      targetProgress.current =
        THREE.MathUtils.clamp(
          targetProgress.current +
            0.004,
          0.145,
          0.24
        );
    };

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      );

      window.removeEventListener(
        "keydown",
        handleKey
      );
    };
  }, []);

  useFrame(
    (
      state,
      delta
    ) => {
      if (
        !bikeRoot.current
      ) {
        return;
      }

      riderMotion.current.time +=
        delta;

      actualProgress.current =
        THREE.MathUtils.lerp(
          actualProgress.current,
          targetProgress.current,
          1 -
            Math.exp(
              -1.35 *
                delta
            )
        );

      const difference =
        Math.abs(
          targetProgress.current -
            actualProgress.current
        );

      speedRef.current =
        THREE.MathUtils.clamp(
          difference *
            130,
          0,
          1
        );

      const frame =
        getJourneyFrame(
          actualProgress.current
        );

      bikeRoot.current.position.copy(
        frame.point
      );

      bikeRoot.current.rotation.y =
        frame.roadYaw +
        Math.PI;

      bikeRoot.current.position.y =
        Math.sin(
          state.clock.elapsedTime *
            10
        ) *
        0.003 *
        speedRef.current;

      /* =====================================
         CURVE LEAN
      ===================================== */

      const ahead =
        getJourneyFrame(
          Math.min(
            1,
            actualProgress.current +
              0.004
          )
        );

      const curve =
        THREE.MathUtils.clamp(
          ahead.roadYaw -
            frame.roadYaw,
          -0.2,
          0.2
        );

      bikeRoot.current.rotation.z =
        THREE.MathUtils.lerp(
          bikeRoot.current.rotation.z,
          -curve *
            0.18,
          0.05
        );

      /* =====================================
         REAR CAMERA
      ===================================== */

      const desiredCamera =
        frame.point
          .clone()
          .addScaledVector(
            frame.tangent,
            -8.4
          );

      desiredCamera.y +=
        3.1;

      camera.position.lerp(
        desiredCamera,
        1 -
          Math.exp(
            -2.6 *
              delta
          )
      );

      const desiredLook =
        frame.point
          .clone()
          .addScaledVector(
            frame.tangent,
            12
          );

      desiredLook.y =
        1.4;

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
    }
  );

  return (
    <>
      <color
        attach="background"
        args={[
          "#642d22",
        ]}
      />

      <fog
        attach="fog"
        args={[
          "#642d22",
          140,
          390,
        ]}
      />

      <hemisphereLight
        args={[
          "#dec1ab",
          "#252a20",
          1.2,
        ]}
      />

      <ambientLight
        intensity={0.3}
      />

      <directionalLight
        position={[
          -35,
          40,
          20,
        ]}
        intensity={2.8}
        color="#ffc28c"
        castShadow
      />

      <directionalLight
        position={[
          30,
          18,
          -30,
        ]}
        intensity={0.55}
        color="#a7b5c5"
      />

      <RoadRibbon />

      <CityScenery />

      <group ref={bikeRoot}>
        <CodeMotorcycle
          speedRef={
            speedRef
          }
          engineRef={
            engineRef
          }
        />

        {/*
          ZERO EXTRA OFFSET.

          Rider এবং motorcycle
          exact same coordinate system.
        */}

        <MaskedRider
          motionRef={
            riderMotion
          }
        />
      </group>

      <mesh
        position={[
          90,
          60,
          -200,
        ]}
      >
        <sphereGeometry
          args={[
            5.2,
            32,
            32,
          ]}
        />

        <meshBasicMaterial
          color="#e4c69e"
          fog={false}
        />
      </mesh>
    </>
  );
}