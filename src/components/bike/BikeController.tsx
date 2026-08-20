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

import {
  useGameStore,
} from "@/store/useGameStore";

const START_Z = 4;

const ABOUT_TARGET_Z =
  -120;

const ABOUT_STOP_Z =
  -116;

const SKILLS_TARGET_Z =
  -252;

const SKILLS_STOP_Z =
  -246;

const PROJECT_TARGET_Z =
  -420;

export default function BikeController() {
  const bikeRef =
    useRef<THREE.Group>(
      null
    );

  const visualRef =
    useRef<THREE.Group>(
      null
    );

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
        keys.current.forward =
          true;
      }

      if (
        key === "s" ||
        key === "arrowdown"
      ) {
        keys.current.backward =
          true;
      }

      if (
        key === "a" ||
        key === "arrowleft"
      ) {
        keys.current.left =
          true;
      }

      if (
        key === "d" ||
        key === "arrowright"
      ) {
        keys.current.right =
          true;
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
        keys.current.forward =
          false;
      }

      if (
        key === "s" ||
        key === "arrowdown"
      ) {
        keys.current.backward =
          false;
      }

      if (
        key === "a" ||
        key === "arrowleft"
      ) {
        keys.current.left =
          false;
      }

      if (
        key === "d" ||
        key === "arrowright"
      ) {
        keys.current.right =
          false;
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

  useFrame(
    (
      _,
      delta
    ) => {
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
        CINEMATIC MODES
      */

      if (
        game.sceneMode !==
        "ride"
      ) {
        speed.current =
          THREE.MathUtils.lerp(
            speed.current,
            0,
            0.2
          );

        keys.current.forward =
          false;

        keys.current.backward =
          false;

        keys.current.left =
          false;

        keys.current.right =
          false;

        /*
          ABOUT CAMERA
        */

        if (
          game.sceneMode ===
          "about"
        ) {
          const targetCamera =
            new THREE.Vector3(
              bike.position.x +
                8,

              bike.position.y +
                3.5,

              bike.position.z +
                7
            );

          const smooth =
            1 -
            Math.exp(
              -2.5 * delta
            );

          camera.position.lerp(
            targetCamera,
            smooth
          );

          const look =
            new THREE.Vector3(
              bike.position.x,
              bike.position.y +
                1.2,
              bike.position.z -
                7
            );

          cameraLookTarget.current.lerp(
            look,
            smooth
          );

          camera.lookAt(
            cameraLookTarget.current
          );
        }

        /*
          SKILLS GARAGE CAMERA
        */

        if (
          game.sceneMode ===
          "skills"
        ) {
          const targetCamera =
            new THREE.Vector3(
              bike.position.x -
                7,

              bike.position.y +
                4.8,

              bike.position.z +
                7
            );

          const smooth =
            1 -
            Math.exp(
              -2.1 * delta
            );

          camera.position.lerp(
            targetCamera,
            smooth
          );

          /*
            Look toward garage
            on right side
          */

          const look =
            new THREE.Vector3(
              11,
              3.2,
              -255
            );

          cameraLookTarget.current.lerp(
            look,
            smooth
          );

          camera.lookAt(
            cameraLookTarget.current
          );
        }

        /*
          Straighten motorcycle
        */

        visualRef.current.rotation.x =
          THREE.MathUtils.lerp(
            visualRef.current.rotation.x,
            0,
            0.08
          );

        visualRef.current.rotation.y =
          THREE.MathUtils.lerp(
            visualRef.current.rotation.y,
            0,
            0.08
          );

        visualRef.current.rotation.z =
          THREE.MathUtils.lerp(
            visualRef.current.rotation.z,
            0,
            0.08
          );

        return;
      }

      /*
        RIDING
      */

      const maxForwardSpeed =
        26;

      const maxReverseSpeed =
        -5;

      const acceleration =
        13;

      const braking =
        22;

      const friction =
        5;

      if (
        keys.current.forward
      ) {
        speed.current +=
          acceleration *
          delta;
      }

      else if (
        keys.current.backward
      ) {
        speed.current -=
          braking *
          delta;
      }

      else {
        if (
          speed.current >
          0
        ) {
          speed.current -=
            friction *
            delta;

          if (
            speed.current <
            0
          ) {
            speed.current =
              0;
          }
        }

        if (
          speed.current <
          0
        ) {
          speed.current +=
            friction *
            delta;

          if (
            speed.current >
            0
          ) {
            speed.current =
              0;
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
        Determine next
        portfolio destination
      */

      let targetZ =
        PROJECT_TARGET_Z;

      let stopZ:
        | number
        | null =
        null;

      if (
        !game.aboutCompleted
      ) {
        targetZ =
          ABOUT_TARGET_Z;

        stopZ =
          ABOUT_STOP_Z;
      }

      else if (
        !game.skillsCompleted
      ) {
        targetZ =
          SKILLS_TARGET_Z;

        stopZ =
          SKILLS_STOP_Z;
      }

      /*
        Auto slowdown
      */

      if (
        stopZ !== null
      ) {
        const distanceToStop =
          bike.position.z -
          stopZ;

        if (
          distanceToStop <
            24 &&
          distanceToStop >
            0 &&
          speed.current >
            4
        ) {
          speed.current -=
            17 *
            delta;
        }

        /*
          Destination reached
        */

        if (
          bike.position.z <=
          stopZ
        ) {
          bike.position.z =
            stopZ;

          speed.current = 0;

          if (
            !game.aboutCompleted
          ) {
            useGameStore
              .getState()
              .enterAbout();

            return;
          }

          if (
            !game.skillsCompleted
          ) {
            useGameStore
              .getState()
              .enterSkills();

            return;
          }
        }
      }

      /*
        Forward
      */

      bike.position.z -=
        speed.current *
        delta;

      /*
        Steering
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

      const reverse =
        speed.current >= 0
          ? 1
          : -0.65;

      bike.position.x +=
        steering *
        steeringSpeed *
        delta *
        reverse;

      bike.position.x =
        THREE.MathUtils.clamp(
          bike.position.x,
          -5.2,
          5.2
        );

      /*
        Bike visual steering
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
        CHASE CAMERA
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

      const normalLook =
        new THREE.Vector3(
          bike.position.x *
            0.75,

          bike.position.y +
            1.2,

          bike.position.z -
            11
        );

      cameraLookTarget.current.lerp(
        normalLook,
        cameraSmooth
      );

      camera.lookAt(
        cameraLookTarget.current
      );

      /*
        HUD
      */

      const displaySpeed =
        Math.round(
          Math.abs(
            speed.current
          ) * 4
        );

      const worldDistance =
        Math.max(
          0,

          bike.position.z -
            targetZ
        );

      const distanceMeters =
        Math.round(
          worldDistance *
            10
        );

      let progress =
        0;

      if (
        !game.aboutCompleted
      ) {
        const total =
          (
            START_Z -
            ABOUT_TARGET_Z
          ) * 10;

        progress =
          Math.round(
            THREE.MathUtils.clamp(
              (
                total -
                distanceMeters
              ) /
                total,

              0,
              1
            ) * 16
          );
      }

      else if (
        !game.skillsCompleted
      ) {
        const start =
          ABOUT_STOP_Z;

        const total =
          (
            start -
            SKILLS_TARGET_Z
          ) * 10;

        progress =
          16 +
          Math.round(
            THREE.MathUtils.clamp(
              (
                total -
                distanceMeters
              ) /
                total,

              0,
              1
            ) * 17
          );
      }

      else {
        progress = 33;
      }

      useGameStore
        .getState()
        .updateRide(
          displaySpeed,
          distanceMeters,
          progress,
          false
        );
    }
  );

  return (
    <group
      ref={bikeRef}
      position={[
        0,
        0,
        START_Z,
      ]}
    >
      <group
        ref={visualRef}
      >
        <Bike />
      </group>
    </group>
  );
}