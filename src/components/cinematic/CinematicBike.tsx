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
  useJourneyStore,
} from "@/store/useJourneyStore";

import RiderSprite from "./RiderSprite";

const BIKE_MODEL_YAW =
  THREE.MathUtils.degToRad(
    -144.55
  );

type WheelInfo = {
  object: THREE.Object3D;
  axis: "x" | "y" | "z";
};

/* =========================================================
   DETECT REAL WHEEL NODES
========================================================= */

function findRealWheels(
  root: THREE.Object3D
): WheelInfo[] {
  const wheels:
    WheelInfo[] = [];

  root.traverse((child) => {
    const name =
      child.name.toLowerCase();

    const looksLikeWheel =
      name.includes("wheel") ||
      name.includes("tyre") ||
      name.includes("tire") ||
      name.includes("rim");

    if (!looksLikeWheel) {
      return;
    }

    if (
      child instanceof
      THREE.Mesh
    ) {
      const geometry =
        child.geometry;

      geometry.computeBoundingBox();

      const box =
        geometry.boundingBox;

      let axis:
        "x" |
        "y" |
        "z" = "x";

      if (box) {
        const size =
          new THREE.Vector3();

        box.getSize(size);

        /*
          Wheel-এর thinnest dimension
          সাধারণত axle direction.
        */

        if (
          size.y <= size.x &&
          size.y <= size.z
        ) {
          axis = "y";
        } else if (
          size.z <= size.x &&
          size.z <= size.y
        ) {
          axis = "z";
        } else {
          axis = "x";
        }
      }

      wheels.push({
        object: child,
        axis,
      });
    }
  });

  return wheels;
}

/* =========================================================
   BIKE MOTION
========================================================= */

function MovingMotorcycle({
  bike,
  wheels,
}: {
  bike: THREE.Object3D;
  wheels: WheelInfo[];
}) {
  const rootRef =
    useRef<THREE.Group>(
      null
    );

  const wheelAngle =
    useRef(0);

  useFrame(
    (
      state,
      delta
    ) => {
      const journey =
        useJourneyStore.getState();

      const difference =
        Math.abs(
          journey.targetProgress -
            journey.progress
        );

      const moving =
        THREE.MathUtils.clamp(
          difference * 180,
          0,
          1
        );

      /*
        REAL wheel rotation.
      */

      wheelAngle.current +=
        delta *
        (
          2 +
          moving * 32
        );

      wheels.forEach(
        ({
          object,
          axis,
        }) => {
          if (
            axis === "x"
          ) {
            object.rotation.x =
              wheelAngle.current;
          }

          if (
            axis === "y"
          ) {
            object.rotation.y =
              wheelAngle.current;
          }

          if (
            axis === "z"
          ) {
            object.rotation.z =
              wheelAngle.current;
          }
        }
      );

      /*
        Tiny real motorcycle vibration.
        No giant fake effect.
      */

      if (
        rootRef.current
      ) {
        const vibration =
          Math.sin(
            state.clock.elapsedTime *
              12
          ) *
          0.003 *
          moving;

        rootRef.current.position.y =
          vibration;

        rootRef.current.rotation.x =
          Math.sin(
            state.clock.elapsedTime *
              6
          ) *
          0.0015 *
          moving;
      }
    }
  );

  return (
    <group
      ref={rootRef}
    >
      <primitive
        object={bike}
      />

      <RiderSprite />
    </group>
  );
}

/* =========================================================
   MOTORCYCLE
========================================================= */

export default function CinematicBike() {
  const gltf =
    useGLTF(
      "/models/vehicle/bike-rider.glb"
    );

  const prepared =
    useMemo(() => {
      const object =
        clone(
          gltf.scene
        );

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

      const originalLength =
        Math.max(
          size.x,
          size.z,
          0.0001
        );

      const targetLength =
        3.15;

      const scale =
        targetLength /
        originalLength;

      /*
        First normalize bike
        inside a dedicated group.
      */

      const bikeGroup =
        new THREE.Group();

      object.position.set(
        -center.x,
        -box.min.y,
        -center.z
      );

      bikeGroup.add(
        object
      );

      bikeGroup.scale.setScalar(
        scale
      );

      /*
        Find REAL wheel nodes.
      */

      const wheels =
        findRealWheels(
          object
        );

      console.log(
        "Detected motorcycle wheels:",
        wheels.map(
          (wheel) =>
            wheel.object.name
        )
      );

      return {
        bikeGroup,
        wheels,
      };
    }, [
      gltf.scene,
    ]);

  return (
    <group
      rotation={[
        0,
        BIKE_MODEL_YAW,
        0,
      ]}
    >
      <MovingMotorcycle
        bike={
          prepared.bikeGroup
        }
        wheels={
          prepared.wheels
        }
      />
    </group>
  );
}

useGLTF.preload(
  "/models/vehicle/bike-rider.glb"
);