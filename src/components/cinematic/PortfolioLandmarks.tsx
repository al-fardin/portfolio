"use client";

import {
  Html,
} from "@react-three/drei";

import {
  getJourneyFrame,
} from "./journeyPath";

function LandmarkGroup({
  t,
  side,
  offset,
  children,
}: {
  t: number;
  side: -1 | 1;
  offset: number;
  children:
    React.ReactNode;
}) {
  const frame =
    getJourneyFrame(t);

  const position =
    frame.point
      .clone()
      .addScaledVector(
        frame.normal,
        side * offset
      );

  return (
    <group
      position={[
        position.x,
        0,
        position.z,
      ]}
      rotation={[
        0,
        frame.roadYaw,
        0,
      ]}
    >
      {children}
    </group>
  );
}

export default function PortfolioLandmarks() {
  return (
    <group>
      {/* ================= */}
      {/* ABOUT */}
      {/* ================= */}

      <LandmarkGroup
        t={0.18}
        side={-1}
        offset={12}
      >
        <mesh
          position={[
            0,
            4.4,
            0,
          ]}
          castShadow
        >
          <boxGeometry
            args={[
              1.1,
              8.8,
              13,
            ]}
          />

          <meshStandardMaterial
            color="#a39e94"
            roughness={0.86}
          />
        </mesh>

        <mesh
          position={[
            0.58,
            4.6,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.08,
              5,
              9.5,
            ]}
          />

          <meshStandardMaterial
            color="#34444b"
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>

        <Html
          position={[
            0.72,
            5,
            0,
          ]}
          rotation={[
            0,
            Math.PI / 2,
            0,
          ]}
          center
          distanceFactor={10}
        >
          <div
            style={{
              width: 300,
              color:
                "#ece8df",
              textAlign:
                "left",
              pointerEvents:
                "none",
            }}
          >
            <div
              style={{
                fontFamily:
                  "monospace",
                fontSize: 9,
                letterSpacing:
                  ".32em",
                opacity: 0.48,
              }}
            >
              CHAPTER 01
            </div>

            <div
              style={{
                marginTop: 15,
                fontSize: 34,
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing:
                  "-.04em",
              }}
            >
              HELLO,
              <br />
              I&apos;M FARDIN.
            </div>

            <div
              style={{
                width: 42,
                height: 2,
                margin:
                  "18px 0",
                background:
                  "#a77c5b",
              }}
            />

            <div
              style={{
                maxWidth: 250,
                fontSize: 11,
                lineHeight: 1.65,
                opacity: 0.62,
              }}
            >
              I build software,
              systems and
              interactive digital
              experiences.
            </div>
          </div>
        </Html>
      </LandmarkGroup>

      {/* ================= */}
      {/* SKILLS */}
      {/* ================= */}

      <LandmarkGroup
        t={0.34}
        side={1}
        offset={13}
      >
        {[
          {
            z: -5,
            h: 10,
            title:
              "C++ / JAVA",
          },
          {
            z: 0,
            h: 13,
            title:
              "REACT / NODE",
          },
          {
            z: 5,
            h: 9,
            title:
              "GO / AI",
          },
        ].map(
          (
            item,
            index
          ) => (
            <group
              key={index}
              position={[
                0,
                0,
                item.z,
              ]}
            >
              <mesh
                position={[
                  0,
                  item.h /
                    2,
                  0,
                ]}
                castShadow
              >
                <boxGeometry
                  args={[
                    1.3,
                    item.h,
                    3.2,
                  ]}
                />

                <meshStandardMaterial
                  color={
                    index === 1
                      ? "#827e76"
                      : "#9c978e"
                  }
                  roughness={0.85}
                />
              </mesh>

              <Html
                position={[
                  -0.72,
                  item.h *
                    0.62,
                  0,
                ]}
                rotation={[
                  0,
                  -Math.PI /
                    2,
                  0,
                ]}
                center
                distanceFactor={
                  9
                }
              >
                <div
                  style={{
                    color:
                      "#272d30",
                    width: 150,
                    fontFamily:
                      "monospace",
                    fontSize:
                      "9px",
                    fontWeight:
                      600,
                    letterSpacing:
                      ".15em",
                    pointerEvents:
                      "none",
                  }}
                >
                  {
                    item.title
                  }
                </div>
              </Html>
            </group>
          )
        )}
      </LandmarkGroup>

      {/* ================= */}
      {/* PROJECT PORTAL */}
      {/* ================= */}

      <LandmarkGroup
        t={0.465}
        side={1}
        offset={0}
      >
        <mesh
          position={[
            -6.4,
            4.5,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.8,
              9,
              1.4,
            ]}
          />

          <meshStandardMaterial
            color="#77736c"
            roughness={0.8}
          />
        </mesh>

        <mesh
          position={[
            6.4,
            4.5,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.8,
              9,
              1.4,
            ]}
          />

          <meshStandardMaterial
            color="#77736c"
            roughness={0.8}
          />
        </mesh>

        <mesh
          position={[
            0,
            8.6,
            0,
          ]}
        >
          <boxGeometry
            args={[
              13.5,
              0.8,
              1.4,
            ]}
          />

          <meshStandardMaterial
            color="#77736c"
            roughness={0.8}
          />
        </mesh>

        <Html
          position={[
            0,
            7.3,
            0,
          ]}
          center
          distanceFactor={13}
        >
          <div
            style={{
              color:
                "#252a2d",
              fontFamily:
                "monospace",
              fontSize:
                "9px",
              letterSpacing:
                ".3em",
              whiteSpace:
                "nowrap",
              pointerEvents:
                "none",
            }}
          >
            PROJECT ARCHIVE
          </div>
        </Html>
      </LandmarkGroup>

      {/* ================= */}
      {/* EXPERIENCE */}
      {/* ================= */}

      {[0.67, 0.72, 0.77].map(
        (
          t,
          index
        ) => (
          <LandmarkGroup
            key={t}
            t={t}
            side={
              index % 2 ===
              0
                ? -1
                : 1
            }
            offset={10.5}
          >
            <mesh
              position={[
                0,
                3.5,
                0,
              ]}
            >
              <boxGeometry
                args={[
                  0.75,
                  7,
                  4,
                ]}
              />

              <meshStandardMaterial
                color="#88837b"
                roughness={0.84}
              />
            </mesh>

            <Html
              position={[
                index %
                    2 ===
                  0
                  ? 0.48
                  : -0.48,
                4,
                0,
              ]}
              rotation={[
                0,
                index %
                    2 ===
                  0
                  ? Math.PI /
                    2
                  : -Math.PI /
                    2,
                0,
              ]}
              center
              distanceFactor={
                10
              }
            >
              <div
                style={{
                  color:
                    "#252b2e",
                  width:
                    "180px",
                  fontFamily:
                    "monospace",
                  pointerEvents:
                    "none",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "8px",
                    letterSpacing:
                      ".3em",
                    opacity:
                      0.45,
                  }}
                >
                  MILESTONE{" "}
                  0
                  {index + 1}
                </div>

                <div
                  style={{
                    marginTop:
                      8,
                    fontSize:
                      "13px",
                    fontWeight:
                      600,
                  }}
                >
                  {
                    [
                      "FOUNDATION",
                      "BUILD",
                      "SHIP",
                    ][index]
                  }
                </div>
              </div>
            </Html>
          </LandmarkGroup>
        )
      )}

      {/* ================= */}
      {/* ACHIEVEMENT FRAME */}
      {/* ================= */}

      <LandmarkGroup
        t={0.84}
        side={1}
        offset={0}
      >
        <mesh
          position={[
            -6.1,
            3.8,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.35,
              7.6,
              0.6,
            ]}
          />

          <meshStandardMaterial
            color="#5d6464"
            metalness={0.4}
            roughness={0.5}
          />
        </mesh>

        <mesh
          position={[
            6.1,
            3.8,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.35,
              7.6,
              0.6,
            ]}
          />

          <meshStandardMaterial
            color="#5d6464"
            metalness={0.4}
            roughness={0.5}
          />
        </mesh>

        <mesh
          position={[
            0,
            7.4,
            0,
          ]}
        >
          <boxGeometry
            args={[
              12.5,
              0.35,
              0.6,
            ]}
          />

          <meshStandardMaterial
            color="#5d6464"
            metalness={0.4}
            roughness={0.5}
          />
        </mesh>

        <Html
          position={[
            0,
            6.3,
            0,
          ]}
          center
          distanceFactor={13}
        >
          <div
            style={{
              color:
                "#dcd8cf",
              fontFamily:
                "monospace",
              fontSize:
                "9px",
              letterSpacing:
                ".28em",
              pointerEvents:
                "none",
            }}
          >
            ACHIEVEMENTS
          </div>
        </Html>
      </LandmarkGroup>

      {/* ================= */}
      {/* CONTACT */}
      {/* ================= */}

      <LandmarkGroup
        t={0.96}
        side={1}
        offset={13}
      >
        <mesh
          position={[
            0,
            8,
            0,
          ]}
        >
          <boxGeometry
            args={[
              1.2,
              16,
              14,
            ]}
          />

          <meshStandardMaterial
            color="#55636a"
            roughness={0.5}
            metalness={0.18}
          />
        </mesh>

        <Html
          position={[
            -0.7,
            8.5,
            0,
          ]}
          rotation={[
            0,
            -Math.PI / 2,
            0,
          ]}
          center
          distanceFactor={12}
        >
          <div
            style={{
              width: 320,
              color:
                "#e6e2da",
              textAlign:
                "left",
              pointerEvents:
                "auto",
            }}
          >
            <div
              style={{
                fontFamily:
                  "monospace",
                fontSize: 8,
                letterSpacing:
                  ".3em",
                opacity: 0.5,
              }}
            >
              FINAL CHAPTER
            </div>

            <div
              style={{
                marginTop: 14,
                fontSize: 31,
                fontWeight: 600,
                lineHeight: 1.05,
              }}
            >
              LET&apos;S BUILD
              <br />
              SOMETHING GREAT.
            </div>

            <div
              style={{
                marginTop: 18,
                fontFamily:
                  "monospace",
                fontSize: 9,
                lineHeight: 2,
                opacity: 0.72,
              }}
            >
              GITHUB
              <br />
              LINKEDIN
              <br />
              EMAIL
            </div>
          </div>
        </Html>
      </LandmarkGroup>
    </group>
  );
}