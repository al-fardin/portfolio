"use client";

import {
  Html,
} from "@react-three/drei";

type DestinationMarkerProps = {
  position: [
    number,
    number,
    number
  ];

  index: string;

  title: string;

  color: string;

  active: boolean;

  completed: boolean;
};

export default function DestinationMarker({
  position,
  index,
  title,
  active,
  completed,
}: DestinationMarkerProps) {
  if (completed) {
    return null;
  }

  return (
    <group
      position={position}
    >
      {/* LEFT COLUMN */}

      <mesh
        position={[
          -6,
          3.6,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.22,
            7.2,
            0.22,
          ]}
        />

        <meshStandardMaterial
          color={
            active
              ? "#d9826a"
              : "#aaa79f"
          }
        />
      </mesh>

      {/* RIGHT COLUMN */}

      <mesh
        position={[
          6,
          3.6,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.22,
            7.2,
            0.22,
          ]}
        />

        <meshStandardMaterial
          color={
            active
              ? "#d9826a"
              : "#aaa79f"
          }
        />
      </mesh>

      {/* TOP BEAM */}

      <mesh
        position={[
          0,
          7,
          0,
        ]}
      >
        <boxGeometry
          args={[
            12.2,
            0.22,
            0.22,
          ]}
        />

        <meshStandardMaterial
          color={
            active
              ? "#d9826a"
              : "#aaa79f"
          }
        />
      </mesh>

      {/* TEXT */}

      <Html
        position={[
          0,
          5.7,
          0,
        ]}
        center
        distanceFactor={14}
      >
        <div
          style={{
            textAlign:
              "center",

            color:
              "#26303b",

            fontFamily:
              "Arial, sans-serif",

            pointerEvents:
              "none",

            whiteSpace:
              "nowrap",

            opacity:
              active
                ? 1
                : 0.45,
          }}
        >
          <div
            style={{
              fontFamily:
                "monospace",

              fontSize:
                "7px",

              letterSpacing:
                "0.35em",

              opacity:
                0.45,
            }}
          >
            CHAPTER{" "}
            {index}
          </div>

          <div
            style={{
              marginTop:
                "8px",

              fontSize:
                "18px",

              fontWeight:
                700,

              letterSpacing:
                "0.08em",
            }}
          >
            {title}
          </div>
        </div>
      </Html>

      {/* SIMPLE ROAD MARK */}

      {active && (
        <mesh
          position={[
            0,
            0.08,
            3,
          ]}
        >
          <boxGeometry
            args={[
              5,
              0.03,
              0.12,
            ]}
          />

          <meshStandardMaterial
            color="#e1775f"
          />
        </mesh>
      )}
    </group>
  );
}