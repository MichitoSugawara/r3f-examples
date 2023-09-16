'use client'
import {MathUtils} from "three";
import { forwardRef, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";

export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: null,
    tex2: null,
    disp: null,
  },
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  /*glsl*/ `
    varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D tex3;
    uniform sampler2D disp;
    uniform float _rot;
    uniform int index;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }`
);

extend({ ImageFadeMaterial });

type NonEmptyArray<T> = [T, ...T[]];

type Props = {
  images: NonEmptyArray<string>;
  displacementImage: string;
  speed: number;
};

const Scene = (props: Props) => {

}



const TransitionSlider: React.FC<Props> = (props: Props, ref) => {
  console.log(props);
  const [hovered, setHover] = useState(false)
  useFrame(() => { 
    ref.current.dispFactor = MathUtils.lerp(ref.current.dispFactor, hovered ? 1 : 0, 0.025)
  })
  return (
    <>
      <Canvas>
        <mesh
          position={[3, 0, 0]}
          onPointerOver={(e) => {
            setHover(true);
          }}
          onPointerOut={(e) => setHover(false)}
          onClick={() => {
            ref.current.tex = texture3;
          }}
        >
          <planeGeometry args={[4, 3]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </>
  );
};

export default TransitionSlider;
