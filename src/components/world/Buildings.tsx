"use client";

import {
  RoundedBox,
} from "@react-three/drei";

const colors = [
  "#c98772",
  "#8ca79f",
  "#d8b06d",
  "#b5a3bc",
  "#c2beb3",
  "#7f99a0",
];

function seededValue(
  index: number,
  offset: number
) {
  const value =
    Math.sin(
      index * 73.11 +
        offset *
          19.77
    ) *
    43758.54;

  return (
    value -
    Math.floor(value)
  );
}

function Building({
  index,
  side,
  z,
}: {
  index: number;

  side:
    | -1
    | 1;

  z: number;
}) {
  const height =
    8 +
    seededValue(
      index,
      1
    ) *
      14;

  const width =
    5 +
    seededValue(
      index,
      2
    ) *
      2.5;

  const depth =
    7 +
    seededValue(
      index,
      3
    ) *
      3;

  const x =
    side *
    (
      12 +
      seededValue(
        index,
        4
      ) *
        2.5
    );

  const color =
    colors[
      index %
        colors.length
    ];

  const rows =
    Array.from({
      length: 4,
    });

  return (
    <group>
      {/* PODIUM */}

      <RoundedBox
        args={[
          width + 1,
          1.4,
          depth + 1,
        ]}
        radius={0.25}
        smoothness={4}
        position={[
          x,
          0.7,
          z,
        ]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#d7d1c7"
          roughness={0.85}
        />
      </RoundedBox>

      {/* BODY */}

      <RoundedBox
        args={[
          width,
          height,
          depth,
        ]}
        radius={0.35}
        smoothness={5}
        position={[
          x,
          height / 2 +
            1.4,
          z,
        ]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.72}
          metalness={0.02}
        />
      </RoundedBox>

      {/* WINDOWS */}

      {rows.map(
        (_, row) => (
          <mesh
            key={row}
            position={[
              x +
                (
                  side ===
                  -1
                    ? 1
                    : -1
                ) *
                  (
                    width /
                      2 +
                    0.02
                  ),

              3 +
                row *
                  (
                    (
                      height -
                      3
                    ) /
                    4
                  ),

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
                depth *
                  0.62,
                0.55,
              ]}
            />

            <meshStandardMaterial
              color="#425866"
              roughness={0.35}
            />
          </mesh>
        )
      )}

      {/* ROOF */}

      <mesh
        position={[
          x,
          height + 1.8,
          z,
        ]}
      >
        <boxGeometry
          args={[
            width * 0.62,
            0.4,
            depth * 0.55,
          ]}
        />

        <meshStandardMaterial
          color="#efe7db"
          roughness={0.8}
        />
      </mesh>

      {/* SMALL AWNING */}

      {index %
          3 ===
        0 && (
        <mesh
          position={[
            x +
              (
                side ===
                -1
                  ? 1
                  : -1
              ) *
                (
                  width /
                    2 +
                  0.5
                ),

            2.2,

            z,
          ]}
          rotation={[
            0,
            Math.PI / 2,
            0,
          ]}
        >
          <boxGeometry
            args={[
              depth *
                0.55,
              0.12,
              1,
            ]}
          />

          <meshStandardMaterial
            color="#f0d19b"
          />
        </mesh>
      )}
    </group>
  );
}

export default function Buildings() {
  const rows =
    Array.from({
      length: 21,
    });

  return (
    <group>
      {rows.map(
        (_, index) => {
          const z =
            -12 -
            index *
              18;

          return (
            <group
              key={index}
            >
              <Building
                index={
                  index *
                  2
                }
                side={-1}
                z={z}
              />

              <Building
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