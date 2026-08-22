import * as THREE from "three";

export const journeyCurve =
  new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(
        0,
        0,
        10
      ),

      new THREE.Vector3(
        0,
        0,
        -70
      ),

      new THREE.Vector3(
        4,
        0,
        -155
      ),

      new THREE.Vector3(
        -5,
        0,
        -250
      ),

      new THREE.Vector3(
        -2,
        0,
        -355
      ),

      new THREE.Vector3(
        6,
        0,
        -470
      ),

      new THREE.Vector3(
        -4,
        0,
        -600
      ),

      new THREE.Vector3(
        3,
        0,
        -735
      ),

      new THREE.Vector3(
        0,
        0,
        -890
      ),

      new THREE.Vector3(
        0,
        0,
        -980
      ),
    ],

    false,
    "catmullrom",
    0.45
  );

export function getJourneyFrame(
  progress: number
) {
  const t =
    THREE.MathUtils.clamp(
      progress,
      0,
      1
    );

  const point =
    journeyCurve.getPointAt(t);

  const tangent =
    journeyCurve
      .getTangentAt(t)
      .normalize();

  const normal =
    new THREE.Vector3(
      tangent.z,
      0,
      -tangent.x
    ).normalize();

  const roadYaw =
    Math.atan2(
      tangent.x,
      tangent.z
    );

  return {
    point,
    tangent,
    normal,
    roadYaw,
  };
}