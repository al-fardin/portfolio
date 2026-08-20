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
  top: THREE.Color;
  bottom: THREE.Color;
  fog: THREE.Color;
};

const skyStops: SkyStop[] = [
  {
    progress: 0,

    top: new THREE.Color(
      "#294a67"
    ),

    bottom: new THREE.Color(
      "#d9865d"
    ),

    fog: new THREE.Color(
      "#7c665f"
    ),
  },

  {
    progress: 16,

    top: new THREE.Color(
      "#4b7fa7"
    ),

    bottom: new THREE.Color(
      "#d7b58d"
    ),

    fog: new THREE.Color(
      "#8293a0"
    ),
  },

  {
    progress: 33,

    top: new THREE.Color(
      "#2f6f9f"
    ),

    bottom: new THREE.Color(
      "#8fc4df"
    ),

    fog: new THREE.Color(
      "#64869a"
    ),
  },

  {
    progress: 55,

    top: new THREE.Color(
      "#55446f"
    ),

    bottom: new THREE.Color(
      "#e9885c"
    ),

    fog: new THREE.Color(
      "#735b67"
    ),
  },

  {
    progress: 72,

    top: new THREE.Color(
      "#18233f"
    ),

    bottom: new THREE.Color(
      "#75455d"
    ),

    fog: new THREE.Color(
      "#32364b"
    ),
  },

  {
    progress: 88,

    top: new THREE.Color(
      "#080e20"
    ),

    bottom: new THREE.Color(
      "#182641"
    ),

    fog: new THREE.Color(
      "#101a2a"
    ),
  },

  {
    progress: 100,

    top: new THREE.Color(
      "#01030a"
    ),

    bottom: new THREE.Color(
      "#071327"
    ),

    fog: new THREE.Color(
      "#050b16"
    ),
  },
];

function getSkyColors(
  progress: number,
  topResult: THREE.Color,
  bottomResult: THREE.Color,
  fogResult: THREE.Color
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
        skyStops[i]
          .progress &&
      progress <=
        skyStops[i + 1]
          .progress
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

  const localProgress =
    range === 0
      ? 0
      : (
          progress -
          start.progress
        ) /
        range;

  topResult.lerpColors(
    start.top,
    end.top,
    localProgress
  );

  bottomResult.lerpColors(
    start.bottom,
    end.bottom,
    localProgress
  );

  fogResult.lerpColors(
    start.fog,
    end.fog,
    localProgress
  );
}

