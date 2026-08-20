"use client";

import {
  Float,
  Html,
} from "@react-three/drei";

import {
  projects,
} from "@/data/projects";

import type {
  ProjectId,
} from "@/data/projects";

import {
  useGameStore,
} from "@/store/useGameStore";

type TowerProps = {
  projectId: ProjectId;

  position: [
    number,
    number,
    number
  ];

  height: number;

  accent: string;
};

function ProjectTower({
  projectId,
  position,
  height,
  accent,
}: TowerProps) {
  const selectedProject =
    useGameStore(
      (state) =>
        state.selectedProject
    );

  const selectProject =
    useGameStore(
      (state) =>
        state.selectProject
    );

  const project =
    projects.find(
      (item) =>
        item.id ===
        projectId
    );

  if (!project) {
    return null;
  }

  const selected =
    selectedProject ===
    projectId;

  return (
    <group
      position={position}
    >
      {/* Building */}
      <mesh
        position={[
          0,
          height / 2,
          0,
        ]}
        castShadow
        receiveShadow
        onClick={() =>
          selectProject(
            projectId
          )
        }
      >
        <boxGeometry
          args={[
            7,
            height,
            9,
          ]}
        />

        <meshStandardMaterial
          color={
            selected
              ? "#20283a"
              : "#151923"
          }
          metalness={0.45}
          roughness={0.55}
        />
      </mesh>

      {/* Front glass */}
      <mesh
        position={[
          0,
          height / 2,
          -4.53,
        ]}
      >
        <planeGeometry
          args={[
            5.5,
            height - 2,
          ]}
        />

        <meshStandardMaterial
          color="#111827"
          metalness={0.7}
          roughness={0.15}
        />
      </mesh>

      {/* Neon edge */}
      <mesh
        position={[
          -3.25,
          height / 2,
          -4.6,
        ]}
      >
        <boxGeometry
          args={[
            0.12,
            height - 1,
            0.12,
          ]}
        />

        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={
            selected
              ? 8
              : 2
          }
        />
      </mesh>

      <mesh
        position={[
          3.25,
          height / 2,
          -4.6,
        ]}
      >
        <boxGeometry
          args={[
            0.12,
            height - 1,
            0.12,
          ]}
        />

        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={
            selected
              ? 8
              : 2
          }
        />
      </mesh>

      {/* Roof beacon */}
      <Float
        speed={2}
        floatIntensity={
          0.4
        }
      >
        <mesh
          position={[
            0,
            height + 1,
            0,
          ]}
        >
          <octahedronGeometry
            args={[0.6]}
          />

          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={
              selected
                ? 8
                : 3
            }
          />
        </mesh>
      </Float>

      {selected && (
        <pointLight
          position={[
            0,
            height * 0.6,
            -6,
          ]}
          color={accent}
          intensity={45}
          distance={18}
        />
      )}

      {/* Project sign */}
      <Html
        position={[
          0,
          height * 0.72,
          -4.8,
        ]}
        center
        distanceFactor={16}
      >
        <button
          type="button"
          onClick={() =>
            selectProject(
              projectId
            )
          }
          style={{
            minWidth:
              "150px",

            padding:
              "9px 12px",

            color:
              "white",

            border:
              selected
                ? `1px solid ${accent}`
                : "1px solid rgba(255,255,255,.18)",

            background:
              "rgba(4,6,12,.82)",

            fontFamily:
              "monospace",

            fontSize:
              "9px",

            letterSpacing:
              "0.18em",

            cursor:
              "pointer",

            backdropFilter:
              "blur(10px)",
          }}
        >
          P{project.number}
          <br />

          <span
            style={{
              display:
                "inline-block",

              marginTop:
                "5px",

              color:
                selected
                  ? accent
                  : "white",
            }}
          >
            {
              project.title
            }
          </span>
        </button>
      </Html>
    </group>
  );
}

export default function ProjectCity() {
  return (
    <group>
      {/* City entrance */}

      <group
        position={[
          0,
          0,
          -390,
        ]}
      >
        {/* Left gate */}
        <mesh
          position={[
            -7.5,
            5,
            0,
          ]}
          castShadow
        >
          <boxGeometry
            args={[
              1,
              10,
              1,
            ]}
          />

          <meshStandardMaterial
            color="#111827"
            metalness={0.5}
          />
        </mesh>

        {/* Right gate */}
        <mesh
          position={[
            7.5,
            5,
            0,
          ]}
          castShadow
        >
          <boxGeometry
            args={[
              1,
              10,
              1,
            ]}
          />

          <meshStandardMaterial
            color="#111827"
            metalness={0.5}
          />
        </mesh>

        {/* Top beam */}
        <mesh
          position={[
            0,
            9.5,
            0,
          ]}
        >
          <boxGeometry
            args={[
              16,
              1,
              1,
            ]}
          />

          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={5}
          />
        </mesh>

        <Html
          position={[
            0,
            8.4,
            0,
          ]}
          center
          distanceFactor={16}
        >
          <div
            style={{
              padding:
                "8px 16px",

              color:
                "white",

              background:
                "rgba(5,7,12,.75)",

              border:
                "1px solid rgba(139,92,246,.5)",

              fontFamily:
                "monospace",

              fontSize:
                "10px",

              letterSpacing:
                "0.28em",

              whiteSpace:
                "nowrap",

              pointerEvents:
                "none",
            }}
          >
            PROJECT CITY
          </div>
        </Html>
      </group>

      {/* Project plaza */}

      <mesh
        position={[
          24,
          0.02,
          -425,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        receiveShadow
      >
        <planeGeometry
          args={[
            38,
            42,
          ]}
        />

        <meshStandardMaterial
          color="#0d1118"
          roughness={0.8}
        />
      </mesh>

      {/* Plaza neon strips */}

      {[
        9,
        15,
        21,
        27,
        33,
        39,
      ].map((x) => (
        <mesh
          key={x}
          position={[
            x,
            0.06,
            -425,
          ]}
        >
          <boxGeometry
            args={[
              0.06,
              0.04,
              35,
            ]}
          />

          <meshStandardMaterial
            color="#312e81"
            emissive="#312e81"
            emissiveIntensity={2}
          />
        </mesh>
      ))}

      <ProjectTower
        projectId="edunexus"
        position={[
          15,
          0,
          -421,
        ]}
        height={17}
        accent="#8b5cf6"
      />

      <ProjectTower
        projectId="health-api"
        position={[
          24,
          0,
          -426,
        ]}
        height={23}
        accent="#22d3ee"
      />

      <ProjectTower
        projectId="auth-system"
        position={[
          33,
          0,
          -421,
        ]}
        height={19}
        accent="#a855f7"
      />

      {/* City atmosphere */}

      <pointLight
        position={[
          24,
          12,
          -420,
        ]}
        color="#8b5cf6"
        intensity={45}
        distance={45}
      />

      <pointLight
        position={[
          30,
          8,
          -435,
        ]}
        color="#22d3ee"
        intensity={30}
        distance={35}
      />
    </group>
  );
}