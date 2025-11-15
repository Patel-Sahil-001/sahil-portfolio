import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Text } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface FloatingIconProps {
  position: [number, number, number];
  icon: string;
  color: string;
  onClick: () => void;
}

// Floating tech icons around the sphere
function FloatingIcon({ position, icon, color, onClick }: FloatingIconProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.3;
      meshRef.current.rotation.y = time * 0.5;
      
      // Scale on hover
      const targetScale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={hovered ? 0.8 : 0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {icon}
      </Text>
    </group>
  );
}

// Animated 3D Sphere component
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere args={[1, 100, 200]} scale={2.5} ref={meshRef}>
      <MeshDistortMaterial
        color="#ff6b35"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

interface Hero3DProps {
  onTechClick: (index: number) => void;
}

export default function Hero3D({ onTechClick }: Hero3DProps) {
  const techIcons: Array<{ position: [number, number, number], icon: string, color: string }> = [
    { position: [2.5, 1, 0], icon: 'PY', color: '#ff6b35' },      // Python - Orange
    { position: [-2.5, 1, 0], icon: 'JAVA', color: '#00d9ff' },   // Java - Teal
    { position: [0, 2.5, 1], icon: 'C++', color: '#b565d8' },     // C++ - Purple
    { position: [1.8, -1.5, 0.5], icon: 'JS', color: '#00ffa3' }, // JavaScript - Green
    { position: [-1.8, -1.5, 0.5], icon: 'HTML', color: '#ff6b35' }, // HTML - Orange
    { position: [0, -2.2, -0.5], icon: 'CSS', color: '#00d9ff' }, // CSS - Teal
    { position: [2, 0, 1.5], icon: 'UI/UX', color: '#ff6b9d' },   // UI/UX - Pink
    { position: [-2, 0, 1.5], icon: 'DSA', color: '#b565d8' },    // DSA - Purple
  ];

  return (
    <div className="w-full h-full cursor-pointer">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff6b35" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00d9ff" />
        <spotLight position={[0, 5, 5]} angle={0.3} intensity={1.5} color="#ff6b35" />
        
        <AnimatedSphere />
        
        {techIcons.map((tech, idx) => (
          <FloatingIcon 
            key={idx} 
            position={tech.position} 
            icon={tech.icon}
            color={tech.color}
            onClick={() => onTechClick(idx)}
          />
        ))}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
