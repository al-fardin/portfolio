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

  const previousSpeed =
    useRef(0);

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

  const keys =
    useRef({
      forward: false,
      backward: false,
      left: false,
      right: false,
    });

  const {
    camera,
  } = useThree();

  /*
    ==========================
    INPUT
    ==========================
  */

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
        NON-RIDING / CINEMATIC
        ==========================
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

        previousSpeed.current =
          speed.current;

        keys.current.forward =
          false;

        keys.current.backward =
          false;

        keys.current.left =
          false;

        keys.current.right =
          false;

        if (
          perspectiveCamera.isPerspectiveCamera
        ) {
          perspectiveCamera.fov =
            THREE.MathUtils.lerp(
              perspectiveCamera.fov,
              55,
              0.08
            );

          perspectiveCamera.updateProjectionMatrix();
        }

        visual.position.y =
          THREE.MathUtils.lerp(
            visual.position.y,
            0,
            0.1
          );

        let cameraPosition =
          new THREE.Vector3(
            bike.position.x + 8,
            4,
            bike.position.z + 8
          );

        let cameraLook =
          new THREE.Vector3(
            bike.position.x,
            1.4,
            bike.position.z - 7
          );

        /*
          =====================
          STARTUP CAMERA
          =====================

          Slow orbit around bike.
        */

        if (
          game.sceneMode ===
          "startup"
        ) {
          const time =
            state.clock
              .elapsedTime;

          const orbit =
            time * 0.18;

          cameraPosition =
            new THREE.Vector3(
              bike.position.x +
                Math.sin(
                  orbit
                ) *
                  7.5,

              3.2 +
                Math.sin(
                  time *
                    0.35
                ) *
                  0.35,

              bike.position.z +
                7.5 +
                Math.cos(
                  orbit
                ) *
                  2.2
            );

          cameraLook =
            new THREE.Vector3(
              bike.position.x,
              1.25,
              bike.position.z -
                0.2
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
                8,
              3.5,
              bike.position.z +
                7
            );

          cameraLook =
            new THREE.Vector3(
              bike.position.x,
              1.4,
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
                7,
              4.8,
              bike.position.z +
                7
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
                10,
              8,
              bike.position.z +
                13
            );

          cameraLook =
            new THREE.Vector3(
              24,
              9,
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
              6.5,
              bike.position.z +
                12
            );

          cameraLook =
            new THREE.Vector3(
              -4,
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
              7.5,
              bike.position.z +
                15
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
            ? 1.3
            : 2.1;

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
        RIDING
        ==========================
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
      } else if (
        keys.current.backward
      ) {
        speed.current -=
          braking *
          delta;
      } else {
        if (
          speed.current > 0
        ) {
          speed.current -=
            friction *
            delta;

          if (
            speed.current < 0
          ) {
            speed.current =
              0;
          }
        }

        if (
          speed.current < 0
        ) {
          speed.current +=
            friction *
            delta;

          if (
            speed.current > 0
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
        ACCELERATION FORCE
      */

      const speedDifference =
        speed.current -
        previousSpeed.current;

      const accelerationForce =
        delta > 0
          ? THREE.MathUtils.clamp(
              speedDifference /
                delta /
                acceleration,
              -1,
              1
            )
          : 0;

      previousSpeed.current =
        speed.current;

      /*
        ==========================
        DESTINATION
        ==========================
      */

      let targetZ =
        CONTACT_TARGET_Z;

      let stopZ:
        | number
        | null =
        CONTACT_STOP_Z;

      let destination:
        | "about"
        | "skills"
        | "projects"
        | "experience"
        | "achievements"
        | "contact" =
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
        AUTO SLOWDOWN
        ==========================
      */

      if (
        stopZ !== null
      ) {
        const distanceToStop =
          bike.position.z -
          stopZ;

        if (
          distanceToStop <
            30 &&
          distanceToStop >
            0 &&
          speed.current >
            4
        ) {
          speed.current =
            Math.max(
              0,
              speed.current -
                18 *
                  delta
            );
        }

        if (
          bike.position.z <=
          stopZ
        ) {
          bike.position.z =
            stopZ;

          speed.current =
            0;

          previousSpeed.current =
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
      }

      /*
        ==========================
        FORWARD MOVEMENT
        ==========================
      */

      bike.position.z -=
        speed.current *
        delta;

      /*
        ==========================
        STEERING
        ==========================
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
        speedRatio *
          4;

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
        ==========================
        BIKE ANIMATION
        ==========================
      */

      const targetYaw =
        -steering *
        0.15 *
        speedRatio;

      visual.rotation.y =
        THREE.MathUtils.lerp(
          visual.rotation.y,
          targetYaw,
          0.1
        );

      const targetLean =
        -steering *
        0.3 *
        speedRatio;

      visual.rotation.z =
        THREE.MathUtils.lerp(
          visual.rotation.z,
          targetLean,
          0.1
        );

      const targetPitch =
        THREE.MathUtils.clamp(
          -accelerationForce *
            0.035,
          -0.045,
          0.05
        );

      visual.rotation.x =
        THREE.MathUtils.lerp(
          visual.rotation.x,
          targetPitch,
          0.08
        );

      /*
        SUSPENSION
      */

      const time =
        state.clock
          .elapsedTime;

      const roadBounce =
        Math.sin(
          time *
            (
              9 +
              speedRatio *
                18
            )
        ) *
        0.018 *
        speedRatio;

      const secondaryBounce =
        Math.sin(
          time *
            21.3
        ) *
        0.008 *
        speedRatio;

      const targetBikeY =
        roadBounce +
        secondaryBounce;

      visual.position.y =
        THREE.MathUtils.lerp(
          visual.position.y,
          targetBikeY,
          0.18
        );

      /*
        ==========================
        FOV
        ==========================
      */

      if (
        perspectiveCamera.isPerspectiveCamera
      ) {
        const targetFov =
          THREE.MathUtils.lerp(
            55,
            68,
            speedRatio
          );

        perspectiveCamera.fov =
          THREE.MathUtils.lerp(
            perspectiveCamera.fov,
            targetFov,
            0.055
          );

        perspectiveCamera.updateProjectionMatrix();
      }

      /*
        CAMERA DISTANCE
      */

      const speedCameraPull =
        speedRatio *
        3.2;

      const accelerationCamera =
        accelerationForce *
        0.75;

      const steeringLag =
        -steering *
        speedRatio *
        0.65;

      /*
        CAMERA SHAKE
      */

      const shakeStrength =
        Math.max(
          0,
          speedRatio -
            0.55
        ) *
        0.11;

      const shakeX =
        Math.sin(
          time *
            22.5
        ) *
        shakeStrength;

      const shakeY =
        Math.sin(
          time *
            28.7
        ) *
        shakeStrength *
        0.5;

      /*
        ==========================
        CHASE CAMERA
        ==========================
      */

      const desiredCamera =
        new THREE.Vector3(
          bike.position.x *
            0.86 +
            steeringLag +
            shakeX,

          bike.position.y +
            4.55 +
            speedRatio *
              0.4 +
            shakeY,

          bike.position.z +
            9.4 +
            speedCameraPull +
            accelerationCamera
        );

      const cameraFollowSpeed =
        THREE.MathUtils.lerp(
          6,
          4.3,
          speedRatio
        );

      const cameraSmooth =
        1 -
        Math.exp(
          -cameraFollowSpeed *
            delta
        );

      camera.position.lerp(
        desiredCamera,
        cameraSmooth
      );

      /*
        LOOK AHEAD
      */

      const lookAhead =
        THREE.MathUtils.lerp(
          11,
          18,
          speedRatio
        );

      const normalLook =
        new THREE.Vector3(
          bike.position.x *
            0.72,

          bike.position.y +
            1.15 -
            accelerationForce *
              0.08,

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
        HUD DATA
        ==========================
      */

      const displaySpeed =
        Math.round(
          Math.abs(
            speed.current
          ) *
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

      let progress =
        100;

      /*
        ABOUT
      */

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
      }

      /*
        SKILLS
      */

      else if (
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
      }

      /*
        PROJECTS
      */

      else if (
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
      }

      /*
        EXPERIENCE
      */

      else if (
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
      }

      /*
        ACHIEVEMENTS
      */

      else if (
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
      }

      /*
        CONTACT
      */

      else {
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