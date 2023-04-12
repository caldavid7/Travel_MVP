import React, { ReactElement, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
interface Props {}
function Sphere() {
  const sphere = useRef<Mesh>(null);
  // useFrame(() => {
  //   if (sphere.current) sphere.current.rotation.y += 0.001;
  // });
  const earthMap = useLoader(TextureLoader, "/earthMap.jpg");
  const earthBumpMap = useLoader(TextureLoader, "/earthBumpMap.jpg");
  return (
    <mesh ref={sphere} rotation={[Math.PI / 4, 0, 0]}>
      <sphereGeometry></sphereGeometry>
      <meshPhongMaterial
        map={earthMap}
        bumpMap={earthBumpMap}
        bumpScale={0.2}
      ></meshPhongMaterial>
    </mesh>
  );
}

export default function EarthAnimation({}: Props): ReactElement {
  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 2] }}
      className="h-screen w-screen bg-primary-black"
    >
      <Stars count={300} saturation={80}></Stars>
      <ambientLight intensity={0.2} color="white"></ambientLight>
      <spotLight
        color={"white"}
        position={[0, 0, 10]}
        intensity={0.5}
      ></spotLight>
      <OrbitControls
        zoomSpeed={0.8}
        autoRotate
        autoRotateSpeed={0.1}
        enableZoom={false}
        rotateSpeed={0.5}
        maxDistance={7}
        minDistance={1.5}
      />
      <Sphere></Sphere>
    </Canvas>
  );
}
