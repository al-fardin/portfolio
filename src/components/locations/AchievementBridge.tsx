"use client";

import {
  Float,
  Html,
} from "@react-three/drei";

import {
  achievementMilestones,
} from "@/data/achievements";

function BridgeLamp({
  x,
  z,
}: {
  x: number;
  z: number;
}) {
  return (
    <group
      position={[x, 0, z]}
    >
      <mesh
        position={[0, 2.4, 0]}
      >
        <boxGeometry
          args={[
            0.1,
            4.8,
            0.1,
          ]}
        />

        <meshStandardMaterial
          color="#434956"
          metalness={0.7}
        />
      </mesh>

      <mesh
        position={[
          x < 0 ? 0.5 : -0.5,
          4.7,
          0,
        ]}
      >
        <sphereGeometry
          args={[
            0.18,
            16,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#ffe4b5"
          emissive="#ffe4b5"
          emissiveIntensity={5}
        />
      </mesh>

      <pointLight
        position={[
          x < 0 ? 0.5 : -0.5,
          4.5,
          0,
        ]}
        color="#ffd6a0"
        intensity={8}
        distance={11}
      />
    </group>
  );
}

export default function AchievementBridge() {
  const bridgeSections =
    Array.from({
      length: 17,
    });

  const lamps =
    Array.from({
      length: 8,
    });

  return (
    <group>
      {/* Bridge floor */}
      <mesh
        position={[
          0,
          0.16,
          -685,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[
            16,
            0.3,
            160,
          ]}
        />

        <meshStandardMaterial
          color="#11151d"
          metalness={0.15}
          roughness={0.82}
        />
      </mesh>

      {/* Left bridge rail */}

      {bridgeSections.map(
        (_, index) => {
          const z =
            -608 -
            index * 9.5;

          return (
            <group
              key={`left-${index}`}
            >
              <mesh
                position={[
                  -7.2,
                  1,
                  z,
                ]}
              >
                <boxGeometry
                  args={[
                    0.18,
                    1.8,
                    8,
                  ]}
                />

                <meshStandardMaterial
                  color="#242a35"
                  metalness={0.55}
                />
              </mesh>

              <mesh
                position={[
                  7.2,
                  1,
                  z,
                ]}
              >
                <boxGeometry
                  args={[
                    0.18,
                    1.8,
                    8,
                  ]}
                />

                <meshStandardMaterial
                  color="#242a35"
                  metalness={0.55}
                />
              </mesh>
            </group>
          );
        }
      )}

      {/* Purple rail light */}

      <mesh
        position={[
          -6.95,
          1.95,
          -685,
        ]}
      >
        <boxGeometry
          args={[
            0.08,
            0.08,
            155,
          ]}
        />

        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={5}
        />
      </mesh>

      {/* Cyan rail light */}

      <mesh
        position={[
          6.95,
          1.95,
          -685,
        ]}
      >
        <boxGeometry
          args={[
            0.08,
            0.08,
            155,
          ]}
        />

        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={5}
        />
      </mesh>

      {/* Bridge entrance */}

      <group
        position={[
          0,
          0,
          -610,
        ]}
      >
        <mesh
          position={[
            -7.3,
            5,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.7,
              10,
              0.7,
            ]}
          />

          <meshStandardMaterial
            color="#151922"
            metalness={0.6}
          />
        </mesh>

        <mesh
          position={[
            7.3,
            5,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.7,
              10,
              0.7,
            ]}
          />

          <meshStandardMaterial
            color="#151922"
            metalness={0.6}
          />
        </mesh>

        <mesh
          position={[
            0,
            9.5,
            0,
          ]}
        >
          <boxGeometry
            args={[
              15,
              0.7,
              0.7,
            ]}
          />

          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={4}
          />
        </mesh>

        <Float
          speed={1.4}
          floatIntensity={0.3}
        >
          <mesh
            position={[
              0,
              11,
              0,
            ]}
          >
            <icosahedronGeometry
              args={[
                0.8,
                0,
              ]}
            />

            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={5}
              metalness={0.6}
              roughness={0.22}
            />
          </mesh>
        </Float>

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
                "8px 18px",

              border:
                "1px solid rgba(245,158,11,.65)",

              background:
                "rgba(6,7,11,.8)",

              color:
                "white",

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
            ACHIEVEMENT BRIDGE
          </div>
        </Html>
      </group>

      {/* Lamps */}

      {lamps.map(
        (_, index) => {
          const z =
            -625 -
            index * 18;

          return (
            <group
              key={index}
            >
              <BridgeLamp
                x={-7.8}
                z={z}
              />

              <BridgeLamp
                x={7.8}
                z={
                  z - 8
                }
              />
            </group>
          );
        }
      )}

      {/* Achievement monuments */}

      {achievementMilestones.map(
        (achievement) => {
          const x =
            achievement.side ===
            "left"
              ? -10
              : 10;

          return (
            <group
              key={
                achievement.id
              }
              position={[
                x,
                0,
                achievement.z,
              ]}
            >
              {/* Monument */}
              <mesh
                position={[
                  0,
                  3.5,
                  0,
                ]}
                castShadow
              >
                <cylinderGeometry
                  args={[
                    1.6,
                    2.2,
                    7,
                    8,
                  ]}
                />

                <meshStandardMaterial
                  color="#151a24"
                  metalness={0.55}
                  roughness={0.3}
                />
              </mesh>

              {/* Trophy core */}
              <Float
                speed={2}
                rotationIntensity={
                  0.4
                }
                floatIntensity={
                  0.45
                }
              >
                <mesh
                  position={[
                    0,
                    8,
                    0,
                  ]}
                >
                  <octahedronGeometry
                    args={[
                      1,
                      0,
                    ]}
                  />

                  <meshStandardMaterial
                    color={
                      achievement.color
                    }
                    emissive={
                      achievement.color
                    }
                    emissiveIntensity={
                      6
                    }
                    metalness={
                      0.45
                    }
                    roughness={
                      0.2
                    }
                  />
                </mesh>
              </Float>

              {/* Vertical energy */}
              <mesh
                position={[
                  0,
                  5.4,
                  0,
                ]}
              >
                <cylinderGeometry
                  args={[
                    0.08,
                    0.08,
                    4,
                    16,
                  ]}
                />

                <meshStandardMaterial
                  color={
                    achievement.color
                  }
                  emissive={
                    achievement.color
                  }
                  emissiveIntensity={
                    7
                  }
                  transparent
                  opacity={0.65}
                />
              </mesh>

              <pointLight
                position={[
                  0,
                  6,
                  0,
                ]}
                color={
                  achievement.color
                }
                intensity={28}
                distance={18}
              />

              <Html
                position={[
                  0,
                  4,
                  0,
                ]}
                center
                distanceFactor={15}
              >
                <div
                  style={{
                    minWidth:
                      "160px",

                    padding:
                      "11px 13px",

                    background:
                      "rgba(5,7,12,.8)",

                    border: `1px solid ${achievement.color}`,

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
                        "8px",

                      opacity:
                        0.45,

                      letterSpacing:
                        "0.2em",
                    }}
                  >
                    CORE{" "}
                    {
                      achievement.number
                    }
                  </div>

                  <div
                    style={{
                      marginTop:
                        "6px",

                      color:
                        achievement.color,

                      fontWeight:
                        700,

                      fontSize:
                        "10px",

                      letterSpacing:
                        "0.15em",
                    }}
                  >
                    {
                      achievement.title
                    }
                  </div>
                </div>
              </Html>
            </group>
          );
        }
      )}

      {/* Bridge end portal */}

      <group
        position={[
          0,
          0,
          -755,
        ]}
      >
        <mesh
          position={[
            -7.2,
            5,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.5,
              10,
              0.5,
            ]}
          />

          <meshStandardMaterial
            color="#171b25"
            metalness={0.5}
          />
        </mesh>

        <mesh
          position={[
            7.2,
            5,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.5,
              10,
              0.5,
            ]}
          />

          <meshStandardMaterial
            color="#171b25"
            metalness={0.5}
          />
        </mesh>

        <mesh
          position={[
            0,
            9.5,
            0,
          ]}
        >
          <boxGeometry
            args={[
              15,
              0.5,
              0.5,
            ]}
          />

          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={5}
          />
        </mesh>
      </group>

      {/* Bridge atmosphere */}

      <pointLight
        position={[
          0,
          8,
          -680,
        ]}
        color="#8b5cf6"
        intensity={30}
        distance={80}
      />

      <pointLight
        position={[
          0,
          6,
          -735,
        ]}
        color="#22d3ee"
        intensity={25}
        distance={60}
      />
    </group>
  );
}