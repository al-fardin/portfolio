"use client";

import {
  useMemo,
  useRef,
} from "react";

import {
  useFrame,
  useThree,
} from "@react-three/fiber";

import * as THREE from "three";

import {
  useGameStore,
} from "@/store/useGameStore";

type SkyStop = {
  progress: number;

  top: string;

  bottom: string;

  fog: string;
};

const skyStops: SkyStop[] = [
  {
    progress: 0,
    top: "#9fc8d6",
    bottom: "#f1d4bc",
    fog: "#d2c9bd",
  },

  {
    progress: 16,
    top: "#9fcbd5",
    bottom: "#f1d9c3",
    fog: "#c8c4b9",
  },

  {
    progress: 33,
    top: "#88b9c3",
    bottom: "#e6d7c4",
    fog: "#bcbeb4",
  },

  {
    progress: 55,
    top: "#a99ab1",
    bottom: "#e5a889",
    fog: "#c7a79a",
  },

  {
    progress: 72,
    top: "#6e718d",
    bottom: "#dc917c",
    fog: "#97878a",
  },

  {
    progress: 88,
    top: "#3f4c69",
    bottom: "#9b7c83",
    fog: "#62616c",
  },

  {
    progress: 100,
    top: "#253047",
    bottom: "#53697b",
    fog: "#394653",
  },
];

function getStops(
  progress: number
) {
  let start =
    skyStops[0];

  let end =
    skyStops[
      skyStops.length - 1
    ];

  for (
    let i = 0;
    i <
    skyStops.length - 1;
    i++
  ) {
    if (
      progress >=
        skyStops[i].progress &&
      progress <=
        skyStops[i + 1].progress
    ) {
      start =
        skyStops[i];

      end =
        skyStops[i + 1];

      break;
    }
  }

  const range =
    end.progress -
    start.progress;

  const t =
    range === 0
      ? 0
      : (
          progress -
          start.progress
        ) / range;

  return {
    start,
    end,
    t,
  };
}

