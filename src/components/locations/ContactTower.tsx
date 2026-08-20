"use client";

import {
  Float,
  Html,
} from "@react-three/drei";

export default function ContactTower() {
  return (
    <group>
      {/* Final plaza */}

      <mesh
        position={[
          0,
          0.04,
          -900,
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
            55,
            70,
          ]}
        />

        <meshStandardMaterial
          color="#090d14"
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>

      {/* Plaza neon lines */}

      {[-12, -6, 0, 6, 12].map(
        (x) => (
          <mesh
            key={x}
            position={[
              x,
              0.08,
              -900,
            ]}
          >
            <boxGeometry
              args={[
                0.05,
                0.03,
                55,
              ]}
            />

            <meshStandardMaterial
              color="#0e7490"
              emissive="#22d3ee"
              emissiveIntensity={
                2
              }
            />
          </mesh>
        )
      )}

      {/* Tower main body */}

      <group
        position={[
          0,
          0,
          -925,
        ]}
      >
        <mesh
          position={[
            0,
            18,
            0,
          ]}
          castShadow
          receiveShadow
        >
          <boxGeometry
            args={[
              13,
              36,
              13,
            ]}
          />

          <meshStandardMaterial
            color="#101622"
            metalness={0.65}
            roughness={0.28}
          />
        </mesh>

        {/* Front glass */}

        <mesh
          position={[
            0,
            18,
            6.53,
          ]}
        >
          <planeGeometry
            args={[
              10,
              31,
            ]}
          />

          <meshStandardMaterial
            color="#07131c"
            emissive="#062b3a"
            emissiveIntensity={
              1.4
            }
            metalness={0.85}
            roughness={0.12}
          />
        </mesh>

        {/* Left cyan edge */}

        <mesh
          position={[
            -6.25,
            18,
            6.65,
          ]}
        >
          <boxGeometry
            args={[
              0.15,
              34,
              0.15,
            ]}
          />

          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={
              8
            }
          />
        </mesh>

        {/* Right purple edge */}

        <mesh
          position={[
            6.25,
            18,
            6.65,
          ]}
        >
          <boxGeometry
            args={[
              0.15,
              34,
              0.15,
            ]}
          />

          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={
              8
            }
          />
        </mesh>

        {/* Horizontal tower lights */}

        {[
          6,
          12,
          18,
          24,
          30,
        ].map((y) => (
          <mesh
            key={y}
            position={[
              0,
              y,
              6.68,
            ]}
          >
            <boxGeometry
              args={[
                11,
                0.08,
                0.08,
              ]}
            />

            <meshStandardMaterial
              color="#164e63"
              emissive="#22d3ee"
              emissiveIntensity={
                2
              }
            />
          </mesh>
        ))}

        {/* Roof */}

        <mesh
          position={[
            0,
            36.5,
            0,
          ]}
        >
          <cylinderGeometry
            args={[
              4,
              6,
              2,
              8,
            ]}
          />

          <meshStandardMaterial
            color="#151b28"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* Energy beam */}

        <mesh
          position={[
            0,
            46,
            0,
          ]}
        >
          <cylinderGeometry
            args={[
              0.12,
              0.12,
              18,
              16,
            ]}
          />

          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={
              8
            }
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Floating tower core */}

        <Float
          speed={1.8}
          rotationIntensity={
            0.45
          }
          floatIntensity={
            0.6
          }
        >
          <mesh
            position={[
              0,
              57,
              0,
            ]}
          >
            <icosahedronGeometry
              args={[
                1.4,
                1,
              ]}
            />

            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={
                7
              }
              metalness={0.45}
              roughness={0.12}
            />
          </mesh>
        </Float>

        <pointLight
          position={[
            0,
            33,
            8,
          ]}
          color="#22d3ee"
          intensity={55}
          distance={45}
        />

        <pointLight
          position={[
            0,
            16,
            10,
          ]}
          color="#8b5cf6"
          intensity={30}
          distance={35}
        />

        {/* Tower title */}

        <Html
          position={[
            0,
            27,
            6.9,
          ]}
          center
          distanceFactor={20}
        >
          <div
            style={{
              minWidth:
                "220px",

              padding:
                "12px 18px",

              color:
                "white",

              background:
                "rgba(3,7,12,.82)",

              border:
                "1px solid rgba(34,211,238,.6)",

              fontFamily:
                "monospace",

              fontSize:
                "11px",

              textAlign:
                "center",

              letterSpacing:
                "0.3em",

              pointerEvents:
                "none",

              backdropFilter:
                "blur(12px)",
            }}
          >
            CONTACT TOWER

            <div
              style={{
                marginTop:
                  "6px",

                fontSize:
                  "7px",

                color:
                  "#67e8f9",

                opacity:
                  0.75,

                letterSpacing:
                  "0.2em",
              }}
            >
              FINAL DESTINATION
            </div>
          </div>
        </Html>
      </group>

      {/* Entrance portal */}

      <group
        position={[
          0,
          0,
          -887,
        ]}
      >
        <mesh
          position={[
            -7,
            5,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.45,
              10,
              0.45,
            ]}
          />

          <meshStandardMaterial
            color="#111827"
            metalness={0.6}
          />
        </mesh>

        <mesh
          position={[
            7,
            5,
            0,
          ]}
        >
          <boxGeometry
            args={[
              0.45,
              10,
              0.45,
            ]}
          />

          <meshStandardMaterial
            color="#111827"
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
              14,
              0.45,
              0.45,
            ]}
          />

          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={
              7
            }
          />
        </mesh>
      </group>

      {/* Final atmosphere */}

      <pointLight
        position={[
          0,
          8,
          -900,
        ]}
        color="#22d3ee"
        intensity={30}
        distance={80}
      />
    </group>
  );
}