export default function SkyEnvironment() {
  const skyGroupRef =
    useRef<THREE.Group>(
      null
    );

  const skyMaterialRef =
    useRef<THREE.ShaderMaterial>(
      null
    );

  const starMaterialRef =
    useRef<THREE.PointsMaterial>(
      null
    );

  const moonMaterialRef =
    useRef<THREE.MeshStandardMaterial>(
      null
    );

  const moonGlowRef =
    useRef<THREE.MeshBasicMaterial>(
      null
    );

  const moonLightRef =
    useRef<THREE.DirectionalLight>(
      null
    );

  const sunLightRef =
    useRef<THREE.DirectionalLight>(
      null
    );

  const hemisphereRef =
    useRef<THREE.HemisphereLight>(
      null
    );

  const ambientRef =
    useRef<THREE.AmbientLight>(
      null
    );

  const fogRef =
    useRef<THREE.Fog>(
      null
    );

  const {
    camera,
  } = useThree();

  const topColor =
    useMemo(
      () =>
        new THREE.Color(),
      []
    );

  const bottomColor =
    useMemo(
      () =>
        new THREE.Color(),
      []
    );

  const fogColor =
    useMemo(
      () =>
        new THREE.Color(),
      []
    );

  /*
    Create star positions once.
  */

  const starPositions =
    useMemo(() => {
      const count =
        1400;

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
          170 +
          Math.random() *
            110;

        const theta =
          Math.random() *
          Math.PI *
          2;

        /*
          Keep most stars
          above horizon.
        */

        const phi =
          Math.acos(
            THREE.MathUtils.lerp(
              0.05,
              0.95,
              Math.random()
            )
          );

        const x =
          radius *
          Math.sin(phi) *
          Math.cos(theta);

        const y =
          Math.abs(
            radius *
              Math.cos(
                phi
              )
          ) + 15;

        const z =
          radius *
          Math.sin(phi) *
          Math.sin(theta);

        positions[
          i * 3
        ] = x;

        positions[
          i * 3 + 1
        ] = y;

        positions[
          i * 3 + 2
        ] = z;
      }

      return positions;
    }, []);

  useFrame(
    (_, delta) => {
      const progress =
        useGameStore
          .getState()
          .journeyProgress;

      /*
        Sky follows camera.

        So player can travel
        hundreds of units and
        never leave the sky dome.
      */

      if (
        skyGroupRef.current
      ) {
        skyGroupRef.current.position.x =
          camera.position.x;

        skyGroupRef.current.position.z =
          camera.position.z;

        skyGroupRef.current.position.y =
          0;
      }

      /*
        Calculate current
        journey sky colours.
      */

      getSkyColors(
        progress,
        topColor,
        bottomColor,
        fogColor
      );

      /*
        Sky shader colours.
      */

      if (
        skyMaterialRef.current
      ) {
        skyMaterialRef.current.uniforms.topColor.value.lerp(
          topColor,
          1 -
            Math.exp(
              -1.8 *
                delta
            )
        );

        skyMaterialRef.current.uniforms.bottomColor.value.lerp(
          bottomColor,
          1 -
            Math.exp(
              -1.8 *
                delta
            )
        );
      }

      /*
        Fog transition.
      */

      if (
        fogRef.current
      ) {
        fogRef.current.color.lerp(
          fogColor,
          1 -
            Math.exp(
              -1.8 *
                delta
            )
        );

        /*
          Night becomes
          slightly more atmospheric.
        */

        const nightAmount =
          THREE.MathUtils.clamp(
            (
              progress -
              55
            ) /
              45,
            0,
            1
          );

        fogRef.current.near =
          THREE.MathUtils.lerp(
            100,
            72,
            nightAmount
          );

        fogRef.current.far =
          THREE.MathUtils.lerp(
            430,
            340,
            nightAmount
          );
      }

      /*
        STARS

        Begin appearing around
        Project City / sunset.
      */

      const starAmount =
        THREE.MathUtils.clamp(
          (
            progress -
            45
          ) /
            40,
          0,
          1
        );

      if (
        starMaterialRef.current
      ) {
        starMaterialRef.current.opacity =
          THREE.MathUtils.lerp(
            0,
            0.92,
            starAmount
          );
      }

      /*
        MOON
      */

      const moonAmount =
        THREE.MathUtils.clamp(
          (
            progress -
            55
          ) /
            30,
          0,
          1
        );

      if (
        moonMaterialRef.current
      ) {
        moonMaterialRef.current.opacity =
          moonAmount;

        moonMaterialRef.current.emissiveIntensity =
          THREE.MathUtils.lerp(
            0.2,
            2.5,
            moonAmount
          );
      }

      if (
        moonGlowRef.current
      ) {
        moonGlowRef.current.opacity =
          moonAmount *
          0.11;
      }

      /*
        DAY / SUN LIGHT
      */

      const dayAmount =
        1 -
        THREE.MathUtils.clamp(
          (
            progress -
            45
          ) /
            45,
          0,
          1
        );

      if (
        sunLightRef.current
      ) {
        sunLightRef.current.intensity =
          THREE.MathUtils.lerp(
            0.25,
            2.7,
            dayAmount
          );

        const warm =
          new THREE.Color(
            "#ffd8a8"
          );

        const daylight =
          new THREE.Color(
            "#fff4db"
          );

        sunLightRef.current.color.lerpColors(
          warm,
          daylight,
          dayAmount
        );
      }

      /*
        MOON LIGHT
      */

      if (
        moonLightRef.current
      ) {
        moonLightRef.current.intensity =
          moonAmount *
          1.8;
      }

      /*
        Hemisphere.
      */

      if (
        hemisphereRef.current
      ) {
        hemisphereRef.current.intensity =
          THREE.MathUtils.lerp(
            0.48,
            1.05,
            dayAmount
          );
      }

      /*
        Ambient.
      */

      if (
        ambientRef.current
      ) {
        ambientRef.current.intensity =
          THREE.MathUtils.lerp(
            0.2,
            0.38,
            dayAmount
          );
      }
    }
  );

  return (
    <>
      {/* ========================= */}
      {/* FOG */}
      {/* ========================= */}

      <fog
        ref={fogRef}
        attach="fog"
        args={[
          "#7c665f",
          100,
          430,
        ]}
      />

      {/* ========================= */}
      {/* DYNAMIC LIGHTING */}
      {/* ========================= */}

      <hemisphereLight
        ref={hemisphereRef}
        args={[
          "#b8d8ff",
          "#33221b",
          1,
        ]}
      />

      <ambientLight
        ref={ambientRef}
        intensity={0.35}
      />

      {/* Day / sunset light */}

      <directionalLight
        ref={sunLightRef}
        position={[
          -35,
          45,
          28,
        ]}
        intensity={2.7}
        color="#fff4db"
        castShadow
        shadow-mapSize-width={
          2048
        }
        shadow-mapSize-height={
          2048
        }
        shadow-camera-far={
          130
        }
        shadow-camera-left={
          -32
        }
        shadow-camera-right={
          32
        }
        shadow-camera-top={
          32
        }
        shadow-camera-bottom={
          -32
        }
      />

      {/* Night moon light */}

      <directionalLight
        ref={moonLightRef}
        position={[
          35,
          50,
          20,
        ]}
        intensity={0}
        color="#b8d8ff"
      />

      {/* ========================= */}
      {/* SKY GROUP */}
      {/* ========================= */}

      <group
        ref={skyGroupRef}
      >
        {/* ======================= */}
        {/* GRADIENT SKY DOME */}
        {/* ======================= */}

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
                    "#294a67"
                  ),
              },

              bottomColor: {
                value:
                  new THREE.Color(
                    "#d9865d"
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
                float height =
                  normalize(vPosition).y;

                float mixValue =
                  smoothstep(
                    -0.15,
                    0.7,
                    height
                  );

                vec3 finalColor =
                  mix(
                    bottomColor,
                    topColor,
                    mixValue
                  );

                gl_FragColor =
                  vec4(
                    finalColor,
                    1.0
                  );
              }
            `}
          />
        </mesh>

        {/* ======================= */}
        {/* STAR FIELD */}
        {/* ======================= */}

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
            ref={
              starMaterialRef
            }
            color="#ffffff"
            size={0.65}
            sizeAttenuation
            transparent
            opacity={0}
            depthWrite={false}
            fog={false}
          />
        </points>

        {/* ======================= */}
        {/* MOON */}
        {/* ======================= */}

        <group
          position={[
            -105,
            92,
            -215,
          ]}
        >
          {/* Moon glow */}

          <mesh>
            <sphereGeometry
              args={[
                10,
                32,
                32,
              ]}
            />

            <meshBasicMaterial
              ref={
                moonGlowRef
              }
              color="#cfe8ff"
              transparent
              opacity={0}
              depthWrite={false}
              fog={false}
            />
          </mesh>

          {/* Moon body */}

          <mesh>
            <sphereGeometry
              args={[
                5.7,
                48,
                48,
              ]}
            />

            <meshStandardMaterial
              ref={
                moonMaterialRef
              }
              color="#e8f2ff"
              emissive="#cfe7ff"
              emissiveIntensity={
                0.2
              }
              roughness={0.72}
              metalness={0}
              transparent
              opacity={0}
              fog={false}
            />
          </mesh>
        </group>

        {/* ======================= */}
        {/* DISTANT NIGHT GLOW */}
        {/* ======================= */}

        <mesh
          position={[
            95,
            26,
            -240,
          ]}
        >
          <sphereGeometry
            args={[
              18,
              24,
              24,
            ]}
          />

          <meshBasicMaterial
            color="#7c3aed"
            transparent
            opacity={0.035}
            depthWrite={false}
            fog={false}
          />
        </mesh>

      </group>
    </>
  );
}