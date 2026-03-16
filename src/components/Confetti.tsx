import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const count = 400;
const colors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a', '#ff9c3a'];

export function Confetti() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 1 + Math.random() * 3;
      temp.push({
        x: 0,
        y: -2,
        z: 0,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        rz: Math.random() * Math.PI,
        vx: Math.cos(angle) * velocity * (Math.random() * 0.5 + 0.5),
        vy: (Math.random() * 2 + 2) * velocity,
        vz: (Math.random() - 0.5) * velocity,
        rs: (Math.random() - 0.5) * 0.2,
      });
    }
    return temp;
  }, []);

  useEffect(() => {
    if (!mesh.current) return;
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      color.set(colors[Math.floor(Math.random() * colors.length)]);
      mesh.current.setColorAt(i, color);
    }
    if (mesh.current.instanceColor) {
      mesh.current.instanceColor.needsUpdate = true;
    }
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    particles.forEach((p, i) => {
      p.x += p.vx * 0.05;
      p.y += p.vy * 0.05;
      p.z += p.vz * 0.05;
      
      // Gravity
      p.vy -= 0.1;
      
      // Air resistance
      p.vx *= 0.98;
      p.vz *= 0.98;

      p.rx += p.rs;
      p.ry += p.rs;
      p.rz += p.rs;

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rx, p.ry, p.rz);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <planeGeometry args={[0.2, 0.1]} />
      <meshBasicMaterial side={THREE.DoubleSide} toneMapped={false} />
    </instancedMesh>
  );
}
