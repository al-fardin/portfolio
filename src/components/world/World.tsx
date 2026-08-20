export default function World() {
  return (
    <>
      <ambientLight intensity={0.6} />

      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
      />

      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#7c3aed" />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </>
  );
}