"use client";

import {
  Instance,
  Instances,
} from "@react-three/drei";

type TreeData = {
  x: number;
  z: number;
  scale: number;
  rotation: number;
};

type RockData = {
  x: number;
  z: number;
  scale: number;
  rotation: number;
};

type MountainData = {
  x: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  rotation: number;
  color: string;
};

type SkylineData = {
  x: number;
  z: number;
  width: number;
  height: number;
  depth: number;
};

function seededValue(
  index: number,
  offset: number
) {
  const value =
    Math.sin(
      index * 91.17 +
        offset * 37.31
    ) * 43758.5453;

  return (
    value -
    Math.floor(value)
  );
}

/*
  ==========================
  TREE DATA
  ==========================

  We intentionally keep
  Project City / Contact areas
  more open.
*/

const trees: TreeData[] =
  Array.from({
    length: 110,
  }).map((_, index) => {
    const side =
      index % 2 === 0
        ? -1
        : 1;

    const z =
      5 -
      index * 8.4;

    const distance =
      11 +
      seededValue(
        index,
        1
      ) *
        17;

    const scale =
      0.75 +
      seededValue(
        index,
        2
      ) *
        1.35;

    return {
      x:
        side *
        distance,

      z,

      scale,

      rotation:
        seededValue(
          index,
          3
        ) *
        Math.PI *
        2,
    };
  });

/*
  ==========================
  ROCK DATA
  ==========================
*/

const rocks: RockData[] =
  Array.from({
    length: 55,
  }).map((_, index) => {
    const side =
      index % 2 === 0
        ? -1
        : 1;

    return {
      x:
        side *
        (
          10 +
          seededValue(
            index,
            10
          ) *
            22
        ),

      z:
        -8 -
        index * 17,

      scale:
        0.35 +
        seededValue(
          index,
          11
        ) *
          1.2,

      rotation:
        seededValue(
          index,
          12
        ) *
        Math.PI *
        2,
    };
  });

/*
  ==========================
  MOUNTAIN DATA
  ==========================
*/

const mountains: MountainData[] =
  Array.from({
    length: 26,
  }).map((_, index) => {
    const side =
      index % 2 === 0
        ? -1
        : 1;

    const layer =
      index % 3;

    const width =
      24 +
      seededValue(
        index,
        20
      ) *
        28;

    const height =
      18 +
      seededValue(
        index,
        21
      ) *
        40;

    const depth =
      28 +
      seededValue(
        index,
        22
      ) *
        35;

    return {
      x:
        side *
        (
          55 +
          layer * 18 +
          seededValue(
            index,
            23
          ) *
            14
        ),

      z:
        -30 -
        index * 39,

      width,

      height,

      depth,

      rotation:
        seededValue(
          index,
          24
        ) *
          0.8 -
        0.4,

      color:
        layer === 0
          ? "#18211f"
          : layer === 1
            ? "#141c20"
            : "#101720",
    };
  });

/*
  ==========================
  PROJECT CITY SKYLINE
  ==========================
*/

const projectSkyline: SkylineData[] =
  Array.from({
    length: 18,
  }).map((_, index) => ({
    x:
      -44 +
      index * 5.2,

    z:
      -445 -
      seededValue(
        index,
        30
      ) *
        30,

    width:
      3 +
      seededValue(
        index,
        31
      ) *
        3,

    height:
      10 +
      seededValue(
        index,
        32
      ) *
        28,

    depth:
      5 +
      seededValue(
        index,
        33
      ) *
        5,
  }));

/*
  ==========================
  FINAL CITY SKYLINE
  ==========================
*/

const finalSkyline: SkylineData[] =
  Array.from({
    length: 20,
  }).map((_, index) => ({
    x:
      -48 +
      index * 5,

    z:
      -945 -
      seededValue(
        index,
        40
      ) *
        35,

    width:
      2.5 +
      seededValue(
        index,
        41
      ) *
        3.5,

    height:
      12 +
      seededValue(
        index,
        42
      ) *
        34,

    depth:
      5 +
      seededValue(
        index,
        43
      ) *
        6,
  }));

