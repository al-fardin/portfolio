import BikeController from "@/components/bike/BikeController";

import Buildings from "./Buildings";
import DestinationMarker from "./DestinationMarker";
import Road from "./Road";

export default function World() {
  return (
    <>
      {/* Sky */}
      <color
        attach="background"
        args={["#10151c"]}
      />

      {/* Distance fog */}
      <fog
        attach="fog"
        args={[
          "#10151c",
          55,
          260,
        ]}
      />

      {/* Global ambient light */}
      <ambientLight intensity={0.7} />

      {/* Sun */}
      <directionalLight
        position={[15, 25, 10]}
        intensity={2.4}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Purple atmosphere */}
      <pointLight
        position={[0, 7, -75]}
        color="#7c3aed"
        intensity={35}
        distance={80}
      />

      {/* Cyan atmosphere near destination */}
      <pointLight
        position={[0, 8, -120]}
        color="#22d3ee"
        intensity={18}
        distance={40}
      />

      {/* Environment */}
      <Road />

      <Buildings />

      {/* First portfolio destination */}
      <DestinationMarker />

      {/* Player */}
      <BikeController />
    </>
  );
}