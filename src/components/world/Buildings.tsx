"use client";

import {
  Float,
  RoundedBox,
} from "@react-three/drei";

import * as THREE from "three";

function seededValue(
  index: number,
  offset: number
) {
  const value =
    Math.sin(
      index * 71.17 +
        offset * 39.43
    ) * 43758.5453;

  return value - Math.floor(value);
}

type CityTowerProps = {
  index: number;
  side: -1 | 1;
  z: number;
};

function CityTower({
  index,
  side,
  z,
}: CityTowerProps) {
  const height =
    9 +
    seededValue(index, 1) *
      15;

  const width =
    5.5 +
    seededValue(index, 2) *
      2.8;

  const depth =
    7.5 +
    seededValue(index, 3) *
      4;

  const x =
    side *
    (
      12 +
      seededValue(
        index,
        4
      ) *
        3
    );

  const accentColors = [
    "#8b5cf6",
    "#22d3ee",
    "#6366f1",
    "#a855f7",
  ];

  const accent =
    accentColors[
      index %
        accentColors.length
    ];

  const roadFacingDirection =
    side === -1 ? 1 : -1;

  const windowRows =
    Array.from({
      length: 5,
    });

  return (
    <group>
      {/* ===================== */}
      {/* BUILDING PODIUM */}
      {/* ===================== */}

      <RoundedBox
        args={[
          width + 1.5,
          2,
          depth + 1.5,
        ]}
        radius={0.25}
        smoothness={4}
        position={[
          x,
          1,
          z,
        ]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#10141b"
          roughness={0.65}
          metalness={0.4}
        />
      </RoundedBox>

      {/* ===================== */}
      {/* MAIN BUILDING */}
      {/* ===================== */}

      <RoundedBox
        args={[
          width,
          height,
          depth,
        ]}
        radius={0.3}
        smoothness={5}
        position={[
          x,
          height / 2 + 2,
          z,
        ]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={
            index % 2 === 0
              ? "#171d28"
              : "#111823"
          }
          metalness={0.62}
          roughness={0.3}
        />
      </RoundedBox>

      {/* ===================== */}
      {/* GLASS ROAD FACADE */}
      {/* ===================== */}

      <mesh
        position={[
          x +
            roadFacingDirection *
              (
                width / 2 +
                0.025
              ),

          height / 2 + 2,

          z,
        ]}
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
      >
        <planeGeometry
          args={[
            depth * 0.82,
            height * 0.82,
          ]}
        />

        <meshStandardMaterial
          color="#091421"
          emissive="#07111d"
          emissiveIntensity={
            0.6
          }
          metalness={0.85}
          roughness={0.08}
          side={
            THREE.DoubleSide
          }
        />
      </mesh>

      {/* ===================== */}
      {/* WINDOW STRIPS */}
      {/* ===================== */}

      {windowRows.map(
        (_, rowIndex) => {
          const normalized =
            (
              rowIndex + 1
            ) /
            6;

          const y =
            2 +
            height *
              normalized;

          return (
            <mesh
              key={
                rowIndex
              }
              position={[
                x +
                  roadFacingDirection *
                    (
                      width /
                        2 +
                      0.04
                    ),

                y,

                z,
              ]}
              rotation={[
                0,
                Math.PI /
                  2,
                0,
              ]}
            >
              <planeGeometry
                args={[
                  depth *
                    0.68,

                  0.12,
                ]}
              />

              <meshBasicMaterial
                color={
                  rowIndex %
                    2 ===
                  0
                    ? accent
                    : "#dbeafe"
                }
                transparent
                opacity={
                  rowIndex %
                    2 ===
                  0
                    ? 0.55
                    : 0.25
                }
                side={
                  THREE.DoubleSide
                }
              />
            </mesh>
          );
        }
      )}

      {/* ===================== */}
      {/* VERTICAL NEON STRIP */}
      {/* ===================== */}

      <mesh
        position={[
          x +
            roadFacingDirection *
              (
                width / 2 +
                0.07
              ),

          height / 2 + 2,

          z -
            depth *
              0.32,
        ]}
      >
        <boxGeometry
          args={[
            0.08,
            height * 0.78,
            0.08,
          ]}
        />

        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={
            4
          }
        />
      </mesh>

      {/* ===================== */}
      {/* SECOND NEON STRIP */}
      {/* ===================== */}

      {index % 3 === 0 && (
        <mesh
          position={[
            x +
              roadFacingDirection *
                (
                  width /
                    2 +
                  0.07
                ),

            height / 2 +
              2,

            z +
              depth *
                0.3,
          ]}
        >
          <boxGeometry
            args={[
              0.08,
              height *
                0.62,
              0.08,
            ]}
          />

          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={
              3
            }
          />
        </mesh>
      )}

      {/* ===================== */}
      {/* ROOFTOP CROWN */}
      {/* ===================== */}

      <RoundedBox
        args={[
          width * 0.65,
          1,
          depth * 0.6,
        ]}
        radius={0.18}
        smoothness={4}
        position={[
          x,
          height + 2.4,
          z,
        ]}
      >
        <meshStandardMaterial
          color="#202838"
          metalness={0.7}
          roughness={0.22}
        />
      </RoundedBox>

      {/* ===================== */}
      {/* ROOFTOP ANTENNA */}
      {/* ===================== */}

      {index % 2 === 0 && (
        <>
          <mesh
            position={[
              x,
              height + 5,
              z,
            ]}
          >
            <cylinderGeometry
              args={[
                0.055,
                0.07,
                5,
                10,
              ]}
            />

            <meshStandardMaterial
              color="#596273"
              metalness={0.9}
            />
          </mesh>

          <mesh
            position={[
              x,
              height + 7.6,
              z,
            ]}
          >
            <sphereGeometry
              args={[
                0.13,
                12,
                12,
              ]}
            />

            <meshStandardMaterial
              color="#ef4444"
              emissive="#ef4444"
              emissiveIntensity={
                6
              }
            />
          </mesh>
        </>
      )}

      {/* ===================== */}
      {/* STREET BILLBOARD */}
      {/* ===================== */}

      {index % 4 === 0 && (
        <group
          position={[
            x +
              roadFacingDirection *
                (
                  width / 2 +
                  0.55
                ),

            4,

            z,
          ]}
        >
          <mesh
            rotation={[
              0,
              Math.PI / 2,
              0,
            ]}
          >
            <planeGeometry
              args={[
                3.6,
                1.7,
              ]}
            />

            <meshStandardMaterial
              color="#07090d"
              emissive={accent}
              emissiveIntensity={
                0.75
              }
              side={
                THREE.DoubleSide
              }
            />
          </mesh>

          <mesh
            position={[
              roadFacingDirection *
                0.02,
              0,
              0,
            ]}
          >
            <boxGeometry
              args={[
                0.05,
                1.45,
                3.25,
              ]}
            />

            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={
                3.5
              }
            />
          </mesh>
        </group>
      )}

      {/* ===================== */}
      {/* ROOFTOP CORE */}
      {/* ===================== */}

      {index % 5 === 0 && (
        <Float
          speed={1.4}
          floatIntensity={
            0.25
          }
          rotationIntensity={
            0.25
          }
        >
          <mesh
            position={[
              x,
              height + 4,
              z,
            ]}
          >
            <octahedronGeometry
              args={[0.45]}
            />

            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={
                4
              }
            />
          </mesh>
        </Float>
      )}
    </group>
  );
}

export default function Buildings() {
  const cityRows =
    Array.from({
      length: 21,
    });

  return (
    <group>
      {cityRows.map(
        (_, index) => {
          const z =
            -12 -
            index * 18;

          return (
            <group
              key={index}
            >
              <CityTower
                index={
                  index * 2
                }
                side={-1}
                z={z}
              />

              <CityTower
                index={
                  index *
                    2 +
                  1
                }
                side={1}
                z={
                  z - 6
                }
              />
            </group>
          );
        }
      )}
    </group>
  );
}