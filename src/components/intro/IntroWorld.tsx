"use client";

import {
  useEffect,
  useMemo,
  useRef,
} from "react";

import {
  useFrame,
  useThree,
} from "@react-three/fiber";

import * as THREE from "three";

import CityScenery from "@/components/cinematic/CityScenery";
import RoadRibbon from "@/components/cinematic/RoadRibbon";

import {
  getJourneyFrame,
} from "@/components/cinematic/journeyPath";

import type {
  IntroStage,
} from "@/store/useIntroFlow";

type IntroWorldProps = {
  stage: IntroStage;
  walkProgress: number;
};

function easeInOut(
  value: number
) {
  const t =
    THREE.MathUtils.clamp(
      value,
      0,
      1
    );

  return (
    t *
    t *
    (3 - 2 * t)
  );
}

export default function IntroWorld({
  stage,
  walkProgress,
}: IntroWorldProps) {
  const { camera } =
    useThree();

  const lookTarget =
    useRef(
      new THREE.Vector3()
    );

  const initialized =
    useRef(false);

  /* =========================================
     IMPORTANT WORLD POINTS

     Café / first city building:
     ~0.018

     Mosque:
     ~0.083

     Final intro camera:
     mosque cross করার পরে
  ========================================= */

  const cafeFrame =
    useMemo(
      () =>
        getJourneyFrame(
          0.012
        ),
      []
    );

  const mosqueFrame =
    useMemo(
      () =>
        getJourneyFrame(
          0.083
        ),
      []
    );

  const afterMosqueFrame =
    useMemo(
      () =>
        getJourneyFrame(
          0.108
        ),
      []
    );

  /* =========================================
     ACTUAL MOSQUE POSITION

     CityScenery-এর MosqueLandmark-এর
     same placement logic.

     side = -1
     offset = 22.5
  ========================================= */

  const mosquePosition =
    useMemo(() => {
      return mosqueFrame.point
        .clone()
        .addScaledVector(
          mosqueFrame.normal,
          -22.5
        );
    }, [mosqueFrame]);

  /* =========================================
     INITIAL CAFÉ CAMERA

     Start হবে café-এর পাশ থেকে,
     road-এর দিকে diagonal cinematic view.
  ========================================= */

  useEffect(() => {
    if (
      initialized.current
    ) {
      return;
    }

    initialized.current =
      true;

    const startCamera =
      cafeFrame.point
        .clone()
        .addScaledVector(
          cafeFrame.normal,
          8.8
        )
        .addScaledVector(
          cafeFrame.tangent,
          -4
        );

    startCamera.y =
      2.5;

    const startLook =
      cafeFrame.point
        .clone()
        .addScaledVector(
          cafeFrame.tangent,
          10
        );

    startLook.y =
      1.45;

    camera.position.copy(
      startCamera
    );

    lookTarget.current.copy(
      startLook
    );

    camera.lookAt(
      lookTarget.current
    );
  }, [
    camera,
    cafeFrame,
  ]);

  useFrame(
    (_, delta) => {
      /* =====================================
         CAFÉ OPENING

         Camera café-এর side-এ থাকবে,
         একটু floating cinematic movement।
      ===================================== */

      if (
        stage === "cafe"
      ) {
        const desiredCamera =
          cafeFrame.point
            .clone()
            .addScaledVector(
              cafeFrame.normal,
              8.8
            )
            .addScaledVector(
              cafeFrame.tangent,
              -4
            );

        desiredCamera.y =
          2.5;

        const desiredLook =
          cafeFrame.point
            .clone()
            .addScaledVector(
              cafeFrame.tangent,
              11
            );

        desiredLook.y =
          1.45;

        camera.position.lerp(
          desiredCamera,
          1 -
            Math.exp(
              -1.8 *
                delta
            )
        );

        lookTarget.current.lerp(
          desiredLook,
          1 -
            Math.exp(
              -2.1 *
                delta
            )
        );
      }

      /* =====================================
         CAFÉ → MOSQUE WALK

         Actual road curve follow করবে।
      ===================================== */

      if (
        stage === "walk"
      ) {
        const raw =
          THREE.MathUtils.clamp(
            walkProgress /
              100,
            0,
            1
          );

        const progress =
          easeInOut(raw);

        /*
          0.012 → 0.096

          অর্থাৎ visitor café থেকে
          mosque cross করে একটু সামনে যাবে।
        */

        const pathT =
          THREE.MathUtils.lerp(
            0.012,
            0.096,
            progress
          );

        const frame =
          getJourneyFrame(
            pathT
          );

        /*
          Slight third-person /
          walking-camera feel.
        */

        const desiredCamera =
          frame.point
            .clone()
            .addScaledVector(
              frame.tangent,
              -3.2
            )
            .addScaledVector(
              frame.normal,
              1.25
            );

        desiredCamera.y =
          2.25;

        const desiredLook =
          frame.point
            .clone()
            .addScaledVector(
              frame.tangent,
              10.5
            );

        desiredLook.y =
          1.45;

        camera.position.lerp(
          desiredCamera,
          1 -
            Math.exp(
              -3.2 *
                delta
            )
        );

        lookTarget.current.lerp(
          desiredLook,
          1 -
            Math.exp(
              -3.6 *
                delta
            )
        );
      }

      /* =====================================
         MOSQUE INTRO

         Visitor mosque cross করেছে।

         এখন camera mosque-এর পরে থাকবে,
         তারপর smoothly turn করে mosque-এর
         দিকে পিছনে তাকাবে।

         Mosque পুরো background-এ থাকবে।
      ===================================== */

      if (
        stage ===
          "mosque" ||
        stage ===
          "transition"
      ) {
        /*
          Mosque cross করার পরে
          road-এর opposite side থেকে
          camera establish করছি।
        */

        const desiredCamera =
          afterMosqueFrame.point
            .clone()
            .addScaledVector(
              afterMosqueFrame.normal,
              7.8
            )
            .addScaledVector(
              afterMosqueFrame.tangent,
              4
            );

        desiredCamera.y =
          4.15;

        /*
          Look directly toward mosque.

          একটু upper-half target,
          যাতে dome/minaret সুন্দর frame হয়।
        */

        const desiredLook =
          mosquePosition.clone();

        desiredLook.y =
          4.4;

        camera.position.lerp(
          desiredCamera,
          1 -
            Math.exp(
              -1.25 *
                delta
            )
        );

        lookTarget.current.lerp(
          desiredLook,
          1 -
            Math.exp(
              -1.4 *
                delta
            )
        );
      }

      camera.lookAt(
        lookTarget.current
      );
    }
  );

  return (
    <>
      {/* =====================================
          DUSK SKY
      ===================================== */}

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

      {/* =====================================
          LIGHTING
      ===================================== */}

      <hemisphereLight
        args={[
          "#dec1ab",
          "#252a20",
          1.2,
        ]}
      />

      <ambientLight
        intensity={
          0.3
        }
      />

      <directionalLight
        position={[
          -35,
          40,
          20,
        ]}
        intensity={
          2.8
        }
        color="#ffc28c"
        castShadow
      />

      <directionalLight
        position={[
          30,
          18,
          -30,
        ]}
        intensity={
          0.55
        }
        color="#a7b5c5"
      />

      {/* =====================================
          EXISTING REAL WORLD

          Café
          buildings
          road
          mosque

          সব same থাকবে।
      ===================================== */}

      <RoadRibbon />

      <CityScenery />

      {/* =====================================
          SUN / MOON
      ===================================== */}

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