export default function Buildings() {
  const buildings =
    Array.from({
      length: 36,
    });

  return (
    <group>
      {buildings.map(
        (_, index) => {
          /*
            Project City থেকে
            সামনে আর normal city
            buildings থাকবে না.

            এরপর open highway.
          */

          if (
            index >= 21
          ) {
            return null;
          }

          const z =
            -12 -
            index * 18;

          const leftHeight =
            6 +
            (index % 5) * 2;

          const rightHeight =
            7 +
            ((index + 2) %
              5) *
              2;

          return (
            <group
              key={index}
            >
              {/* Left */}
              <mesh
                position={[
                  -11.5 -
                    (index %
                      3) *
                      1.2,

                  leftHeight /
                    2,

                  z,
                ]}
                castShadow
                receiveShadow
              >
                <boxGeometry
                  args={[
                    6.5,
                    leftHeight,
                    10,
                  ]}
                />

                <meshStandardMaterial
                  color={
                    index %
                      2 ===
                    0
                      ? "#1b2028"
                      : "#252a34"
                  }
                  roughness={
                    0.8
                  }
                />
              </mesh>

              {/* Right */}
              <mesh
                position={[
                  11.5 +
                    (index %
                      3) *
                      1.2,

                  rightHeight /
                    2,

                  z - 6,
                ]}
                castShadow
                receiveShadow
              >
                <boxGeometry
                  args={[
                    6.5,
                    rightHeight,
                    10,
                  ]}
                />

                <meshStandardMaterial
                  color={
                    index %
                      2 ===
                    0
                      ? "#242935"
                      : "#181c23"
                  }
                  roughness={
                    0.8
                  }
                />
              </mesh>
            </group>
          );
        }
      )}
    </group>
  );
}