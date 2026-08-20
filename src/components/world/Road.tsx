export default function Road() {
  const markings = Array.from({
    length: 70,
  });

  return (
    <group>

      {/* Main road */}
      <mesh
        position={[0, 0, -330]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[14, 700]} />

        <meshStandardMaterial
          color="#151515"
          roughness={0.95}
        />
      </mesh>

      {/* Left edge line */}
      <mesh position={[-6.5, 0.025, -330]}>
        <boxGeometry args={[0.12, 0.04, 700]} />

        <meshStandardMaterial
          color="#e5e7eb"
          emissive="#ffffff"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Right edge line */}
      <mesh position={[6.5, 0.025, -330]}>
        <boxGeometry args={[0.12, 0.04, 700]} />

        <meshStandardMaterial
          color="#e5e7eb"
          emissive="#ffffff"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Center lane markings */}
      {markings.map((_, index) => (
        <mesh
          key={index}
          position={[
            0,
            0.03,
            10 - index * 10,
          ]}
        >
          <boxGeometry
            args={[0.13, 0.04, 4]}
          />

          <meshStandardMaterial
            color="#f3f4f6"
            emissive="#ffffff"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}

      {/* Surrounding terrain */}
      <mesh
        position={[0, -0.06, -330]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[180, 720]} />

        <meshStandardMaterial
          color="#101712"
          roughness={1}
        />
      </mesh>
    </group>
  );
}