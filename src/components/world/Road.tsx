export default function Road() {
  const markings = Array.from({
    length: 100,
  });

  return (
    <group>
      {/* Main road */}
      <mesh
        position={[0, 0, -480]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        receiveShadow
      >
        <planeGeometry
          args={[14, 1000]}
        />

        <meshStandardMaterial
          color="#151515"
          roughness={0.95}
        />
      </mesh>

      {/* Left edge */}
      <mesh
        position={[
          -6.5,
          0.025,
          -480,
        ]}
      >
        <boxGeometry
          args={[
            0.12,
            0.04,
            1000,
          ]}
        />

        <meshStandardMaterial
          color="#e5e7eb"
          emissive="#ffffff"
          emissiveIntensity={
            0.15
          }
        />
      </mesh>

      {/* Right edge */}
      <mesh
        position={[
          6.5,
          0.025,
          -480,
        ]}
      >
        <boxGeometry
          args={[
            0.12,
            0.04,
            1000,
          ]}
        />

        <meshStandardMaterial
          color="#e5e7eb"
          emissive="#ffffff"
          emissiveIntensity={
            0.15
          }
        />
      </mesh>

      {/* Middle road markings */}
      {markings.map(
        (_, index) => (
          <mesh
            key={index}
            position={[
              0,
              0.03,
              10 -
                index * 10,
            ]}
          >
            <boxGeometry
              args={[
                0.13,
                0.04,
                4,
              ]}
            />

            <meshStandardMaterial
              color="#f3f4f6"
              emissive="#ffffff"
              emissiveIntensity={
                0.1
              }
            />
          </mesh>
        )
      )}

      {/* Terrain */}
      <mesh
        position={[
          0,
          -0.06,
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
            240,
            1020,
          ]}
        />

        <meshStandardMaterial
          color="#101712"
          roughness={1}
        />
      </mesh>
    </group>
  );
}