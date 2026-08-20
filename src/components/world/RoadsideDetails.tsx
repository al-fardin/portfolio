function StreetLamp({
  x,
  z,
  light,
}: {
  x: number;
  z: number;
  light: boolean;
}) {
  const direction = x < 0 ? 1 : -1;

  return (
    <group position={[x, 0, z]}>
      {/* Pole */}

      <mesh position={[0, 3.2, 0]} castShadow>
        <cylinderGeometry
          args={[0.055, 0.075, 6.4, 12]}
        />

        <meshStandardMaterial
          color="#454b55"
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>

      {/* Arm */}

      <mesh
        position={[
          direction * 0.7,
          6.25,
          0,
        ]}
      >
        <boxGeometry args={[1.4, 0.07, 0.07]} />

        <meshStandardMaterial
          color="#59606b"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* Lamp housing */}

      <mesh
        position={[
          direction * 1.35,
          6.17,
          0,
        ]}
      >
        <boxGeometry args={[0.45, 0.13, 0.3]} />

        <meshStandardMaterial
          color="#181b20"
          metalness={0.75}
        />
      </mesh>

      {/* Light */}

      <mesh
        position={[
          direction * 1.35,
          6.08,
          0,
        ]}
      >
        <boxGeometry args={[0.3, 0.04, 0.2]} />

        <meshStandardMaterial
          color="#fff7df"
          emissive="#ffdca8"
          emissiveIntensity={6}
        />
      </mesh>

      {light && (
        <pointLight
          position={[
            direction * 1.35,
            5.8,
            0,
          ]}
          color="#ffd9a3"
          intensity={9}
          distance={16}
          decay={2}
        />
      )}
    </group>
  );
}

function SafetyPost({
  x,
  z,
}: {
  x: number;
  z: number;
}) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.16, 1.1, 0.16]} />

        <meshStandardMaterial
          color="#d4d4d8"
          roughness={0.7}
        />
      </mesh>

      <mesh position={[0, 0.72, 0.085]}>
        <boxGeometry args={[0.12, 0.18, 0.025]} />

        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={3}
        />
      </mesh>
    </group>
  );
}

function GuardRail({
  x,
  z,
  length,
}: {
  x: number;
  z: number;
  length: number;
}) {
  const posts = Array.from({
    length: Math.floor(length / 8),
  });

  return (
    <group>
      {/* Main metal rail */}

      <mesh position={[x, 0.95, z]}>
        <boxGeometry args={[0.13, 0.32, length]} />

        <meshStandardMaterial
          color="#727984"
          metalness={0.95}
          roughness={0.25}
        />
      </mesh>

      {/* Dark lower rail */}

      <mesh position={[x, 0.57, z]}>
        <boxGeometry args={[0.09, 0.12, length]} />

        <meshStandardMaterial
          color="#363b43"
          metalness={0.8}
          roughness={0.35}
        />
      </mesh>

      {/* Posts */}

      {posts.map((_, index) => {
        const start = z + length / 2;

        const postZ =
          start - 4 - index * 8;

        return (
          <mesh
            key={index}
            position={[x, 0.5, postZ]}
          >
            <boxGeometry args={[0.16, 1, 0.16]} />

            <meshStandardMaterial
              color="#555c66"
              metalness={0.85}
              roughness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function RoadsideDetails() {
  const lamps = Array.from({
    length: 26,
  });

  const safetyPosts = Array.from({
    length: 45,
  });

  return (
    <group>
      {/* ========================= */}
      {/* STREET LIGHTS */}
      {/* ========================= */}

      {lamps.map((_, index) => {
        const z =
          -20 -
          index * 34;

        return (
          <group key={`lamp-${index}`}>
            <StreetLamp
              x={-9.2}
              z={z}
              light={
                index % 4 === 0
              }
            />

            <StreetLamp
              x={9.2}
              z={z - 16}
              light={
                index % 4 === 2
              }
            />
          </group>
        );
      })}

      {/* ========================= */}
      {/* SAFETY REFLECTOR POSTS */}
      {/* ========================= */}

      {safetyPosts.map((_, index) => {
        const z =
          -15 -
          index * 21;

        return (
          <group
            key={`safe-${index}`}
          >
            <SafetyPost
              x={-8.4}
              z={z}
            />

            <SafetyPost
              x={8.4}
              z={z - 9}
            />
          </group>
        );
      })}

      {/* ========================= */}
      {/* EXPERIENCE HIGHWAY RAILS */}
      {/* ========================= */}

      <GuardRail
        x={-8.1}
        z={-520}
        length={135}
      />

      <GuardRail
        x={8.1}
        z={-520}
        length={135}
      />

      {/* ========================= */}
      {/* ROAD AFTER BRIDGE */}
      {/* ========================= */}

      <GuardRail
        x={-8.1}
        z={-820}
        length={90}
      />

      <GuardRail
        x={8.1}
        z={-820}
        length={90}
      />
    </group>
  );
}