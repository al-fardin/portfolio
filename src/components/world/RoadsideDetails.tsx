function Lamp({
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
          2.8,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.04,
            0.06,
            5.6,
            10,
          ]}
        />

        <meshStandardMaterial
          color="#666d68"
          roughness={0.6}
        />
      </mesh>

      <mesh
        position={[
          direction *
            0.55,
          5.45,
          0,
        ]}
      >
        <boxGeometry
          args={[
            1.1,
            0.05,
            0.05,
          ]}
        />

        <meshStandardMaterial
          color="#666d68"
        />
      </mesh>

      <mesh
        position={[
          direction *
            1.05,
          5.35,
          0,
        ]}
      >
        <sphereGeometry
          args={[
            0.15,
            16,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#fff1cb"
          emissive="#f6d49d"
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

function Tree({
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
          1.2,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.16,
            0.22,
            2.4,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#826b54"
        />
      </mesh>

      <mesh
        position={[
          0,
          3.1,
          0,
        ]}
      >
        <sphereGeometry
          args={[
            1.25,
            12,
            10,
          ]}
        />

        <meshStandardMaterial
          color="#718f78"
          roughness={1}
        />
      </mesh>

      <mesh
        position={[
          0.45,
          3.5,
          0,
        ]}
      >
        <sphereGeometry
          args={[
            0.75,
            10,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#86a184"
          roughness={1}
        />
      </mesh>
    </group>
  );
}

export default function RoadsideDetails() {
  const items =
    Array.from({
      length: 28,
    });

  return (
    <group>
      {items.map(
        (_, index) => {
          const z =
            -15 -
            index *
              32;

          return (
            <group
              key={index}
            >
              <Lamp
                x={-9.6}
                z={z}
              />

              <Lamp
                x={9.6}
                z={
                  z - 16
                }
              />

              {index %
                  2 ===
                0 && (
                <>
                  <Tree
                    x={-18}
                    z={
                      z - 7
                    }
                    scale={
                      0.8 +
                      (
                        index %
                        3
                      ) *
                        0.12
                    }
                  />

                  <Tree
                    x={18}
                    z={
                      z - 20
                    }
                    scale={
                      0.9
                    }
                  />
                </>
              )}
            </group>
          );
        }
      )}
    </group>
  );
}