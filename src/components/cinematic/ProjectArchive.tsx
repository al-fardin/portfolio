"use client";

import {
  Float,
  Html,
} from "@react-three/drei";

import {
  useJourneyStore,
} from "@/store/useJourneyStore";

import {
  getJourneyFrame,
} from "./journeyPath";

const projects = [
  {
    id: "edunexus" as const,
    number: "01",
    title: "EDUNEXUS",
    type: "FULL-STACK PLATFORM",
    description:
      "A modern interactive learning platform.",
    stack:
      "React • Node.js • MongoDB",
  },

  {
    id: "health-api" as const,
    number: "02",
    title: "HEALTH API",
    type: "GO BACKEND",
    description:
      "A lightweight backend health and status service.",
    stack:
      "Go • HTTP • REST • JSON",
  },

  {
    id: "auth-system" as const,
    number: "03",
    title: "AUTH SYSTEM",
    type: "SECURE BACKEND",
    description:
      "Registration, login, JWT verification and protected routes.",
    stack:
      "Node.js • Express • JWT",
  },
];

export default function ProjectArchive() {
  const progress =
    useJourneyStore(
      (state) =>
        state.progress
    );

  const selected =
    useJourneyStore(
      (state) =>
        state.selectedProject
    );

  const selectProject =
    useJourneyStore(
      (state) =>
        state.selectProject
    );

  if (
    progress < 0.44 ||
    progress > 0.65
  ) {
    return null;
  }

  const frame =
    getJourneyFrame(
      0.54
    );

  const center =
    frame.point.clone();

  center.y = 25;

  return (
    <group
      position={[
        center.x,
        center.y,
        center.z,
      ]}
    >
      {/* CENTRAL RINGS */}

      <Float
        speed={0.5}
        rotationIntensity={
          0.15
        }
        floatIntensity={
          0.25
        }
      >
        <mesh
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              7,
              0.05,
              12,
              96,
            ]}
          />

          <meshStandardMaterial
            color="#979b9c"
            emissive="#6b7478"
            emissiveIntensity={
              0.35
            }
          />
        </mesh>
      </Float>

      <Html
        position={[
          0,
          7,
          0,
        ]}
        center
        distanceFactor={14}
      >
        <div
          style={{
            color:
              "#dedbd4",
            textAlign:
              "center",
            pointerEvents:
              "none",
          }}
        >
          <div
            style={{
              fontFamily:
                "monospace",
              fontSize: 8,
              letterSpacing:
                ".4em",
              opacity: 0.5,
            }}
          >
            DIGITAL ARCHIVE
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            SELECTED WORK
          </div>
        </div>
      </Html>

      {projects.map(
        (
          project,
          index
        ) => {
          const x =
            (
              index -
              1
            ) * 8.5;

          const z =
            index === 1
              ? -2
              : 1.5;

          const active =
            selected ===
            project.id;

          return (
            <Float
              key={
                project.id
              }
              speed={
                0.8 +
                index * 0.1
              }
              floatIntensity={
                0.45
              }
              rotationIntensity={
                0.06
              }
            >
              <group
                position={[
                  x,
                  index === 1
                    ? 0.8
                    : 0,
                  z,
                ]}
              >
                <mesh>
                  <boxGeometry
                    args={[
                      6.5,
                      4.1,
                      0.3,
                    ]}
                  />

                  <meshStandardMaterial
                    color={
                      active
                        ? "#8c8d88"
                        : "#676b6b"
                    }
                    roughness={0.55}
                    metalness={0.12}
                  />
                </mesh>

                <Html
                  position={[
                    0,
                    0,
                    0.2,
                  ]}
                  center
                  distanceFactor={
                    10
                  }
                >
                  <button
                    type="button"
                    onClick={() =>
                      selectProject(
                        project.id
                      )
                    }
                    style={{
                      width:
                        "280px",
                      minHeight:
                        "160px",
                      padding:
                        "20px",
                      border:
                        active
                          ? "1px solid rgba(255,255,255,.55)"
                          : "1px solid rgba(255,255,255,.18)",
                      background:
                        active
                          ? "rgba(32,37,39,.9)"
                          : "rgba(32,37,39,.7)",
                      color:
                        "#eeeae1",
                      textAlign:
                        "left",
                      cursor:
                        "pointer",
                      backdropFilter:
                        "blur(10px)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily:
                          "monospace",
                        fontSize:
                          "8px",
                        opacity:
                          0.45,
                        letterSpacing:
                          ".28em",
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
                          "12px",
                        fontSize:
                          "22px",
                        fontWeight:
                          600,
                      }}
                    >
                      {
                        project.title
                      }
                    </div>

                    <div
                      style={{
                        marginTop:
                          "5px",
                        fontSize:
                          "9px",
                        letterSpacing:
                          ".18em",
                        opacity:
                          0.55,
                      }}
                    >
                      {
                        project.type
                      }
                    </div>

                    <div
                      style={{
                        marginTop:
                          "15px",
                        fontSize:
                          "11px",
                        lineHeight:
                          1.55,
                        opacity:
                          0.68,
                      }}
                    >
                      {
                        project.description
                      }
                    </div>

                    <div
                      style={{
                        marginTop:
                          "14px",
                        fontFamily:
                          "monospace",
                        fontSize:
                          "8px",
                        opacity:
                          0.45,
                      }}
                    >
                      {
                        project.stack
                      }
                    </div>
                  </button>
                </Html>
              </group>
            </Float>
          );
        }
      )}
    </group>
  );
}