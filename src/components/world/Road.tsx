export default function Road() {
  const centerLines = Array.from({
    length: 100,
  });

  const edgeStuds = Array.from({
    length: 82,
  });

  return (
    <group>
      {/* ========================= */}
      {/* MAIN ASPHALT */}
      {/* ========================= */}

      <mesh
        position={[0, -0.03, -480]}
        receiveShadow
      >
        <boxGeometry args={[14, 0.12, 1000]} />

        <meshStandardMaterial
          color="#111318"
          roughness={0.96}
          metalness={0.03}
        />
      </mesh>

      {/* Asphalt center wear */}

      <mesh
        position={[0, 0.035, -480]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[5.8, 998]} />

        <meshStandardMaterial
          color="#17191e"
          roughness={1}
        />
      </mesh>

      {/* Left tyre wear */}

      <mesh
        position={[-3.1, 0.038, -480]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1.3, 998]} />

        <meshStandardMaterial
          color="#0d0f13"
          roughness={1}
        />
      </mesh>

      {/* Right tyre wear */}

      <mesh
        position={[3.1, 0.038, -480]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1.3, 998]} />

        <meshStandardMaterial
          color="#0d0f13"
          roughness={1}
        />
      </mesh>

      {/* ========================= */}
      {/* ROAD SHOULDERS */}
      {/* ========================= */}

      <mesh
        position={[-7.65, -0.04, -480]}
        receiveShadow
      >
        <boxGeometry args={[1.3, 0.1, 1000]} />

        <meshStandardMaterial
          color="#202126"
          roughness={0.95}
        />
      </mesh>

      <mesh
        position={[7.65, -0.04, -480]}
        receiveShadow
      >
        <boxGeometry args={[1.3, 0.1, 1000]} />

        <meshStandardMaterial
          color="#202126"
          roughness={0.95}
        />
      </mesh>

      {/* ========================= */}
      {/* CURBS */}
      {/* ========================= */}

      <mesh
        position={[-7.02, 0.08, -480]}
        receiveShadow
      >
        <boxGeometry args={[0.22, 0.18, 1000]} />

        <meshStandardMaterial
          color="#30343b"
          roughness={0.75}
        />
      </mesh>

      <mesh
        position={[7.02, 0.08, -480]}
        receiveShadow
      >
        <boxGeometry args={[0.22, 0.18, 1000]} />

        <meshStandardMaterial
          color="#30343b"
          roughness={0.75}
        />
      </mesh>

      {/* ========================= */}
      {/* ROAD EDGE LINES */}
      {/* ========================= */}

      <mesh position={[-6.45, 0.065, -480]}>
        <boxGeometry args={[0.13, 0.025, 998]} />

        <meshStandardMaterial
          color="#e5e7eb"
          emissive="#ffffff"
          emissiveIntensity={0.35}
          roughness={0.4}
        />
      </mesh>

      <mesh position={[6.45, 0.065, -480]}>
        <boxGeometry args={[0.13, 0.025, 998]} />

        <meshStandardMaterial
          color="#e5e7eb"
          emissive="#ffffff"
          emissiveIntensity={0.35}
          roughness={0.4}
        />
      </mesh>

      {/* ========================= */}
      {/* CENTER DASHES */}
      {/* ========================= */}

      {centerLines.map((_, index) => (
        <mesh
          key={`center-${index}`}
          position={[
            0,
            0.07,
            10 - index * 10,
          ]}
        >
          <boxGeometry args={[0.15, 0.028, 4.2]} />

          <meshStandardMaterial
            color="#f4f4f5"
            emissive="#ffffff"
            emissiveIntensity={0.3}
            roughness={0.35}
          />
        </mesh>
      ))}

      {/* ========================= */}
      {/* REFLECTIVE ROAD STUDS */}
      {/* ========================= */}

      {edgeStuds.map((_, index) => {
        const z = 6 - index * 12;

        return (
          <group key={`stud-${index}`}>
            <mesh position={[-6.1, 0.11, z]}>
              <boxGeometry args={[0.14, 0.06, 0.24]} />

              <meshStandardMaterial
                color="#ffffff"
                emissive="#dbeafe"
                emissiveIntensity={2.8}
                roughness={0.25}
              />
            </mesh>

            <mesh position={[6.1, 0.11, z]}>
              <boxGeometry args={[0.14, 0.06, 0.24]} />

              <meshStandardMaterial
                color="#ffffff"
                emissive="#dbeafe"
                emissiveIntensity={2.8}
                roughness={0.25}
              />
            </mesh>
          </group>
        );
      })}

      {/* ========================= */}
      {/* OUTSIDE TERRAIN */}
      {/* ========================= */}

      <mesh
        position={[0, -0.12, -480]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[260, 1020]} />

        <meshStandardMaterial
          color="#0c120f"
          roughness={1}
        />
      </mesh>
    </group>
  );
}