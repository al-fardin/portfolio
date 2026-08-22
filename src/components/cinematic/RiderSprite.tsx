"use client";

import {
  useEffect,
  useMemo,
} from "react";

import {
  useTexture,
} from "@react-three/drei";

import * as THREE from "three";

export default function RiderSprite() {
  const texture =
    useTexture(
      "/textures/rider-back.png"
    );

  useEffect(() => {
    texture.colorSpace =
      THREE.SRGBColorSpace;

    texture.anisotropy = 8;

    texture.needsUpdate = true;
  }, [texture]);

  const material =
    useMemo(() => {
      return new THREE.ShaderMaterial({
        transparent: true,

        depthTest: true,

        depthWrite: false,

        side:
          THREE.DoubleSide,

        uniforms: {
          map: {
            value: texture,
          },
        },

        vertexShader: `
          varying vec2 vUv;

          void main() {
            vUv = uv;

            gl_Position =
              projectionMatrix *
              modelViewMatrix *
              vec4(
                position,
                1.0
              );
          }
        `,

        fragmentShader: `
          uniform sampler2D map;

          varying vec2 vUv;

          void main() {
            vec4 tex =
              texture2D(
                map,
                vUv
              );

            if (tex.a < 0.05) {
              discard;
            }

            float x = vUv.x;
            float y = vUv.y;

            float keep = 0.0;

            /*
              Head + full torso + arms
            */

            if (y > 0.40) {
              keep = 1.0;
            }

            /*
              Hip + thighs
            */

            if (
              y > 0.24 &&
              y <= 0.40
            ) {
              if (
                x < 0.46 ||
                x > 0.54
              ) {
                keep = 1.0;
              }
            }

            /*
              Lower legs / shoes
            */

            if (
              y > 0.09 &&
              y <= 0.24
            ) {
              if (
                x < 0.37 ||
                x > 0.63
              ) {
                keep = 1.0;
              }
            }

            /*
              Delete generated motorcycle
              from centre/bottom of PNG.
            */

            if (keep < 0.5) {
              discard;
            }

            gl_FragColor = tex;
          }
        `,
      });
    }, [texture]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  return (
    <mesh
      /*
        Rider এখন আগের চেয়ে:
        - নিচে
        - একটু বড়
        - seat-এর কাছে
      */

      position={[
        0,
        1.20,
        0.10,
      ]}
      rotation={[
        0,
        Math.PI,
        0,
      ]}
      renderOrder={5}
      frustumCulled={false}
    >
      <planeGeometry
        args={[
          1.72,
          2.24,
        ]}
      />

      <primitive
        object={material}
        attach="material"
      />
    </mesh>
  );
}

useTexture.preload(
  "/textures/rider-back.png"
);