"use client";

import { Html } from "@react-three/drei";
import * as THREE from "three";

const glassMaterial = {
  color: "#2f414b",
  roughness: 0.14,
  metalness: 0.36,
};

function GlassPanel({
  position,
  size,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  size: [number, number];
  rotation?: [number, number, number];
}) {
  return (
    <mesh
      position={position}
      rotation={rotation}
    >
      <planeGeometry args={size} />

      <meshStandardMaterial
        color={glassMaterial.color}
        roughness={glassMaterial.roughness}
        metalness={glassMaterial.metalness}
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function WindowGrid({
  x,
  z,
  width,
  height,
  depth,
  side,
  rows,
}: {
  x: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  side: -1 | 1;
  rows: number;
}) {
  const roadFacing =
    side === -1 ? 1 : -1;

  return (
    <group>
      <GlassPanel
        position={[
          x +
            roadFacing *
              (width / 2 + 0.025),
          height * 0.56,
          z,
        ]}
        size={[
          depth * 0.82,
          height * 0.7,
        ]}
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
      />

      {Array.from({
        length: rows,
      }).map((_, index) => {
        const y =
          3 +
          index *
            ((height - 4.5) /
              rows);

        return (
          <mesh
            key={index}
            position={[
              x +
                roadFacing *
                  (width / 2 +
                    0.04),
              y,
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
                depth * 0.76,
                0.045,
              ]}
            />

            <meshBasicMaterial
              color="#aab4b5"
              transparent
              opacity={0.32}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function OfficeBlock({
  x,
  z,
  side,
}: {
  x: number;
  z: number;
  side: -1 | 1;
}) {
  const width = 7.2;
  const height = 18;
  const depth = 14;

  const roadFacing =
    side === -1 ? 1 : -1;

  return (
    <group>
      <mesh
        position={[
          x,
          height / 2,
          z,
        ]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[
            width,
            height,
            depth,
          ]}
        />

        <meshStandardMaterial
          color="#8b8c88"
          roughness={0.82}
        />
      </mesh>

      <WindowGrid
        x={x}
        z={z}
        width={width}
        height={height}
        depth={depth}
        side={side}
        rows={5}
      />

      <mesh
        position={[
          x +
            roadFacing *
              (width / 2 + 0.32),
          1.8,
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
            depth * 0.7,
            0.16,
            1.25,
          ]}
        />

        <meshStandardMaterial
          color="#735f4e"
          roughness={0.78}
        />
      </mesh>

      <mesh
        position={[
          x +
            roadFacing *
              (width / 2 + 0.08),
          height * 0.55,
          z - depth * 0.39,
        ]}
      >
        <boxGeometry
          args={[
            0.13,
            height * 0.72,
            0.18,
          ]}
        />

        <meshStandardMaterial
          color="#715f50"
          roughness={0.72}
        />
      </mesh>
    </group>
  );
}

function ResidentialBlock({
  x,
  z,
  side,
}: {
  x: number;
  z: number;
  side: -1 | 1;
}) {
  const width = 8;
  const height = 15;
  const depth = 13;

  const roadFacing =
    side === -1 ? 1 : -1;

  return (
    <group>
      <mesh
        position={[
          x,
          height / 2,
          z,
        ]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[
            width,
            height,
            depth,
          ]}
        />

        <meshStandardMaterial
          color="#aaa69d"
          roughness={0.88}
        />
      </mesh>

      {[
        -4.4,
        0,
        4.4,
      ].map((offset, index) => (
        <group
          key={offset}
        >
          <mesh
            position={[
              x +
                roadFacing *
                  (width / 2 +
                    0.55),
              5.2 +
                index * 3.1,
              z + offset,
            ]}
          >
            <boxGeometry
              args={[
                1,
                0.16,
                2.8,
              ]}
            />

            <meshStandardMaterial
              color="#666966"
              roughness={0.72}
            />
          </mesh>

          <GlassPanel
            position={[
              x +
                roadFacing *
                  (width / 2 +
                    0.04),
              5 +
                index * 3.1,
              z + offset,
            ]}
            size={[
              2.1,
              1.65,
            ]}
            rotation={[
              0,
              Math.PI / 2,
              0,
            ]}
          />
        </group>
      ))}

      <mesh
        position={[
          x +
            roadFacing *
              (width / 2 + 0.05),
          1.55,
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
            3,
            2.8,
          ]}
        />

        <meshStandardMaterial
          color="#283941"
          roughness={0.22}
          metalness={0.28}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function GalleryBlock({
  x,
  z,
  side,
}: {
  x: number;
  z: number;
  side: -1 | 1;
}) {
  const roadFacing =
    side === -1 ? 1 : -1;

  return (
    <group>
      <mesh
        position={[
          x,
          4.2,
          z,
        ]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[
            10,
            8.4,
            15,
          ]}
        />

        <meshStandardMaterial
          color="#b1aca2"
          roughness={0.86}
        />
      </mesh>

      <mesh
        position={[
          x,
          11,
          z - 1,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            5.8,
            5.4,
            9,
          ]}
        />

        <meshStandardMaterial
          color="#727a7b"
          roughness={0.78}
        />
      </mesh>

      <GlassPanel
        position={[
          x +
            roadFacing *
              5.02,
          4.2,
          z,
        ]}
        size={[
          10.2,
          5.1,
        ]}
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
      />

      <mesh
        position={[
          x +
            roadFacing *
              5.75,
          1.9,
          z,
        ]}
      >
        <boxGeometry
          args={[
            1.5,
            0.14,
            7,
          ]}
        />

        <meshStandardMaterial
          color="#786856"
          roughness={0.75}
        />
      </mesh>
    </group>
  );
}

function SlimTower({
  x,
  z,
  side,
}: {
  x: number;
  z: number;
  side: -1 | 1;
}) {
  const width = 6.2;
  const height = 25;
  const depth = 11;

  return (
    <group>
      <mesh
        position={[
          x,
          height / 2,
          z,
        ]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[
            width,
            height,
            depth,
          ]}
        />

        <meshStandardMaterial
          color="#737a7b"
          roughness={0.76}
        />
      </mesh>

      <WindowGrid
        x={x}
        z={z}
        width={width}
        height={height}
        depth={depth}
        side={side}
        rows={7}
      />

      <mesh
        position={[
          x,
          height + 1.2,
          z,
        ]}
      >
        <boxGeometry
          args={[
            width * 0.5,
            2.4,
            depth * 0.45,
          ]}
        />

        <meshStandardMaterial
          color="#555c5e"
          roughness={0.7}
          metalness={0.18}
        />
      </mesh>

      <mesh
        position={[
          x,
          height + 3.6,
          z,
        ]}
      >
        <cylinderGeometry
          args={[
            0.04,
            0.06,
            2.5,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#464b4d"
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

function CornerBuilding({
  x,
  z,
  side,
}: {
  x: number;
  z: number;
  side: -1 | 1;
}) {
  const roadFacing =
    side === -1 ? 1 : -1;

  return (
    <group>
      <mesh
        position={[
          x,
          7,
          z,
        ]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[
            9,
            14,
            12,
          ]}
        />

        <meshStandardMaterial
          color="#98958f"
          roughness={0.83}
        />
      </mesh>

      <mesh
        position={[
          x +
            roadFacing *
              1.2,
          12.3,
          z - 2,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            6.2,
            5.5,
            7.5,
          ]}
        />

        <meshStandardMaterial
          color="#666e70"
          roughness={0.74}
        />
      </mesh>

      <GlassPanel
        position={[
          x +
            roadFacing *
              4.52,
          6.8,
          z,
        ]}
        size={[
          8,
          8.8,
        ]}
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
      />

      <mesh
        position={[
          x +
            roadFacing *
              5,
          0.5,
          z + 3.5,
        ]}
      >
        <boxGeometry
          args={[
            2,
            1,
            3.5,
          ]}
        />

        <meshStandardMaterial
          color="#6c5c4c"
          roughness={0.82}
        />
      </mesh>
    </group>
  );
}

function StreetTree({
  x,
  z,
  scale = 1,
}: {
  x: number;
  z: number;
  scale?: number;
}) {
  return (
    <group
      position={[
        x,
        0,
        z,
      ]}
      scale={scale}
    >
      <mesh
        position={[
          0,
          1.8,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.12,
            0.19,
            3.6,
            10,
          ]}
        />

        <meshStandardMaterial
          color="#504537"
          roughness={1}
        />
      </mesh>

      {[
        [0, 4.1, 0, 1.25],
        [
          0.55,
          4.45,
          0.1,
          0.9,
        ],
        [
          -0.45,
          4.65,
          -0.15,
          0.82,
        ],
        [
          0.05,
          5.1,
          0.2,
          0.75,
        ],
      ].map(
        (
          item,
          index
        ) => (
          <mesh
            key={index}
            position={[
              item[0],
              item[1],
              item[2],
            ]}
            scale={[
              item[3],
              item[3] *
                0.9,
              item[3],
            ]}
            castShadow
          >
            <icosahedronGeometry
              args={[
                1.15,
                2,
              ]}
            />

            <meshStandardMaterial
              color={
                index % 2 ===
                0
                  ? "#3f5447"
                  : "#4d6252"
              }
              roughness={0.98}
            />
          </mesh>
        )
      )}
    </group>
  );
}

function Planter({
  x,
  z,
}: {
  x: number;
  z: number;
}) {
  return (
    <group>
      <mesh
        position={[
          x,
          0.35,
          z,
        ]}
      >
        <boxGeometry
          args={[
            2.4,
            0.7,
            1.1,
          ]}
        />

        <meshStandardMaterial
          color="#777570"
          roughness={0.92}
        />
      </mesh>

      {[-0.7, 0, 0.7].map(
        (offset) => (
          <mesh
            key={offset}
            position={[
              x + offset,
              0.95,
              z,
            ]}
          >
            <sphereGeometry
              args={[
                0.45,
                12,
                10,
              ]}
            />

            <meshStandardMaterial
              color="#405345"
              roughness={1}
            />
          </mesh>
        )
      )}
    </group>
  );
}

function StreetLamp({
  x,
  z,
}: {
  x: number;
  z: number;
}) {
  const direction =
    x < 0 ? 1 : -1;

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
          3.2,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.04,
            0.06,
            6.4,
            10,
          ]}
        />

        <meshStandardMaterial
          color="#3e4345"
          metalness={0.66}
          roughness={0.38}
        />
      </mesh>

      <mesh
        position={[
          direction * 0.65,
          6.25,
          0,
        ]}
      >
        <boxGeometry
          args={[
            1.3,
            0.055,
            0.055,
          ]}
        />

        <meshStandardMaterial
          color="#3e4345"
          metalness={0.66}
        />
      </mesh>

      <mesh
        position={[
          direction * 1.26,
          6.14,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.34,
            0.09,
            0.23,
          ]}
        />

        <meshStandardMaterial
          color="#e6d4b3"
          emissive="#c8965d"
          emissiveIntensity={0.45}
        />
      </mesh>
    </group>
  );
}

function Crosswalk({
  z,
}: {
  z: number;
}) {
  return (
    <group>
      {Array.from({
        length: 8,
      }).map((_, index) => (
        <mesh
          key={index}
          position={[
            -4.9 +
              index * 1.4,
            0.075,
            z,
          ]}
        >
          <boxGeometry
            args={[
              0.72,
              0.02,
              3.2,
            ]}
          />

          <meshStandardMaterial
            color="#b9b8b4"
            roughness={0.74}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function OpeningDistrict() {
  return (
    <group>
      {/* ===================== */}
      {/* FIRST BLOCK */}
      {/* ===================== */}

      <OfficeBlock
        x={-14.6}
        z={-24}
        side={-1}
      />

      <GalleryBlock
        x={14.8}
        z={-32}
        side={1}
      />

      <StreetTree
        x={-10.2}
        z={-7}
        scale={0.9}
      />

      <Planter
        x={10.2}
        z={-10}
      />

      <StreetLamp
        x={-9.5}
        z={-2}
      />

      {/* ===================== */}
      {/* SECOND BLOCK */}
      {/* ===================== */}

      <ResidentialBlock
        x={-16.2}
        z={-65}
        side={-1}
      />

      <SlimTower
        x={15.4}
        z={-72}
        side={1}
      />

      <StreetTree
        x={10.5}
        z={-52}
        scale={1}
      />

      <StreetTree
        x={-10.6}
        z={-47}
        scale={0.82}
      />

      <StreetLamp
        x={9.5}
        z={-49}
      />

      <Crosswalk z={-54} />

      {/* ===================== */}
      {/* THIRD BLOCK */}
      {/* ===================== */}

      <CornerBuilding
        x={-15}
        z={-103}
        side={-1}
      />

      <OfficeBlock
        x={16.2}
        z={-112}
        side={1}
      />

      <Planter
        x={-10.3}
        z={-92}
      />

      <StreetTree
        x={10.4}
        z={-96}
        scale={0.9}
      />

      <StreetLamp
        x={-9.5}
        z={-92}
      />

      {/* ===================== */}
      {/* ABOUT PREVIEW */}
      {/* ===================== */}

      <group
        position={[
          11.5,
          0,
          -117,
        ]}
      >
        <mesh
          position={[
            0,
            3.7,
            0,
          ]}
          castShadow
        >
          <boxGeometry
            args={[
              0.7,
              7.4,
              8,
            ]}
          />

          <meshStandardMaterial
            color="#8d8a84"
            roughness={0.84}
          />
        </mesh>

        <GlassPanel
          position={[
            -0.37,
            4.2,
            0,
          ]}
          size={[
            5.5,
            4,
          ]}
          rotation={[
            0,
            -Math.PI / 2,
            0,
          ]}
        />

        <Html
          position={[
            -0.45,
            4.6,
            0,
          ]}
          rotation={[
            0,
            -Math.PI / 2,
            0,
          ]}
          center
          distanceFactor={10}
        >
          <div
            style={{
              width:
                "200px",
              color:
                "#e5e3dd",
              fontFamily:
                "Arial, sans-serif",
              pointerEvents:
                "none",
              textAlign:
                "left",
            }}
          >
            <div
              style={{
                fontFamily:
                  "monospace",
                fontSize:
                  "7px",
                letterSpacing:
                  "0.3em",
                opacity: 0.5,
              }}
            >
              01 / ABOUT
            </div>

            <div
              style={{
                marginTop:
                  "9px",
                fontSize:
                  "20px",
                lineHeight:
                  "1.05",
                fontWeight: 600,
              }}
            >
              THE JOURNEY
              <br />
              STARTS HERE.
            </div>
          </div>
        </Html>
      </group>

      {/* ===================== */}
      {/* FOURTH BLOCK / DEPTH */}
      {/* ===================== */}

      <SlimTower
        x={-17.2}
        z={-145}
        side={-1}
      />

      <ResidentialBlock
        x={15.5}
        z={-151}
        side={1}
      />

      <StreetTree
        x={-10.5}
        z={-132}
        scale={0.95}
      />

      <StreetTree
        x={10.5}
        z={-139}
        scale={0.8}
      />

      <StreetLamp
        x={9.5}
        z={-135}
      />

      {/* ===================== */}
      {/* DISTANT LANDMARKS */}
      {/* ===================== */}

      <mesh
        position={[
          -32,
          18,
          -185,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            9,
            36,
            10,
          ]}
        />

        <meshStandardMaterial
          color="#616a6d"
          roughness={0.72}
        />
      </mesh>

      <GlassPanel
        position={[
          -27.48,
          17,
          -185,
        ]}
        size={[
          7,
          26,
        ]}
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
      />

      <mesh
        position={[
          31,
          12.5,
          -195,
        ]}
      >
        <boxGeometry
          args={[
            12,
            25,
            11,
          ]}
        />

        <meshStandardMaterial
          color="#737a79"
          roughness={0.76}
        />
      </mesh>

      <mesh
        position={[
          0,
          16,
          -215,
        ]}
      >
        <boxGeometry
          args={[
            6,
            32,
            7,
          ]}
        />

        <meshStandardMaterial
          color="#6b7375"
          roughness={0.72}
        />
      </mesh>
    </group>
  );
}