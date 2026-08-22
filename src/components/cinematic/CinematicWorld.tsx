"use client";

import {
  useRef,
} from "react";

import {
  useFrame,
  useThree,
} from "@react-three/fiber";

import * as THREE from "three";

import CityScenery from "./CityScenery";
import JourneyInput from "./JourneyInput";
import JourneyRig from "./JourneyRig";
import RoadRibbon from "./RoadRibbon";

function DuskEnvironment() {
  const skyRef =
    useRef<THREE.Group>(
      null
    );

  const { camera } =
    useThree();

  useFrame(() => {
    if (!skyRef.current) {
      return;
    }

    skyRef.current.position.x =
      camera.position.x;

    skyRef.current.position.z =
      camera.position.z;
  });

  return (
    <>
      <fog
        attach="fog"
        args={[
          "#70594e",
          120,
          390,
        ]}
      />

      {/* soft ambient sky */}

      <hemisphereLight
        args={[
          "#d0b8aa",
          "#242a23",
          1.15,
        ]}
      />

      <ambientLight
        intensity={0.25}
      />

      {/* sunset key light */}

      <directionalLight
        position={[
          -40,
          38,
          18,
        ]}
        intensity={3}
        color="#ffc58f"
        castShadow
        shadow-mapSize-width={
          2048
        }
        shadow-mapSize-height={
          2048
        }
        shadow-camera-left={
          -45
        }
        shadow-camera-right={
          45
        }
        shadow-camera-top={
          45
        }
        shadow-camera-bottom={
          -45
        }
      />

      {/* opposite soft fill */}

      <directionalLight
        position={[
          30,
          20,
          -30,
        ]}
        intensity={0.7}
        color="#9eb2c0"
      />

      {/* warm mosque/city atmosphere */}

      <pointLight
        position={[
          15,
          8,
          -65,
        ]}
        intensity={9}
        distance={65}
        color="#e5a96f"
      />

      <group ref={skyRef}>
        {/* GRADIENT SKY */}

        <mesh>
          <sphereGeometry
            args={[
              350,
              36,
              28,
            ]}
          />

          <shaderMaterial
            side={
              THREE.BackSide
            }
            depthWrite={false}
            uniforms={{
              topColor: {
                value:
                  new THREE.Color(
                    "#463d43"
                  ),
              },

              middleColor: {
                value:
                  new THREE.Color(
                    "#835849"
                  ),
              },

              horizonColor: {
                value:
                  new THREE.Color(
                    "#c57855"
                  ),
              },
            }}
            vertexShader={`
              varying vec3 vPosition;

              void main() {
                vPosition = position;

                gl_Position =
                  projectionMatrix *
                  modelViewMatrix *
                  vec4(
                    position,
                    1.0
                  );
              }
            `}
            fragmentShader={`
              uniform vec3 topColor;
              uniform vec3 middleColor;
              uniform vec3 horizonColor;

              varying vec3 vPosition;

              void main() {
                float h =
                  normalize(
                    vPosition
                  ).y;

                float lowMix =
                  smoothstep(
                    -0.16,
                    0.24,
                    h
                  );

                float highMix =
                  smoothstep(
                    0.2,
                    0.9,
                    h
                  );

                vec3 lower =
                  mix(
                    horizonColor,
                    middleColor,
                    lowMix
                  );

                vec3 result =
                  mix(
                    lower,
                    topColor,
                    highMix
                  );

                gl_FragColor =
                  vec4(
                    result,
                    1.0
                  );
              }
            `}
          />
        </mesh>

        {/* SUN */}

        <mesh
          position={[
            110,
            65,
            -220,
          ]}
        >
          <sphereGeometry
            args={[
              6,
              32,
              32,
            ]}
          />

          <meshBasicMaterial
            color="#e9c89d"
            transparent
            opacity={0.8}
            depthWrite={false}
            fog={false}
          />
        </mesh>
      </group>
    </>
  );
}

export default function CinematicWorld() {
  return (
    <>
      <DuskEnvironment />

      <RoadRibbon />

      <CityScenery />

      <JourneyRig />

      <JourneyInput />
    </>
  );
}