"use client";
import ImageTransition from "@/components/ImageTransition";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (

    <Canvas
      shadows
      camera={{ position: [0, 0, 10], fov: 30 }}
      className="w-screen !h-screen"
    >
      <color attach="background" args={["#ececec"]} />
      <OrbitControls />
      <ImageTransition></ImageTransition>      
    </Canvas>
  );
}
