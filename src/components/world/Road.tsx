export default function Road() {
  const centerLines =
    Array.from({
      length: 100,
    });

  return (
    <group>
      {/* MAIN ROAD */}

      <mesh
        position={[
          0,
          -0.03,
          -480,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[
            14,
            0.12,
            1000,
          ]}
        />

        <meshStandardMaterial
          color="#656c6b"
          roughness={0.92}
        />
      </mesh>

      {/* ROAD INNER STRIP */}

      <mesh
        position={[
          0,
          0.035,
          -480,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <planeGeometry
          args={[
            11.5,
            998,
          ]}
        />

        <meshStandardMaterial
          color="#707777"
          roughness={0.95}
        />
      </mesh>

      {/* SIDE WALK LEFT */}

      <mesh
        position={[
          -8.4,
          0.05,
          -480,
        ]}
      >
        <boxGeometry
          args={[
            2.8,
            0.18,
            1000,
          ]}
        />

        <meshStandardMaterial
          color="#d9d0c3"
          roughness={0.9}
        />
      </mesh>

      {/* SIDE WALK RIGHT */}

      <mesh
        position={[
          8.4,
          0.05,
          -480,
        ]}
      >
        <boxGeometry
          args={[
            2.8,
            0.18,
            1000,
          ]}
        />

        <meshStandardMaterial
          color="#d9d0c3"
          roughness={0.9}
        />
      </mesh>

      {/* CORAL CURBS */}

      <mesh
        position={[
          -7.03,
          0.12,
          -480,
        ]}
      >
        <boxGeometry
          args={[
            0.2,
            0.22,
            1000,
          ]}
        />

        <meshStandardMaterial
          color="#d9826a"
          roughness={0.75}
        />
      </mesh>

      <mesh
        position={[
          7.03,
          0.12,
          -480,
        ]}
      >
        <boxGeometry
          args={[
            0.2,
            0.22,
            1000,
          ]}
        />

        <meshStandardMaterial
          color="#d9826a"
          roughness={0.75}
        />
      </mesh>

      {/* ROAD EDGE */}

      <mesh
        position={[
          -6.45,
          0.07,
          -480,
        ]}
      >
        <boxGeometry
          args={[
            0.1,
            0.025,
            998,
          ]}
        />

        <meshStandardMaterial
          color="#f1ece4"
        />
      </mesh>

      <mesh
        position={[
          6.45,
          0.07,
          -480,
        ]}
      >
        <boxGeometry
          args={[
            0.1,
            0.025,
            998,
          ]}
        />

        <meshStandardMaterial
          color="#f1ece4"
        />
      </mesh>

      {/* CENTER DASHES */}

      {centerLines.map(
        (_, index) => (
          <mesh
            key={index}
            position={[
              0,
              0.075,
              10 -
                index *
                  10,
            ]}
          >
            <boxGeometry
              args={[
                0.13,
                0.025,
                3.7,
              ]}
            />

            <meshStandardMaterial
              color="#f3eee6"
            />
          </mesh>
        )
      )}

      {/* WORLD GROUND */}

      <mesh
        position={[
          0,
          -0.13,
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
            280,
            1030,
          ]}
        />

        <meshStandardMaterial
          color="#a8b4a7"
          roughness={1}
        />
      </mesh>
    </group>
  );
}