export default function SkyEnvironment() {
  const groupRef =
    useRef<THREE.Group>(
      null
    );

  const skyMaterialRef =
    useRef<THREE.ShaderMaterial>(
      null
    );

  const fogRef =
    useRef<THREE.Fog>(
      null
    );

  const sunRef =
    useRef<THREE.DirectionalLight>(
      null
    );

  const hemiRef =
    useRef<THREE.HemisphereLight>(
      null
    );

  const moonRef =
    useRef<THREE.MeshBasicMaterial>(
      null
    );

  const starsRef =
    useRef<THREE.PointsMaterial>(
      null
    );

  const {
    camera,
  } = useThree();

  const targetTop =
    useMemo(
      () =>
        new THREE.Color(),
      []
    );

  const targetBottom =
    useMemo(
      () =>
        new THREE.Color(),
      []
    );

  const targetFog =
    useMemo(
      () =>
        new THREE.Color(),
      []
    );

  const starPositions =
    useMemo(() => {
      const count = 700;

      const positions =
        new Float32Array(
          count * 3
        );

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const radius =
          190 +
          Math.random() *
            80;

        const theta =
          Math.random() *
          Math.PI *
          2;

        const y =
          35 +
          Math.random() *
            150;

        positions[
          i * 3
        ] =
          Math.cos(theta) *
          radius;

        positions[
          i * 3 + 1
        ] = y;

        positions[
          i * 3 + 2
        ] =
          Math.sin(theta) *
          radius;
      }

      return positions;
    }, []);

  useFrame(
    (_, delta) => {
      const progress =
        useGameStore
          .getState()
          .journeyProgress;

      if (
        groupRef.current
      ) {
        groupRef.current.position.x =
          camera.position.x;

        groupRef.current.position.z =
          camera.position.z;
      }

      const {
        start,
        end,
        t,
      } =
        getStops(
          progress
        );

      targetTop.lerpColors(
        new THREE.Color(
          start.top
        ),
        new THREE.Color(
          end.top
        ),
        t
      );

      targetBottom.lerpColors(
        new THREE.Color(
          start.bottom
        ),
        new THREE.Color(
          end.bottom
        ),
        t
      );

      targetFog.lerpColors(
        new THREE.Color(
          start.fog
        ),
        new THREE.Color(
          end.fog
        ),
        t
      );

      const smooth =
        1 -
        Math.exp(
          -1.8 * delta
        );

      if (
        skyMaterialRef.current
      ) {
        skyMaterialRef.current.uniforms.topColor.value.lerp(
          targetTop,
          smooth
        );

        skyMaterialRef.current.uniforms.bottomColor.value.lerp(
          targetBottom,
          smooth
        );
      }

      if (
        fogRef.current
      ) {
        fogRef.current.color.lerp(
          targetFog,
          smooth
        );

        fogRef.current.near =
          THREE.MathUtils.lerp(
            110,
            80,
            progress / 100
          );

        fogRef.current.far =
          THREE.MathUtils.lerp(
            450,
            360,
            progress / 100
          );
      }

      if (
        sunRef.current
      ) {
        sunRef.current.intensity =
          THREE.MathUtils.lerp(
            2.8,
            1.1,
            progress / 100
          );

        sunRef.current.color.lerpColors(
          new THREE.Color(
            "#fff0d3"
          ),
          new THREE.Color(
            "#c9d7e8"
          ),
          progress / 100
        );
      }

      if (
        hemiRef.current
      ) {
        hemiRef.current.intensity =
          THREE.MathUtils.lerp(
            1.2,
            0.72,
            progress / 100
          );
      }

      const night =
        THREE.MathUtils.clamp(
          (
            progress -
            68
          ) /
            32,
          0,
          1
        );

      if (
        moonRef.current
      ) {
        moonRef.current.opacity =
          night * 0.9;
      }

      if (
        starsRef.current
      ) {
        starsRef.current.opacity =
          night * 0.65;
      }
    }
  );

  return (
    <>
      <fog
        ref={fogRef}
        attach="fog"
        args={[
          "#d2c9bd",
          110,
          450,
        ]}
      />

      <hemisphereLight
        ref={hemiRef}
        args={[
          "#cfe3ea",
          "#a9907e",
          1.2,
        ]}
      />

      <ambientLight
        intensity={0.32}
      />

      <directionalLight
        ref={sunRef}
        position={[
          -35,
          45,
          20,
        ]}
        intensity={2.8}
        color="#fff0d3"
        castShadow
        shadow-mapSize-width={
          2048
        }
        shadow-mapSize-height={
          2048
        }
        shadow-camera-left={
          -35
        }
        shadow-camera-right={
          35
        }
        shadow-camera-top={
          35
        }
        shadow-camera-bottom={
          -35
        }
      />

      <group
        ref={groupRef}
      >
        {/* GRADIENT */}

        <mesh>
          <sphereGeometry
            args={[
              300,
              32,
              24,
            ]}
          />

          <shaderMaterial
            ref={
              skyMaterialRef
            }
            side={
              THREE.BackSide
            }
            depthWrite={
              false
            }
            uniforms={{
              topColor: {
                value:
                  new THREE.Color(
                    "#9fc8d6"
                  ),
              },

              bottomColor: {
                value:
                  new THREE.Color(
                    "#f1d4bc"
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
                  vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform vec3 topColor;
              uniform vec3 bottomColor;

              varying vec3 vPosition;

              void main() {
                float h =
                  normalize(vPosition).y;

                float mixValue =
                  smoothstep(
                    -0.15,
                    0.75,
                    h
                  );

                vec3 color =
                  mix(
                    bottomColor,
                    topColor,
                    mixValue
                  );

                gl_FragColor =
                  vec4(
                    color,
                    1.0
                  );
              }
            `}
          />
        </mesh>

        {/* SOFT SUN */}

        <mesh
          position={[
            110,
            70,
            -220,
          ]}
        >
          <sphereGeometry
            args={[
              10,
              32,
              32,
            ]}
          />

          <meshBasicMaterial
            color="#ffe3b5"
            transparent
            opacity={0.75}
            depthWrite={false}
            fog={false}
          />
        </mesh>

        {/* STARS */}

        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                starPositions,
                3,
              ]}
            />
          </bufferGeometry>

          <pointsMaterial
            ref={starsRef}
            color="#f8f2e8"
            size={0.6}
            transparent
            opacity={0}
            depthWrite={false}
            fog={false}
          />
        </points>

        {/* MOON */}

        <mesh
          position={[
            -105,
            90,
            -220,
          ]}
        >
          <sphereGeometry
            args={[
              5,
              32,
              32,
            ]}
          />

          <meshBasicMaterial
            ref={moonRef}
            color="#f3f0e5"
            transparent
            opacity={0}
            fog={false}
          />
        </mesh>
      </group>
    </>
  );
}