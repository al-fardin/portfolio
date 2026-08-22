"use client";

import {
  Instance,
  Instances,
} from "@react-three/drei";

import {
  getJourneyFrame,
} from "./journeyPath";

const SEGMENTS = 180;

export default function RoadRibbon() {
  const segments =
    Array.from({
      length: SEGMENTS,
    });

  return (
    <group>
      {/* LAND */}

      <mesh
        position={[
          0,
          -0.2,
          -480,
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
            420,
            1250,
          ]}
        />

        <meshStandardMaterial
          color="#35433a"
          roughness={1}
        />
      </mesh>

      {/* ASPHALT */}

      <Instances
        limit={SEGMENTS}
        range={SEGMENTS}
      >
        <boxGeometry
          args={[
            11,
            0.12,
            1,
          ]}
        />

        <meshStandardMaterial
          color="#292b2c"
          roughness={0.96}
        />

        {segments.map(
          (_, index) => {
            const t =
              index /
              SEGMENTS;

            const nextT =
              Math.min(
                1,
                (
                  index +
                  1
                ) /
                  SEGMENTS
              );

            const frame =
              getJourneyFrame(
                t
              );

            const next =
              getJourneyFrame(
                nextT
              );

            const length =
              frame.point.distanceTo(
                next.point
              ) + 0.2;

            return (
              <Instance
                key={index}
                position={[
                  frame.point
                    .x,
                  0,
                  frame.point
                    .z,
                ]}
                rotation={[
                  0,
                  frame.roadYaw,
                  0,
                ]}
                scale={[
                  1,
                  1,
                  length,
                ]}
              />
            );
          }
        )}
      </Instances>

      {/* LEFT SIDEWALK */}

      <Instances
        limit={SEGMENTS}
        range={SEGMENTS}
      >
        <boxGeometry
          args={[
            2.4,
            0.22,
            1,
          ]}
        />

        <meshStandardMaterial
          color="#908e89"
          roughness={0.9}
        />

        {segments.map(
          (_, index) => {
            const t =
              index /
              SEGMENTS;

            const nextT =
              Math.min(
                1,
                (
                  index +
                  1
                ) /
                  SEGMENTS
              );

            const frame =
              getJourneyFrame(
                t
              );

            const next =
              getJourneyFrame(
                nextT
              );

            const length =
              frame.point.distanceTo(
                next.point
              ) + 0.2;

            const position =
              frame.point
                .clone()
                .addScaledVector(
                  frame.normal,
                  -6.7
                );

            return (
              <Instance
                key={index}
                position={[
                  position.x,
                  0.08,
                  position.z,
                ]}
                rotation={[
                  0,
                  frame.roadYaw,
                  0,
                ]}
                scale={[
                  1,
                  1,
                  length,
                ]}
              />
            );
          }
        )}
      </Instances>

      {/* RIGHT SIDEWALK */}

      <Instances
        limit={SEGMENTS}
        range={SEGMENTS}
      >
        <boxGeometry
          args={[
            2.4,
            0.22,
            1,
          ]}
        />

        <meshStandardMaterial
          color="#908e89"
          roughness={0.9}
        />

        {segments.map(
          (_, index) => {
            const t =
              index /
              SEGMENTS;

            const nextT =
              Math.min(
                1,
                (
                  index +
                  1
                ) /
                  SEGMENTS
              );

            const frame =
              getJourneyFrame(
                t
              );

            const next =
              getJourneyFrame(
                nextT
              );

            const length =
              frame.point.distanceTo(
                next.point
              ) + 0.2;

            const position =
              frame.point
                .clone()
                .addScaledVector(
                  frame.normal,
                  6.7
                );

            return (
              <Instance
                key={index}
                position={[
                  position.x,
                  0.08,
                  position.z,
                ]}
                rotation={[
                  0,
                  frame.roadYaw,
                  0,
                ]}
                scale={[
                  1,
                  1,
                  length,
                ]}
              />
            );
          }
        )}
      </Instances>

      {/* CENTER DASHES */}

      <Instances
        limit={50}
        range={50}
      >
        <boxGeometry
          args={[
            0.1,
            0.025,
            2.8,
          ]}
        />

        <meshStandardMaterial
          color="#d5d3cc"
          roughness={0.65}
        />

        {Array.from({
          length: 50,
        }).map(
          (_, index) => {
            const t =
              index / 50;

            const frame =
              getJourneyFrame(
                t
              );

            return (
              <Instance
                key={index}
                position={[
                  frame.point
                    .x,
                  0.075,
                  frame.point
                    .z,
                ]}
                rotation={[
                  0,
                  frame.roadYaw,
                  0,
                ]}
              />
            );
          }
        )}
      </Instances>
    </group>
  );
}