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
  experienceMilestones,
} from "@/data/experience";

import {
  achievementMilestones,
} from "@/data/achievements";

import {
  useGameStore,
} from "@/store/useGameStore";

const START_Z = 4;

const ABOUT_TARGET_Z = -120;
const ABOUT_STOP_Z = -116;

const SKILLS_TARGET_Z = -252;
const SKILLS_STOP_Z = -246;

const PROJECT_TARGET_Z = -420;
const PROJECT_STOP_Z = -412;

const EXPERIENCE_TARGET_Z = -575;
const EXPERIENCE_STOP_Z = -568;

const ACHIEVEMENT_TARGET_Z = -750;
const ACHIEVEMENT_STOP_Z = -742;

const CONTACT_TARGET_Z = -900;
const CONTACT_STOP_Z = -890;

type Destination =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "achievements"
  | "contact";

export default function BikeController() {
  const bikeRef =
    useRef<THREE.Group>(null);

  const visualRef =
    useRef<THREE.Group>(null);

  const speed =
    useRef(0);

  const scrollPower =
    useRef(0);

  const touchY =
    useRef<number | null>(
      null
    );

  const cameraLookTarget =
    useRef(
      new THREE.Vector3(
        0,
        1,
        -10
      )
    );

  const discoveredExperience =
    useRef<Set<string>>(
      new Set()
    );

  const discoveredAchievements =
    useRef<Set<string>>(
      new Set()
    );

  const { camera } =
    useThree();

  /*
    ==========================
    SCROLL / TOUCH INPUT
    ==========================
  */

  useEffect(() => {
    const addTravelPower = (
      amount: number
    ) => {
      const game =
        useGameStore.getState();

      if (
        game.sceneMode !==
        "ride"
      ) {
        return;
      }

      scrollPower.current =
        THREE.MathUtils.clamp(
          scrollPower.current +
            amount,
          0,
          1
        );
    };

    const reduceTravelPower = (
      amount: number
    ) => {
      scrollPower.current =
        THREE.MathUtils.clamp(
          scrollPower.current -
            amount,
          0,
          1
        );
    };

    const handleWheel = (
      event: WheelEvent
    ) => {
      if (
        event.deltaY > 0
      ) {
        const strength =
          THREE.MathUtils.clamp(
            Math.abs(
              event.deltaY
            ) / 220,
            0.18,
            0.5
          );

        addTravelPower(
          strength
        );
      }

      if (
        event.deltaY < 0
      ) {
        reduceTravelPower(
          0.2
        );
      }
    };

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key ===
          "ArrowDown" ||
        event.key ===
          "PageDown" ||
        event.key === " "
      ) {
        addTravelPower(
          0.35
        );
      }

      if (
        event.key ===
          "ArrowUp" ||
        event.key ===
          "PageUp"
      ) {
        reduceTravelPower(
          0.25
        );
      }
    };

    const handleTouchStart = (
      event: TouchEvent
    ) => {
      touchY.current =
        event.touches[0]
          ?.clientY ?? null;
    };

    const handleTouchMove = (
      event: TouchEvent
    ) => {
      if (
        touchY.current ===
        null
      ) {
        return;
      }

      const currentY =
        event.touches[0]
          ?.clientY;

      if (
        currentY ===
        undefined
      ) {
        return;
      }

      const movement =
        touchY.current -
        currentY;

      if (
        movement > 4
      ) {
        addTravelPower(
          THREE.MathUtils.clamp(
            movement / 120,
            0.1,
            0.32
          )
        );
      }

      if (
        movement < -4
      ) {
        reduceTravelPower(
          0.08
        );
      }

      touchY.current =
        currentY;
    };

    const handleTouchEnd =
      () => {
        touchY.current =
          null;
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
      handleKeyDown
    );

    window.addEventListener(
      "touchstart",
      handleTouchStart,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "touchmove",
      handleTouchMove,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "touchend",
      handleTouchEnd
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "touchstart",
        handleTouchStart
      );

      window.removeEventListener(
        "touchmove",
        handleTouchMove
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd
      );
    };
  }, []);

  useFrame(
    (
      state,
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

      const visual =
        visualRef.current;

      const perspectiveCamera =
        camera as THREE.PerspectiveCamera;

      /*
        ==========================
        CINEMATIC MODES
        ==========================
      */

      if (
        game.sceneMode !==
        "ride"
      ) {
        scrollPower.current =
          0;

        speed.current =
          THREE.MathUtils.lerp(
            speed.current,
            0,
            0.18
          );

        visual.position.y =
          THREE.MathUtils.lerp(
            visual.position.y,
            0,
            0.1
          );

        if (
          perspectiveCamera.isPerspectiveCamera
        ) {
          perspectiveCamera.fov =
            THREE.MathUtils.lerp(
              perspectiveCamera.fov,
              54,
              0.07
            );

          perspectiveCamera.updateProjectionMatrix();
        }

        let cameraPosition =
          new THREE.Vector3(
            bike.position.x + 7,
            4,
            bike.position.z + 8
          );

        let cameraLook =
          new THREE.Vector3(
            bike.position.x,
            1.3,
            bike.position.z - 5
          );

        /*
          STARTUP
        */

        if (
          game.sceneMode ===
          "startup"
        ) {
          const time =
            state.clock.elapsedTime;

          const orbit =
            time * 0.12;

          cameraPosition =
            new THREE.Vector3(
              bike.position.x +
                Math.sin(
                  orbit
                ) *
                  6.5,

              3.3 +
                Math.sin(
                  time *
                    0.25
                ) *
                  0.22,

              bike.position.z +
                7.3 +
                Math.cos(
                  orbit
                ) *
                  2
            );

          cameraLook =
            new THREE.Vector3(
              bike.position.x,
              1.2,
              bike.position.z
            );
        }

        /*
          ABOUT
        */

        if (
          game.sceneMode ===
          "about"
        ) {
          cameraPosition =
            new THREE.Vector3(
              bike.position.x +
                7.5,
              4.4,
              bike.position.z +
                8
            );

          cameraLook =
            new THREE.Vector3(
              bike.position.x,
              1.7,
              bike.position.z -
                8
            );
        }

        /*
          SKILLS
        */

        if (
          game.sceneMode ===
          "skills"
        ) {
          cameraPosition =
            new THREE.Vector3(
              bike.position.x -
                8,
              5,
              bike.position.z +
                8
            );

          cameraLook =
            new THREE.Vector3(
              11,
              3.2,
              -255
            );
        }

        /*
          PROJECTS
        */

        if (
          game.sceneMode ===
          "projects"
        ) {
          cameraPosition =
            new THREE.Vector3(
              bike.position.x -
                9,
              7.5,
              bike.position.z +
                13
            );

          cameraLook =
            new THREE.Vector3(
              24,
              8,
              -423
            );
        }

        /*
          EXPERIENCE
        */

        if (
          game.sceneMode ===
          "experience"
        ) {
          cameraPosition =
            new THREE.Vector3(
              bike.position.x +
                9,
              6,
              bike.position.z +
                12
            );

          cameraLook =
            new THREE.Vector3(
              -3,
              2.5,
              -582
            );
        }

        /*
          ACHIEVEMENTS
        */

        if (
          game.sceneMode ===
          "achievements"
        ) {
          cameraPosition =
            new THREE.Vector3(
              bike.position.x -
                10,
              7,
              bike.position.z +
                14
            );

          cameraLook =
            new THREE.Vector3(
              0,
              5,
              -750
            );
        }

        /*
          CONTACT
        */

        if (
          game.sceneMode ===
          "contact"
        ) {
          cameraPosition =
            new THREE.Vector3(
              bike.position.x +
                12,
              9,
              bike.position.z +
                18
            );

          cameraLook =
            new THREE.Vector3(
              0,
              22,
              -925
            );
        }

        const cinematicSpeed =
          game.sceneMode ===
          "startup"
            ? 1.15
            : 2;

        const smooth =
          1 -
          Math.exp(
            -cinematicSpeed *
              delta
          );

        camera.position.lerp(
          cameraPosition,
          smooth
        );

        cameraLookTarget.current.lerp(
          cameraLook,
          smooth
        );

        camera.lookAt(
          cameraLookTarget.current
        );

        visual.rotation.x =
          THREE.MathUtils.lerp(
            visual.rotation.x,
            0,
            0.08
          );

        visual.rotation.y =
          THREE.MathUtils.lerp(
            visual.rotation.y,
            0,
            0.08
          );

        visual.rotation.z =
          THREE.MathUtils.lerp(
            visual.rotation.z,
            0,
            0.08
          );

        return;
      }

      /*
        ==========================
        CURRENT DESTINATION
        ==========================
      */

      let targetZ =
        CONTACT_TARGET_Z;

      let stopZ =
        CONTACT_STOP_Z;

      let destination:
        Destination =
        "contact";

      if (
        !game.aboutCompleted
      ) {
        targetZ =
          ABOUT_TARGET_Z;

        stopZ =
          ABOUT_STOP_Z;

        destination =
          "about";
      } else if (
        !game.skillsCompleted
      ) {
        targetZ =
          SKILLS_TARGET_Z;

        stopZ =
          SKILLS_STOP_Z;

        destination =
          "skills";
      } else if (
        !game.projectsCompleted
      ) {
        targetZ =
          PROJECT_TARGET_Z;

        stopZ =
          PROJECT_STOP_Z;

        destination =
          "projects";
      } else if (
        !game.experienceCompleted
      ) {
        targetZ =
          EXPERIENCE_TARGET_Z;

        stopZ =
          EXPERIENCE_STOP_Z;

        destination =
          "experience";
      } else if (
        !game.achievementsCompleted
      ) {
        targetZ =
          ACHIEVEMENT_TARGET_Z;

        stopZ =
          ACHIEVEMENT_STOP_Z;

        destination =
          "achievements";
      }

      /*
        ==========================
        DISTANCE TO STOP
        ==========================
      */

      const distanceToStop =
        bike.position.z -
        stopZ;

      /*
        IMPORTANT FIX:

        আগের version-এ speed
        asymptotically 0 হয়ে যেত।

        এখন destination-এর খুব
        কাছে এলে আমরা সরাসরি
        destination trigger করব।
      */

      if (
        distanceToStop <=
        0.75
      ) {
        bike.position.z =
          stopZ;

        speed.current = 0;

        scrollPower.current =
          0;

        if (
          destination ===
          "about"
        ) {
          useGameStore
            .getState()
            .enterAbout();

          return;
        }

        if (
          destination ===
          "skills"
        ) {
          useGameStore
            .getState()
            .enterSkills();

          return;
        }

        if (
          destination ===
          "projects"
        ) {
          useGameStore
            .getState()
            .enterProjects();

          return;
        }

        if (
          destination ===
          "experience"
        ) {
          useGameStore
            .getState()
            .enterExperience();

          return;
        }

        if (
          destination ===
          "achievements"
        ) {
          useGameStore
            .getState()
            .enterAchievements();

          return;
        }

        if (
          destination ===
          "contact"
        ) {
          useGameStore
            .getState()
            .enterContact();

          return;
        }
      }

      /*
        ==========================
        SCROLL DECAY
        ==========================
      */

      scrollPower.current =
        Math.max(
          0,
          scrollPower.current -
            delta *
              0.25
        );

      let targetSpeed =
        scrollPower.current >
        0.015
          ? 4 +
            scrollPower.current *
              18
          : 0;

      /*
        ==========================
        SMART ARRIVAL
        ==========================

        30 units থেকে
        cinematic slowdown.

        কিন্তু minimum arrival
        speed থাকবে যেন bike
        আটকে না যায়।
      */

      if (
        distanceToStop <
          30 &&
        distanceToStop >
          0.75
      ) {
        const stopFactor =
          THREE.MathUtils.clamp(
            distanceToStop /
              30,
            0,
            1
          );

        targetSpeed *=
          0.25 +
          stopFactor *
            0.75;

        /*
          user scroll করেছে
          এবং destination খুব কাছে,
          তাহলে minimum crawl speed.
        */

        if (
          scrollPower.current >
            0.01
        ) {
          targetSpeed =
            Math.max(
              targetSpeed,
              2.4
            );
        }
      }

      /*
        Smooth acceleration.
      */

      const speedSmooth =
        1 -
        Math.exp(
          -4 *
            delta
        );

      speed.current =
        THREE.MathUtils.lerp(
          speed.current,
          targetSpeed,
          speedSmooth
        );

      /*
        ==========================
        EXPERIENCE DISCOVERY
        ==========================
      */

      if (
        game.projectsCompleted &&
        !game.experienceCompleted
      ) {
        experienceMilestones.forEach(
          (milestone) => {
            if (
              bike.position.z <=
                milestone.z &&
              !discoveredExperience.current.has(
                milestone.id
              )
            ) {
              discoveredExperience.current.add(
                milestone.id
              );

              useGameStore
                .getState()
                .showExperienceMilestone(
                  milestone.id
                );
            }
          }
        );
      }

      /*
        ==========================
        ACHIEVEMENT DISCOVERY
        ==========================
      */

      if (
        game.experienceCompleted &&
        !game.achievementsCompleted
      ) {
        achievementMilestones.forEach(
          (achievement) => {
            if (
              bike.position.z <=
                achievement.z &&
              !discoveredAchievements.current.has(
                achievement.id
              )
            ) {
              discoveredAchievements.current.add(
                achievement.id
              );

              useGameStore
                .getState()
                .showAchievementMilestone(
                  achievement.id
                );
            }
          }
        );
      }

      /*
        ==========================
        MOVE
        ==========================
      */

      bike.position.z -=
        speed.current *
        delta;

      /*
        Prevent overshooting.
      */

      if (
        bike.position.z <
        stopZ
      ) {
        bike.position.z =
          stopZ;
      }

      /*
        ==========================
        CURATED PATH
        ==========================
      */

      const routeDistance =
        -bike.position.z;

      const targetX =
        Math.sin(
          routeDistance *
            0.014
        ) *
          0.55 +
        Math.sin(
          routeDistance *
            0.004
        ) *
          0.25;

      const previousX =
        bike.position.x;

      const pathSmooth =
        1 -
        Math.exp(
          -2.3 *
            delta
        );

      bike.position.x =
        THREE.MathUtils.lerp(
          bike.position.x,
          targetX,
          pathSmooth
        );

      const lateralMovement =
        bike.position.x -
        previousX;

      const speedRatio =
        THREE.MathUtils.clamp(
          speed.current /
            22,
          0,
          1
        );

      const turnSignal =
        THREE.MathUtils.clamp(
          lateralMovement *
            24,
          -1,
          1
        );

      visual.rotation.z =
        THREE.MathUtils.lerp(
          visual.rotation.z,
          -turnSignal *
            0.14 *
            speedRatio,
          0.08
        );

      visual.rotation.y =
        THREE.MathUtils.lerp(
          visual.rotation.y,
          -turnSignal *
            0.06 *
            speedRatio,
          0.08
        );

      /*
        ==========================
        SUSPENSION
        ==========================
      */

      const time =
        state.clock.elapsedTime;

      const bounce =
        Math.sin(
          time *
            (
              7 +
              speedRatio *
                10
            )
        ) *
        0.008 *
        speedRatio;

      visual.position.y =
        THREE.MathUtils.lerp(
          visual.position.y,
          bounce,
          0.13
        );

      /*
        ==========================
        CAMERA
        ==========================
      */

      if (
        perspectiveCamera.isPerspectiveCamera
      ) {
        const targetFov =
          THREE.MathUtils.lerp(
            52,
            58,
            speedRatio
          );

        perspectiveCamera.fov =
          THREE.MathUtils.lerp(
            perspectiveCamera.fov,
            targetFov,
            0.045
          );

        perspectiveCamera.updateProjectionMatrix();
      }

      const desiredCamera =
        new THREE.Vector3(
          bike.position.x *
            0.68,

          bike.position.y +
            4.2 +
            speedRatio *
              0.18,

          bike.position.z +
            10.5 +
            speedRatio *
              1.2
        );

      const cameraSmooth =
        1 -
        Math.exp(
          -3.7 *
            delta
        );

      camera.position.lerp(
        desiredCamera,
        cameraSmooth
      );

      const lookAhead =
        THREE.MathUtils.lerp(
          13,
          17,
          speedRatio
        );

      const normalLook =
        new THREE.Vector3(
          bike.position.x *
            0.76,

          1.3,

          bike.position.z -
            lookAhead
        );

      cameraLookTarget.current.lerp(
        normalLook,
        cameraSmooth
      );

      camera.lookAt(
        cameraLookTarget.current
      );

      /*
        ==========================
        HUD PROGRESS
        ==========================
      */

      const displaySpeed =
        Math.round(
          speed.current *
            4
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

      let progress = 100;

      if (
        !game.aboutCompleted
      ) {
        const total =
          (
            START_Z -
            ABOUT_TARGET_Z
          ) *
          10;

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
            ) *
              16
          );
      } else if (
        !game.skillsCompleted
      ) {
        const total =
          (
            ABOUT_STOP_Z -
            SKILLS_TARGET_Z
          ) *
          10;

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
            ) *
              17
          );
      } else if (
        !game.projectsCompleted
      ) {
        const total =
          (
            SKILLS_STOP_Z -
            PROJECT_TARGET_Z
          ) *
          10;

        progress =
          33 +
          Math.round(
            THREE.MathUtils.clamp(
              (
                total -
                distanceMeters
              ) /
                total,
              0,
              1
            ) *
              22
          );
      } else if (
        !game.experienceCompleted
      ) {
        const total =
          (
            PROJECT_STOP_Z -
            EXPERIENCE_TARGET_Z
          ) *
          10;

        progress =
          55 +
          Math.round(
            THREE.MathUtils.clamp(
              (
                total -
                distanceMeters
              ) /
                total,
              0,
              1
            ) *
              17
          );
      } else if (
        !game.achievementsCompleted
      ) {
        const total =
          (
            EXPERIENCE_STOP_Z -
            ACHIEVEMENT_TARGET_Z
          ) *
          10;

        progress =
          72 +
          Math.round(
            THREE.MathUtils.clamp(
              (
                total -
                distanceMeters
              ) /
                total,
              0,
              1
            ) *
              16
          );
      } else {
        const total =
          (
            ACHIEVEMENT_STOP_Z -
            CONTACT_TARGET_Z
          ) *
          10;

        progress =
          88 +
          Math.round(
            THREE.MathUtils.clamp(
              (
                total -
                distanceMeters
              ) /
                total,
              0,
              1
            ) *
              12
          );
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