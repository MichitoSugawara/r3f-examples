"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Cube from "@/components/Cube";
import TransitionSlider from "@/components/TransitionSlider";
import ImageTransition from "@/components/ImageTransition";
import { useRef } from "react";
export default function Home() {
  return (
    <>
      <Canvas>
        <ImageTransition></ImageTransition>
      </Canvas>
    </>
  );
}
