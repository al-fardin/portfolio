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

import Bike from "./Bike";

import { useGameStore } from "@/store/useGameStore";

const DESTINATION_Z = -120;

const STOP_Z = -116;

const START_Z = 4;

export default function BikeController() {
  const bikeRef =
    useRef<THREE.Group>(null);

  const visualRef =
    useRef<THREE.Group>(null);

  const speed =
    useRef(0);

  const cameraLookTarget =
    useRef(
      new THREE.Vector3(
        0,
        1,
        -10
      )
    );

  const keys =
    useRef({
      forward: false,
      backward: false,
      left: false,
      right: false,
    });

  const lastHud =
    useRef({
      speed: -1,
      distance: -1,
      progress: -1,
      reached: false,
    });

  const { camera } =
    useThree();

  useEffect(() => {
    const keyDown = (
      event: KeyboardEvent
    ) => {
      const key =
        event.key.toLowerCase();

      if (
        key === "w" ||
        key === "arrowup"
      ) {
        keys.current.forward = true;
      }

      if (
        key === "s" ||
        key === "arrowdown"
      ) {
        keys.current.backward = true;
      }

      if (
        key === "a" ||
        key === "arrowleft"
      ) {
        keys.current.left = true;
      }

      if (
        key === "d" ||
        key === "arrowright"
      ) {
        keys.current.right = true;
      }
    };

    const keyUp = (
      event: KeyboardEvent
    ) => {
      const key =
        event.key.toLowerCase();

      if (
        key === "w" ||
        key === "arrowup"
      ) {
        keys.current.forward = false;
      }

      if (
        key === "s" ||
        key === "arrowdown"
      ) {
        keys.current.backward = false;
      }

      if (
        key === "a" ||
        key === "arrowleft"
      ) {
        keys.current.left = false;
      }

      if (
        key === "d" ||
        key === "arrowright"
      ) {
        keys.current.right = false;
      }
    };

    window.addEventListener(
      "keydown",
      keyDown
    );

    window.addEventListener(
      "keyup",
      keyUp
    );

    return () => {
      window.removeEventListener(
        "keydown",
        keyDown
      );

      window.removeEventListener(
        "keyup",
        keyUp
      );
    };
  }, []);

  useFrame((_, delta) => {
    if (
      !bikeRef.current ||
      !visualRef.current
    ) {
      return;
    }

    const game =
      useGameStore.getState();

    const bike =
      bikeRef.current;

    /*
      ============================
      ABOUT CINEMATIC CAMERA
      ============================
    */

    if (
      game.sceneMode === "about"
    ) {
      speed.current =
        THREE.MathUtils.lerp(
          speed.current,
          0,
          0.15
        );

      /*
        Camera goes to
        cinematic side position
      */

      const cinematicPosition =
        new THREE.Vector3(
          bike.position.x + 8,
          bike.position.y + 3.4,
          bike.position.z + 7
        );

      const cinematicSmooth =
        1 -
        Math.exp(
          -2.4 * delta
        );

      camera.position.lerp(
        cinematicPosition,
        cinematicSmooth
      );

      /*
        Camera looks toward
        bike + road horizon
      */

      const cinematicLook =
        new THREE.Vector3(
          bike.position.x,
          bike.position.y + 1.2,
          bike.position.z - 6
        );

      cameraLookTarget.current.lerp(
        cinematicLook,
        cinematicSmooth
      );

      camera.lookAt(
        cameraLookTarget.current
      );

      /*
        Bike straightens
      */

      visualRef.current.rotation.z =
        THREE.MathUtils.lerp(
          visualRef.current.rotation.z,
          0,
          0.08
        );

      visualRef.current.rotation.y =
        THREE.MathUtils.lerp(
          visualRef.current.rotation.y,
          0,
          0.08
        );

      visualRef.current.rotation.x =
        THREE.MathUtils.lerp(
          visualRef.current.rotation.x,
          0,
          0.08
        );

      return;
    }

    /*
      ============================
      NORMAL RIDING
      ============================
    */

    const maxForwardSpeed = 26;

    const maxReverseSpeed = -5;

    const acceleration = 13;

    const brakePower = 22;

    const friction = 5;

    /*
      Acceleration
    */

    if (
      keys.current.forward
    ) {
      speed.current +=
        acceleration * delta;
    }

    else if (
      keys.current.backward
    ) {
      speed.current -=
        brakePower * delta;
    }

    else {
      if (
        speed.current > 0
      ) {
        speed.current -=
          friction * delta;

        if (
          speed.current < 0
        ) {
          speed.current = 0;
        }
      }

      if (
        speed.current < 0
      ) {
        speed.current +=
          friction * delta;

        if (
          speed.current > 0
        ) {
          speed.current = 0;
        }
      }
    }

    speed.current =
      THREE.MathUtils.clamp(
        speed.current,
        maxReverseSpeed,
        maxForwardSpeed
      );

    /*
      ============================
      ABOUT DESTINATION
      ============================
    */

    if (
      !game.aboutCompleted
    ) {
      const distanceToStop =
        bike.position.z -
        STOP_Z;

      /*
        Auto slowdown
        near viewpoint
      */

      if (
        distanceToStop <
          22 &&
        distanceToStop >
          0 &&
        speed.current > 4
      ) {
        speed.current -=
          18 * delta;
      }

      /*
        Stop motorcycle
      */

      if (
        bike.position.z <=
        STOP_Z
      ) {
        bike.position.z =
          STOP_Z;

        speed.current = 0;

        useGameStore
          .getState()
          .enterAbout();

        return;
      }
    }

    /*
      Forward movement
    */

    bike.position.z -=
      speed.current * delta;

    /*
      ============================
      STEERING
      ============================
    */

    let steering = 0;

    if (
      keys.current.left
    ) {
      steering = -1;
    }

    if (
      keys.current.right
    ) {
      steering = 1;
    }

    const speedRatio =
      THREE.MathUtils.clamp(
        Math.abs(
          speed.current
        ) /
          maxForwardSpeed,
        0,
        1
      );

    const steeringSpeed =
      2.5 +
      speedRatio * 4;

    const reverseSteering =
      speed.current >= 0
        ? 1
        : -0.65;

    bike.position.x +=
      steering *
      steeringSpeed *
      delta *
      reverseSteering;

    /*
      Road boundary
    */

    bike.position.x =
      THREE.MathUtils.clamp(
        bike.position.x,
        -5.2,
        5.2
      );

    /*
      Small visual yaw
    */

    const targetYaw =
      -steering *
      0.15 *
      speedRatio;

    visualRef.current.rotation.y =
      THREE.MathUtils.lerp(
        visualRef.current.rotation.y,
        targetYaw,
        0.1
      );

    /*
      Bike lean
    */

    const targetLean =
      -steering *
      0.3 *
      speedRatio;

    visualRef.current.rotation.z =
      THREE.MathUtils.lerp(
        visualRef.current.rotation.z,
        targetLean,
        0.1
      );

    /*
      Acceleration pitch
    */

    let targetPitch = 0;

    if (
      keys.current.forward &&
      speed.current > 2
    ) {
      targetPitch =
        -0.025;
    }

    if (
      keys.current.backward &&
      speed.current > 3
    ) {
      targetPitch =
        0.035;
    }

    visualRef.current.rotation.x =
      THREE.MathUtils.lerp(
        visualRef.current.rotation.x,
        targetPitch,
        0.08
      );

    /*
      ============================
      CHASE CAMERA
      ============================
    */

    const desiredCamera =
      new THREE.Vector3(
        bike.position.x *
          0.88,

        bike.position.y +
          4.6,

        bike.position.z +
          9.5
      );

    const cameraSmooth =
      1 -
      Math.exp(
        -5 * delta
      );

    camera.position.lerp(
      desiredCamera,
      cameraSmooth
    );

    const normalLookTarget =
      new THREE.Vector3(
        bike.position.x *
          0.75,

        bike.position.y +
          1.2,

        bike.position.z -
          11
      );

    cameraLookTarget.current.lerp(
      normalLookTarget,
      cameraSmooth
    );

    camera.lookAt(
      cameraLookTarget.current
    );

    /*
      ============================
      HUD DATA
      ============================
    */

    const displaySpeed =
      Math.round(
        Math.abs(
          speed.current
        ) * 4
      );

    let distanceMeters = 0;

    if (
      !game.aboutCompleted
    ) {
      const worldDistance =
        Math.max(
          0,
          bike.position.z -
            DESTINATION_Z
        );

      distanceMeters =
        Math.round(
          worldDistance * 10
        );
    }

    const totalDistance =
      (
        START_Z -
        DESTINATION_Z
      ) * 10;

    const travelled =
      totalDistance -
      distanceMeters;

    const firstProgress =
      THREE.MathUtils.clamp(
        travelled /
          totalDistance,
        0,
        1
      );

    let journeyProgress =
      Math.round(
        firstProgress * 16
      );

    if (
      game.aboutCompleted
    ) {
      journeyProgress = 16;
    }

    const destinationReached =
      !game.aboutCompleted &&
      bike.position.z <=
        STOP_Z;

    /*
      Prevent unnecessary
      React state updates
    */

    if (
      lastHud.current.speed !==
        displaySpeed ||
      lastHud.current.distance !==
        distanceMeters ||
      lastHud.current.progress !==
        journeyProgress ||
      lastHud.current.reached !==
        destinationReached
    ) {
      useGameStore
        .getState()
        .updateRide(
          displaySpeed,
          distanceMeters,
          journeyProgress,
          destinationReached
        );

      lastHud.current = {
        speed:
          displaySpeed,

        distance:
          distanceMeters,

        progress:
          journeyProgress,

        reached:
          destinationReached,
      };
    }
  });

  return (
    <group
      ref={bikeRef}
      position={[
        0,
        0,
        START_Z,
      ]}
    >
      <group ref={visualRef}>
        <Bike />
      </group>
    </group>
  );
}