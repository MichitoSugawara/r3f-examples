import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Cube = () => {
  return (
    <>
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};

export default Cube;
