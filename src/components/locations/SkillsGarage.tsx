"use client";

import {
  Float,
  Html,
} from "@react-three/drei";

type SkillOrbProps = {
  position: [
    number,
    number,
    number
  ];

  title: string;

  color: string;
};

function SkillOrb({
  position,
  title,
  color,
}: SkillOrbProps) {
  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <group position={position}>

        <mesh castShadow>
          <sphereGeometry
            args={[
              0.45,
              24,
              24,
            ]}
          />

          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2.5}
            metalness={0.4}
            roughness={0.25}
          />
        </mesh>

        <pointLight
          color={color}
          intensity={8}
          distance={5}
        />

        <Html
          position={[
            0,
            -0.85,
            0,
          ]}
          center
          distanceFactor={12}
        >
          <div
            style={{
              color: "white",
              fontFamily:
                "monospace",

              fontSize:
                "9px",

              letterSpacing:
                "0.15em",

              whiteSpace:
                "nowrap",

              pointerEvents:
                "none",
            }}
          >
            {title}
          </div>
        </Html>

      </group>
    </Float>
  );
}

export default function SkillsGarage() {
  return (
    <group
      position={[
        13,
        0,
        -255,
      ]}
    >

      {/* Garage base */}
      <mesh
        position={[
          0,
          0.15,
          0,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[
            15,
            0.3,
            20,
          ]}
        />

        <meshStandardMaterial
          color="#10131a"
          roughness={0.85}
        />
      </mesh>

      {/* Back wall */}
      <mesh
        position={[
          4.8,
          4.5,
          0,
        ]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[
            0.5,
            9,
            20,
          ]}
        />

        <meshStandardMaterial
          color="#151925"
          metalness={0.25}
          roughness={0.65}
        />
      </mesh>

      {/* Rear wall */}
      <mesh
        position={[
          -1.5,
          4.5,
          -9.5,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            12,
            9,
            0.5,
          ]}
        />

        <meshStandardMaterial
          color="#181d29"
        />
      </mesh>

      {/* Front frame left */}
      <mesh
        position={[
          -6,
          4.5,
          -8.5,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.5,
            9,
            2,
          ]}
        />

        <meshStandardMaterial
          color="#202636"
          metalness={0.5}
        />
      </mesh>

      {/* Roof */}
      <mesh
        position={[
          -1,
          9,
          0,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            12,
            0.5,
            20,
          ]}
        />

        <meshStandardMaterial
          color="#0c0f16"
          metalness={0.4}
        />
      </mesh>

      {/* Garage front glowing pillar */}
      <mesh
        position={[
          -6,
          3,
          4,
        ]}
      >
        <boxGeometry
          args={[
            0.18,
            6,
            0.18,
          ]}
        />

        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={5}
        />
      </mesh>

      {/* Purple neon */}
      <mesh
        position={[
          -5.8,
          7.2,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.15,
            0.15,
            12,
          ]}
        />

        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={6}
        />
      </mesh>

      {/* Interior floor glow */}
      <rectAreaLight
        position={[
          -1,
          7.5,
          0,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        width={10}
        height={15}
        intensity={8}
        color="#5b21b6"
      />

      {/* Garage sign */}
      <Html
        position={[
          -5.7,
          7.5,
          0,
        ]}
        rotation={[
          0,
          -Math.PI / 2,
          0,
        ]}
        center
        distanceFactor={14}
      >
        <div
          style={{
            minWidth:
              "180px",

            color:
              "white",

            fontFamily:
              "monospace",

            fontSize:
              "12px",

            textAlign:
              "center",

            letterSpacing:
              "0.25em",

            padding:
              "9px 12px",

            background:
              "rgba(4,6,10,0.8)",

            border:
              "1px solid rgba(139,92,246,.6)",

            pointerEvents:
              "none",
          }}
        >
          SKILLS GARAGE
        </div>
      </Html>

      {/* Skill holograms */}
      <SkillOrb
        position={[
          -2.8,
          2.3,
          -4,
        ]}
        title="C++"
        color="#8b5cf6"
      />

      <SkillOrb
        position={[
          0,
          2.7,
          -2,
        ]}
        title="REACT"
        color="#22d3ee"
      />

      <SkillOrb
        position={[
          -2.5,
          2.4,
          1.5,
        ]}
        title="GO"
        color="#38bdf8"
      />

      <SkillOrb
        position={[
          0.5,
          2.5,
          3.5,
        ]}
        title="JAVASCRIPT"
        color="#facc15"
      />

      <SkillOrb
        position={[
          -2.5,
          4.8,
          0,
        ]}
        title="AI / ML"
        color="#a855f7"
      />

    </group>
  );
}