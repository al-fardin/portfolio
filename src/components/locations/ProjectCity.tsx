"use client";

import {
  Float,
  Html,
  RoundedBox,
} from "@react-three/drei";

import * as THREE from "three";

import {
  projects,
} from "@/data/projects";

import type {
  ProjectId,
} from "@/data/projects";

import {
  useGameStore,
} from "@/store/useGameStore";

type ProjectTowerProps = {
  projectId: ProjectId;

  position: [
    number,
    number,
    number
  ];

  height: number;

  accent: string;

  secondary: string;
};

function ProjectTower({
  projectId,
  position,
  height,
  accent,
  secondary,
}: ProjectTowerProps) {
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

  const floors =
    Array.from({
      length: 7,
    });

  return (
    <group
      position={position}
    >
      {/* ===================== */}
      {/* FOUNDATION PLATFORM */}
      {/* ===================== */}

      <RoundedBox
        args={[
          9,
          0.7,
          12,
        ]}
        radius={0.35}
        smoothness={5}
        position={[
          0,
          0.35,
          0,
        ]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#0b1018"
          metalness={0.4}
          roughness={0.55}
        />
      </RoundedBox>

      {/* Selected ground halo */}

      {selected && (
        <mesh
          position={[
            0,
            0.73,
            0,
          ]}
          rotation={[
            -Math.PI /
              2,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              4.5,
              0.07,
              16,
              64,
            ]}
          />

          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={
              6
            }
          />
        </mesh>
      )}

      {/* ===================== */}
      {/* MAIN CENTRAL CORE */}
      {/* ===================== */}

      <RoundedBox
        args={[
          5.6,
          height,
          7,
        ]}
        radius={0.4}
        smoothness={6}
        position={[
          0,
          height / 2 +
            0.7,
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
        <meshStandardMaterial
          color={
            selected
              ? "#202a3b"
              : "#121923"
          }
          metalness={0.72}
          roughness={0.23}
        />
      </RoundedBox>

      {/* ===================== */}
      {/* SIDE WING LEFT */}
      {/* ===================== */}

      <RoundedBox
        args={[
          1.4,
          height * 0.72,
          7.8,
        ]}
        radius={0.22}
        smoothness={4}
        position={[
          -3.4,
          height *
            0.36 +
            0.7,
          0.5,
        ]}
        castShadow
      >
        <meshStandardMaterial
          color="#101827"
          metalness={0.68}
          roughness={0.28}
        />
      </RoundedBox>

      {/* ===================== */}
      {/* SIDE WING RIGHT */}
      {/* ===================== */}

      <RoundedBox
        args={[
          1.4,
          height * 0.84,
          7.8,
        ]}
        radius={0.22}
        smoothness={4}
        position={[
          3.4,
          height *
            0.42 +
            0.7,
          0.5,
        ]}
        castShadow
      >
        <meshStandardMaterial
          color="#111b2b"
          metalness={0.68}
          roughness={0.28}
        />
      </RoundedBox>

      {/* ===================== */}
      {/* FRONT GLASS */}
      {/* ===================== */}

      <mesh
        position={[
          0,
          height / 2 +
            0.7,
          3.53,
        ]}
      >
        <planeGeometry
          args={[
            4.7,
            height *
              0.86,
          ]}
        />

        <meshStandardMaterial
          color="#071626"
          emissive="#071827"
          emissiveIntensity={
            selected
              ? 1.3
              : 0.45
          }
          metalness={0.9}
          roughness={0.06}
          side={
            THREE.DoubleSide
          }
        />
      </mesh>

      {/* ===================== */}
      {/* FLOOR LIGHTS */}
      {/* ===================== */}

      {floors.map(
        (_, index) => {
          const y =
            2.5 +
            index *
              (
                (
                  height -
                  4
                ) /
                7
              );

          return (
            <mesh
              key={index}
              position={[
                0,
                y,
                3.57,
              ]}
            >
              <boxGeometry
                args={[
                  4.25,
                  0.07,
                  0.05,
                ]}
              />

              <meshStandardMaterial
                color={
                  index % 2 ===
                  0
                    ? accent
                    : secondary
                }
                emissive={
                  index % 2 ===
                  0
                    ? accent
                    : secondary
                }
                emissiveIntensity={
                  selected
                    ? 4
                    : 1.2
                }
              />
            </mesh>
          );
        }
      )}

      {/* ===================== */}
      {/* VERTICAL EDGE LIGHTS */}
      {/* ===================== */}

      <mesh
        position={[
          -2.65,
          height / 2 +
            0.7,
          3.65,
        ]}
      >
        <boxGeometry
          args={[
            0.1,
            height *
              0.9,
            0.1,
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
          2.65,
          height / 2 +
            0.7,
          3.65,
        ]}
      >
        <boxGeometry
          args={[
            0.1,
            height *
              0.9,
            0.1,
          ]}
        />

        <meshStandardMaterial
          color={secondary}
          emissive={secondary}
          emissiveIntensity={
            selected
              ? 8
              : 2
          }
        />
      </mesh>

      {/* ===================== */}
      {/* ROOFTOP CROWN */}
      {/* ===================== */}

      <RoundedBox
        args={[
          4,
          1.3,
          5,
        ]}
        radius={0.25}
        smoothness={5}
        position={[
          0,
          height + 1.4,
          0,
        ]}
      >
        <meshStandardMaterial
          color="#1d2636"
          metalness={0.78}
          roughness={0.2}
        />
      </RoundedBox>

      {/* ===================== */}
      {/* ENERGY CORE */}
      {/* ===================== */}

      <Float
        speed={
          selected
            ? 2.2
            : 1.3
        }
        rotationIntensity={
          selected
            ? 0.7
            : 0.25
        }
        floatIntensity={
          selected
            ? 0.7
            : 0.25
        }
      >
        <mesh
          position={[
            0,
            height + 4,
            0,
          ]}
        >
          <icosahedronGeometry
            args={[
              0.8,
              1,
            ]}
          />

          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={
              selected
                ? 8
                : 3
            }
            metalness={0.55}
            roughness={0.15}
          />
        </mesh>
      </Float>

      {/* Energy beam */}

      {selected && (
        <mesh
          position={[
            0,
            height + 7,
            0,
          ]}
        >
          <cylinderGeometry
            args={[
              0.055,
              0.055,
              6,
              12,
            ]}
          />

          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={
              8
            }
            transparent
            opacity={0.55}
          />
        </mesh>
      )}

      {/* ===================== */}
      {/* PROJECT SIGN */}
      {/* ===================== */}

      <Html
        position={[
          0,
          height *
            0.63,
          3.8,
        ]}
        center
        distanceFactor={17}
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
              "170px",

            padding:
              "11px 14px",

            border:
              selected
                ? `1px solid ${accent}`
                : "1px solid rgba(255,255,255,.15)",

            background:
              selected
                ? "rgba(5,8,15,.9)"
                : "rgba(5,8,15,.72)",

            color:
              "white",

            fontFamily:
              "monospace",

            cursor:
              "pointer",

            backdropFilter:
              "blur(12px)",

            boxShadow:
              selected
                ? `0 0 30px ${accent}30`
                : "none",
          }}
        >
          <div
            style={{
              fontSize:
                "8px",

              opacity:
                0.4,

              letterSpacing:
                "0.25em",
            }}
          >
            PROJECT{" "}
            {
              project.number
            }
          </div>

          <div
            style={{
              marginTop:
                "7px",

              fontSize:
                "11px",

              fontWeight:
                700,

              letterSpacing:
                "0.16em",

              color:
                selected
                  ? accent
                  : "white",
            }}
          >
            {
              project.title
            }
          </div>
        </button>
      </Html>

      {/* ===================== */}
      {/* SELECTED LIGHT */}
      {/* ===================== */}

      {selected && (
        <pointLight
          position={[
            0,
            height *
              0.55,
            6,
          ]}
          color={accent}
          intensity={45}
          distance={24}
        />
      )}
    </group>
  );
}

function ProjectCityGateway() {
  return (
    <group
      position={[
        0,
        0,
        -390,
      ]}
    >
      {/* Massive columns */}

      <RoundedBox
        args={[
          1.4,
          13,
          1.4,
        ]}
        radius={0.25}
        smoothness={4}
        position={[
          -8,
          6.5,
          0,
        ]}
      >
        <meshStandardMaterial
          color="#111827"
          metalness={0.7}
          roughness={0.22}
        />
      </RoundedBox>

      <RoundedBox
        args={[
          1.4,
          13,
          1.4,
        ]}
        radius={0.25}
        smoothness={4}
        position={[
          8,
          6.5,
          0,
        ]}
      >
        <meshStandardMaterial
          color="#111827"
          metalness={0.7}
          roughness={0.22}
        />
      </RoundedBox>

      {/* Top bridge */}

      <RoundedBox
        args={[
          17,
          1.2,
          1.5,
        ]}
        radius={0.25}
        smoothness={4}
        position={[
          0,
          12,
          0,
        ]}
      >
        <meshStandardMaterial
          color="#151d2b"
          metalness={0.75}
          roughness={0.18}
        />
      </RoundedBox>

      {/* Neon underside */}

      <mesh
        position={[
          0,
          11.35,
          0,
        ]}
      >
        <boxGeometry
          args={[
            14.8,
            0.08,
            0.25,
          ]}
        />

        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={8}
        />
      </mesh>

      {/* Top floating logo */}

      <Float
        speed={1.5}
        rotationIntensity={
          0.45
        }
        floatIntensity={
          0.4
        }
      >
        <mesh
          position={[
            0,
            14.5,
            0,
          ]}
        >
          <octahedronGeometry
            args={[
              0.75,
            ]}
          />

          <meshStandardMaterial
            color="#a855f7"
            emissive="#8b5cf6"
            emissiveIntensity={
              6
            }
          />
        </mesh>
      </Float>

      <Html
        position={[
          0,
          10.6,
          0,
        ]}
        center
        distanceFactor={18}
      >
        <div
          style={{
            padding:
              "9px 20px",

            background:
              "rgba(4,6,12,.82)",

            border:
              "1px solid rgba(139,92,246,.65)",

            color:
              "white",

            fontFamily:
              "monospace",

            fontSize:
              "10px",

            letterSpacing:
              "0.32em",

            whiteSpace:
              "nowrap",

            pointerEvents:
              "none",

            backdropFilter:
              "blur(12px)",
          }}
        >
          PROJECT CITY
        </div>
      </Html>
    </group>
  );
}

export default function ProjectCity() {
  return (
    <group>
      {/* ===================== */}
      {/* CITY GATE */}
      {/* ===================== */}

      <ProjectCityGateway />

      {/* ===================== */}
      {/* MAIN PLAZA */}
      {/* ===================== */}

      <RoundedBox
        args={[
          40,
          0.4,
          48,
        ]}
        radius={0.4}
        smoothness={5}
        position={[
          24,
          0.2,
          -425,
        ]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#080d15"
          roughness={0.62}
          metalness={0.25}
        />
      </RoundedBox>

      {/* Plaza glowing lanes */}

      {[
        10,
        16,
        22,
        28,
        34,
        40,
      ].map(
        (
          x,
          index
        ) => (
          <mesh
            key={x}
            position={[
              x,
              0.43,
              -425,
            ]}
          >
            <boxGeometry
              args={[
                0.05,
                0.03,
                42,
              ]}
            />

            <meshStandardMaterial
              color={
                index %
                  2 ===
                0
                  ? "#8b5cf6"
                  : "#22d3ee"
              }
              emissive={
                index %
                  2 ===
                0
                  ? "#8b5cf6"
                  : "#22d3ee"
              }
              emissiveIntensity={
                2
              }
            />
          </mesh>
        )
      )}

      {/* ===================== */}
      {/* PROJECT TOWERS */}
      {/* ===================== */}

      <ProjectTower
        projectId="edunexus"
        position={[
          14,
          0,
          -423,
        ]}
        height={20}
        accent="#8b5cf6"
        secondary="#c084fc"
      />

      <ProjectTower
        projectId="health-api"
        position={[
          24,
          0,
          -430,
        ]}
        height={28}
        accent="#22d3ee"
        secondary="#67e8f9"
      />

      <ProjectTower
        projectId="auth-system"
        position={[
          34,
          0,
          -423,
        ]}
        height={23}
        accent="#a855f7"
        secondary="#818cf8"
      />

      {/* ===================== */}
      {/* CENTRAL CITY CORE */}
      {/* ===================== */}

      <Float
        speed={1.1}
        rotationIntensity={
          0.7
        }
        floatIntensity={
          0.35
        }
      >
        <mesh
          position={[
            24,
            6,
            -407,
          ]}
        >
          <torusKnotGeometry
            args={[
              1.2,
              0.18,
              80,
              12,
            ]}
          />

          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={
              4
            }
            metalness={0.55}
            roughness={0.16}
          />
        </mesh>
      </Float>

      {/* City ambient lights */}

      <pointLight
        position={[
          24,
          12,
          -420,
        ]}
        color="#8b5cf6"
        intensity={35}
        distance={50}
      />

      <pointLight
        position={[
          28,
          9,
          -438,
        ]}
        color="#22d3ee"
        intensity={25}
        distance={40}
      />
    </group>
  );
}