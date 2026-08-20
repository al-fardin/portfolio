"use client";

import {
  Float,
  Html,
} from "@react-three/drei";

import {
  experienceMilestones,
} from "@/data/experience";

function RoadLamp({
  x,
  z,
}: {
  x: number;
  z: number;
}) {
  return (
    <group
      position={[
        x,
        0,
        z,
      ]}
    >
      <mesh
        position={[
          0,
          2.6,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.08,
            5.2,
            0.08,
          ]}
        />

        <meshStandardMaterial
          color="#444b55"
          metalness={0.6}
        />
      </mesh>

      <mesh
        position={[
          x < 0
            ? 0.65
            : -0.65,
          5.1,
          0,
        ]}
      >
        <boxGeometry
          args={[
            1.3,
            0.08,
            0.08,
          ]}
        />

        <meshStandardMaterial
          color="#555b66"
          metalness={0.7}
        />
      </mesh>

      <pointLight
        position={[
          x < 0
            ? 0.65
            : -0.65,
          4.9,
          0,
        ]}
        color="#ffd6a0"
        intensity={7}
        distance={12}
      />
    </group>
  );
}

export default function ExperienceHighway() {
  const lamps =
    Array.from({
      length: 8,
    });

  return (
    <group>
      {/* Highway entrance */}
      <group
        position={[
          0,
          0,
          -447,
        ]}
      >
        <mesh
          position={[
            -7.5,
            4.2,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.4,
              8.4,
              0.4,
            ]}
          />

          <meshStandardMaterial
            color="#191d26"
            metalness={0.5}
          />
        </mesh>

        <mesh
          position={[
            7.5,
            4.2,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.4,
              8.4,
              0.4,
            ]}
          />

          <meshStandardMaterial
            color="#191d26"
            metalness={0.5}
          />
        </mesh>

        <mesh
          position={[
            0,
            7.8,
            0,
          ]}
        >
          <boxGeometry
            args={[
              15.4,
              0.4,
              0.4,
            ]}
          />

          <meshStandardMaterial
            color="#f97316"
            emissive="#f97316"
            emissiveIntensity={3}
          />
        </mesh>

        <Html
          position={[
            0,
            7,
            0,
          ]}
          center
          distanceFactor={16}
        >
          <div
            style={{
              padding:
                "8px 18px",

              color:
                "white",

              background:
                "rgba(8,6,10,.78)",

              border:
                "1px solid rgba(249,115,22,.55)",

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
            EXPERIENCE HIGHWAY
          </div>
        </Html>
      </group>

      {/* Highway lamps */}
      {lamps.map(
        (_, index) => {
          const z =
            -462 -
            index * 16;

          return (
            <group
              key={index}
            >
              <RoadLamp
                x={-8}
                z={z}
              />

              <RoadLamp
                x={8}
                z={
                  z - 7
                }
              />
            </group>
          );
        }
      )}

      {/* Career milestones */}
      {experienceMilestones.map(
        (milestone) => {
          const x =
            milestone.side ===
            "left"
              ? -10
              : 10;

          return (
            <group
              key={
                milestone.id
              }
              position={[
                x,
                0,
                milestone.z,
              ]}
            >
              {/* Pillar */}
              <mesh
                position={[
                  0,
                  3.6,
                  0,
                ]}
                castShadow
              >
                <boxGeometry
                  args={[
                    1.2,
                    7.2,
                    1.2,
                  ]}
                />

                <meshStandardMaterial
                  color="#171b25"
                  metalness={
                    0.45
                  }
                  roughness={
                    0.4
                  }
                />
              </mesh>

              {/* Neon */}
              <mesh
                position={[
                  milestone.side ===
                  "left"
                    ? 0.63
                    : -0.63,
                  3.6,
                  0,
                ]}
              >
                <boxGeometry
                  args={[
                    0.08,
                    6.5,
                    0.08,
                  ]}
                />

                <meshStandardMaterial
                  color={
                    milestone.color
                  }
                  emissive={
                    milestone.color
                  }
                  emissiveIntensity={
                    6
                  }
                />
              </mesh>

              <Float
                speed={1.5}
                floatIntensity={
                  0.35
                }
              >
                <mesh
                  position={[
                    0,
                    7.8,
                    0,
                  ]}
                >
                  <octahedronGeometry
                    args={[
                      0.65,
                    ]}
                  />

                  <meshStandardMaterial
                    color={
                      milestone.color
                    }
                    emissive={
                      milestone.color
                    }
                    emissiveIntensity={
                      5
                    }
                  />
                </mesh>
              </Float>

              <pointLight
                position={[
                  0,
                  5,
                  0,
                ]}
                color={
                  milestone.color
                }
                intensity={18}
                distance={14}
              />

              <Html
                position={[
                  0,
                  5,
                  0,
                ]}
                center
                distanceFactor={16}
              >
                <div
                  style={{
                    minWidth:
                      "150px",

                    padding:
                      "10px 12px",

                    background:
                      "rgba(4,6,10,.78)",

                    border: `1px solid ${milestone.color}`,

                    color:
                      "white",

                    fontFamily:
                      "monospace",

                    textAlign:
                      "center",

                    pointerEvents:
                      "none",
                  }}
                >
                  <div
                    style={{
                      fontSize:
                        "18px",

                      fontWeight:
                        700,

                      color:
                        milestone.color,
                    }}
                  >
                    {
                      milestone.year
                    }
                  </div>

                  <div
                    style={{
                      marginTop:
                        "5px",

                      fontSize:
                        "8px",

                      letterSpacing:
                        "0.18em",
                    }}
                  >
                    {
                      milestone.title
                    }
                  </div>
                </div>
              </Html>
            </group>
          );
        }
      )}

      {/* Warm highway glow */}
      <pointLight
        position={[
          0,
          8,
          -520,
        ]}
        color="#fb923c"
        intensity={25}
        distance={100}
      />

      <pointLight
        position={[
          -20,
          8,
          -560,
        ]}
        color="#a855f7"
        intensity={20}
        distance={60}
      />
    </group>
  );
}