function Mountains() {
  return (
    <group>
      {mountains.map(
        (
          mountain,
          index
        ) => (
          <mesh
            key={index}
            position={[
              mountain.x,
              mountain.height /
                2 -
                2,
              mountain.z,
            ]}
            rotation={[
              0,
              mountain.rotation,
              0,
            ]}
            scale={[
              mountain.width,
              mountain.height,
              mountain.depth,
            ]}
            receiveShadow
          >
            <coneGeometry
              args={[
                1,
                1,
                5,
              ]}
            />

            <meshStandardMaterial
              color={
                mountain.color
              }
              roughness={1}
              metalness={0}
            />
          </mesh>
        )
      )}
    </group>
  );
}

function PineForest() {
  return (
    <group>
      {/* TRUNKS */}

      <Instances
        limit={trees.length}
        range={trees.length}
      >
        <cylinderGeometry
          args={[
            0.16,
            0.24,
            2.5,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#34251d"
          roughness={1}
        />

        {trees.map(
          (
            tree,
            index
          ) => (
            <Instance
              key={index}
              position={[
                tree.x,
                1.25 *
                  tree.scale,
                tree.z,
              ]}
              rotation={[
                0,
                tree.rotation,
                0,
              ]}
              scale={[
                tree.scale,
                tree.scale,
                tree.scale,
              ]}
            />
          )
        )}
      </Instances>

      {/* LOWER TREE CROWN */}

      <Instances
        limit={trees.length}
        range={trees.length}
      >
        <coneGeometry
          args={[
            1.45,
            3.4,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#12251c"
          roughness={0.95}
        />

        {trees.map(
          (
            tree,
            index
          ) => (
            <Instance
              key={index}
              position={[
                tree.x,
                3.25 *
                  tree.scale,
                tree.z,
              ]}
              rotation={[
                0,
                tree.rotation,
                0,
              ]}
              scale={[
                tree.scale,
                tree.scale,
                tree.scale,
              ]}
            />
          )
        )}
      </Instances>

      {/* UPPER TREE CROWN */}

      <Instances
        limit={trees.length}
        range={trees.length}
      >
        <coneGeometry
          args={[
            1.05,
            2.8,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#173126"
          roughness={0.95}
        />

        {trees.map(
          (
            tree,
            index
          ) => (
            <Instance
              key={index}
              position={[
                tree.x,
                4.85 *
                  tree.scale,
                tree.z,
              ]}
              rotation={[
                0,
                tree.rotation,
                0,
              ]}
              scale={[
                tree.scale *
                  0.9,
                tree.scale,
                tree.scale *
                  0.9,
              ]}
            />
          )
        )}
      </Instances>
    </group>
  );
}

function Rocks() {
  return (
    <Instances
      limit={rocks.length}
      range={rocks.length}
    >
      <dodecahedronGeometry
        args={[1, 0]}
      />

      <meshStandardMaterial
        color="#303235"
        roughness={0.98}
      />

      {rocks.map(
        (
          rock,
          index
        ) => (
          <Instance
            key={index}
            position={[
              rock.x,
              rock.scale *
                0.45,
              rock.z,
            ]}
            rotation={[
              rock.rotation *
                0.25,
              rock.rotation,
              rock.rotation *
                0.15,
            ]}
            scale={[
              rock.scale *
                1.3,
              rock.scale *
                0.7,
              rock.scale,
            ]}
          />
        )
      )}
    </Instances>
  );
}

function TerrainPatches() {
  const patches =
    Array.from({
      length: 30,
    });

  return (
    <group>
      {patches.map(
        (_, index) => {
          const side =
            index % 2 === 0
              ? -1
              : 1;

          const x =
            side *
            (
              19 +
              seededValue(
                index,
                50
              ) *
                23
            );

          const z =
            -10 -
            index * 31;

          const width =
            10 +
            seededValue(
              index,
              51
            ) *
              22;

          const depth =
            18 +
            seededValue(
              index,
              52
            ) *
              35;

          return (
            <mesh
              key={index}
              position={[
                x,
                -0.095,
                z,
              ]}
              rotation={[
                -Math.PI /
                  2,
                0,
                seededValue(
                  index,
                  53
                ),
              ]}
              receiveShadow
            >
              <planeGeometry
                args={[
                  width,
                  depth,
                ]}
              />

              <meshStandardMaterial
                color={
                  index %
                    3 ===
                  0
                    ? "#132018"
                    : "#101b15"
                }
                roughness={1}
              />
            </mesh>
          );
        }
      )}
    </group>
  );
}

function ProjectSkyline() {
  return (
    <group>
      {projectSkyline.map(
        (
          building,
          index
        ) => (
          <group
            key={index}
          >
            <mesh
              position={[
                building.x,
                building.height /
                  2,
                building.z,
              ]}
            >
              <boxGeometry
                args={[
                  building.width,
                  building.height,
                  building.depth,
                ]}
              />

              <meshStandardMaterial
                color={
                  index %
                    2 ===
                  0
                    ? "#151a24"
                    : "#111721"
                }
                roughness={0.65}
                metalness={0.25}
              />
            </mesh>

            {/* Some distant windows */}

            {index % 2 ===
              0 && (
              <mesh
                position={[
                  building.x,
                  building.height *
                    0.62,
                  building.z +
                    building.depth /
                      2 +
                    0.03,
                ]}
              >
                <planeGeometry
                  args={[
                    building.width *
                      0.55,
                    0.13,
                  ]}
                />

                <meshBasicMaterial
                  color={
                    index %
                      4 ===
                    0
                      ? "#8b5cf6"
                      : "#22d3ee"
                  }
                  transparent
                  opacity={0.65}
                />
              </mesh>
            )}
          </group>
        )
      )}
    </group>
  );
}

function FinalSkyline() {
  return (
    <group>
      {finalSkyline.map(
        (
          building,
          index
        ) => (
          <group
            key={index}
          >
            <mesh
              position={[
                building.x,
                building.height /
                  2,
                building.z,
              ]}
            >
              <boxGeometry
                args={[
                  building.width,
                  building.height,
                  building.depth,
                ]}
              />

              <meshStandardMaterial
                color={
                  index %
                    2 ===
                  0
                    ? "#0c1320"
                    : "#111827"
                }
                roughness={0.55}
                metalness={0.3}
              />
            </mesh>

            {index % 3 !==
              1 && (
              <>
                <mesh
                  position={[
                    building.x -
                      building.width *
                        0.22,
                    building.height *
                      0.66,
                    building.z +
                      building.depth /
                        2 +
                      0.03,
                  ]}
                >
                  <planeGeometry
                    args={[
                      0.12,
                      building.height *
                        0.35,
                    ]}
                  />

                  <meshBasicMaterial
                    color="#22d3ee"
                    transparent
                    opacity={0.45}
                  />
                </mesh>

                <mesh
                  position={[
                    building.x +
                      building.width *
                        0.22,
                    building.height *
                      0.5,
                    building.z +
                      building.depth /
                        2 +
                      0.03,
                  ]}
                >
                  <planeGeometry
                    args={[
                      0.12,
                      building.height *
                        0.28,
                    ]}
                  />

                  <meshBasicMaterial
                    color="#8b5cf6"
                    transparent
                    opacity={0.4}
                  />
                </mesh>
              </>
            )}
          </group>
        )
      )}
    </group>
  );
}

export default function ScenicEnvironment() {
  return (
    <group>
      {/* Terrain variation */}

      <TerrainPatches />

      {/* Natural world */}

      <Mountains />

      <PineForest />

      <Rocks />

      {/* City depth */}

      <ProjectSkyline />

      <FinalSkyline />
    </group>
  );
}