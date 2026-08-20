"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import Bike from "./Bike";
import { useGameStore } from "@/store/useGameStore";

const DESTINATION_Z = -120;
const START_Z = 4;

export default function BikeController() {
  const bikeRef = useRef<THREE.Group>(null);
  const visualRef = useRef<THREE.Group>(null);

  const speed = useRef(0);

  const lastHud = useRef({
    speed: -1,
    distance: -1,
    progress: -1,
    reached: false,
  });

  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const { camera } = useThree();

  useEffect(() => {
    const keyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === "w" || key === "arrowup") {
        keys.current.forward = true;
      }

      if (key === "s" || key === "arrowdown") {
        keys.current.backward = true;
      }

      if (key === "a" || key === "arrowleft") {
        keys.current.left = true;
      }

      if (key === "d" || key === "arrowright") {
        keys.current.right = true;
      }
    };

    const keyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === "w" || key === "arrowup") {
        keys.current.forward = false;
      }

      if (key === "s" || key === "arrowdown") {
        keys.current.backward = false;
      }

      if (key === "a" || key === "arrowleft") {
        keys.current.left = false;
      }

      if (key === "d" || key === "arrowright") {
        keys.current.right = false;
      }
    };

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!bikeRef.current || !visualRef.current) {
      return;
    }

    const maxForwardSpeed = 26;
    const maxReverseSpeed = -5;

    const acceleration = 13;
    const brakePower = 22;
    const friction = 5;

    /*
      ACCELERATE / BRAKE
    */

    if (keys.current.forward) {
      speed.current += acceleration * delta;
    } else if (keys.current.backward) {
      speed.current -= brakePower * delta;
    } else {
      if (speed.current > 0) {
        speed.current -= friction * delta;

        if (speed.current < 0) {
          speed.current = 0;
        }
      }

      if (speed.current < 0) {
        speed.current += friction * delta;

        if (speed.current > 0) {
          speed.current = 0;
        }
      }
    }

    speed.current = THREE.MathUtils.clamp(
      speed.current,
      maxReverseSpeed,
      maxForwardSpeed
    );

    /*
      FIRST DESTINATION AUTO SLOWDOWN
    */

    const currentDistanceWorld =
      bikeRef.current.position.z - DESTINATION_Z;

    if (
      currentDistanceWorld > 0 &&
      currentDistanceWorld < 16 &&
      speed.current > 10
    ) {
      speed.current -= 12 * delta;
    }

    /*
      FORWARD MOVEMENT

      Negative Z = forward
    */

    bikeRef.current.position.z -= speed.current * delta;

    /*
      STEERING
    */

    let steering = 0;

    if (keys.current.left) {
      steering = -1;
    }

    if (keys.current.right) {
      steering = 1;
    }

    const speedRatio = THREE.MathUtils.clamp(
      Math.abs(speed.current) / maxForwardSpeed,
      0,
      1
    );

    const steeringSpeed =
      2.5 + speedRatio * 4;

    const reverseSteering =
      speed.current >= 0 ? 1 : -0.65;

    bikeRef.current.position.x +=
      steering *
      steeringSpeed *
      delta *
      reverseSteering;

    /*
      Keep motorcycle inside road
    */

    bikeRef.current.position.x =
      THREE.MathUtils.clamp(
        bikeRef.current.position.x,
        -5.2,
        5.2
      );

    /*
      Visual steering
    */

    const targetYaw =
      -steering * 0.15 * speedRatio;

    visualRef.current.rotation.y =
      THREE.MathUtils.lerp(
        visualRef.current.rotation.y,
        targetYaw,
        0.1
      );

    /*
      Motorcycle lean
    */

    const targetLean =
      -steering * 0.3 * speedRatio;

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
      targetPitch = -0.025;
    }

    if (
      keys.current.backward &&
      speed.current > 3
    ) {
      targetPitch = 0.035;
    }

    visualRef.current.rotation.x =
      THREE.MathUtils.lerp(
        visualRef.current.rotation.x,
        targetPitch,
        0.08
      );

    /*
      CAMERA
    */

    const bikePosition =
      bikeRef.current.position;

    const desiredCamera =
      new THREE.Vector3(
        bikePosition.x * 0.88,
        bikePosition.y + 4.6,
        bikePosition.z + 9.5
      );

    const cameraSmooth =
      1 - Math.exp(-5 * delta);

    camera.position.lerp(
      desiredCamera,
      cameraSmooth
    );

    /*
      Camera looks ahead on road
    */

    const lookTarget =
      new THREE.Vector3(
        bikePosition.x * 0.75,
        bikePosition.y + 1.2,
        bikePosition.z - 11
      );

    camera.lookAt(lookTarget);

    /*
      HUD DATA
    */

    const displaySpeed = Math.round(
      Math.abs(speed.current) * 4
    );

    const distanceWorld = Math.max(
      0,
      bikePosition.z - DESTINATION_Z
    );

    const distanceMeters =
      Math.round(distanceWorld * 10);

    const totalDistance =
      (START_Z - DESTINATION_Z) * 10;

    const travelled =
      totalDistance - distanceMeters;

    const firstSectionProgress =
      THREE.MathUtils.clamp(
        travelled / totalDistance,
        0,
        1
      );

    /*
      First destination represents
      about 16% of entire journey.
    */

    const journeyProgress =
      Math.round(
        firstSectionProgress * 16
      );

    const destinationReached =
      distanceMeters <= 20;

    /*
      Avoid unnecessary React updates
    */

    if (
      lastHud.current.speed !== displaySpeed ||
      lastHud.current.distance !== distanceMeters ||
      lastHud.current.progress !== journeyProgress ||
      lastHud.current.reached !== destinationReached
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
        speed: displaySpeed,
        distance: distanceMeters,
        progress: journeyProgress,
        reached: destinationReached,
      };
    }
  });

  return (
    <group
      ref={bikeRef}
      position={[0, 0, START_Z]}
    >
      <group ref={visualRef}>
        <Bike />
      </group>
    </group>
  );
}