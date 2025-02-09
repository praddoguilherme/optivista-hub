import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EyeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup - Aumentando o tamanho do renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(600, 600); // Aumentado de 400 para 600
    containerRef.current.appendChild(renderer.domElement);

    // Create outer eye shape (sclera) with enhanced grid - Aumentando proporcionalmente
    const scleraGeometry = new THREE.SphereGeometry(3.3, 32, 32); // Aumentado de 2.2 para 3.3
    const scleraMaterial = new THREE.MeshBasicMaterial({
      color: '#FFFFFF',
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const sclera = new THREE.Mesh(scleraGeometry, scleraMaterial);
    scene.add(sclera);

    // Create main iris structure - Aumentando proporcionalmente
    const segments = 100;
    const rings = [];
    for (let i = 0; i < 4; i++) {
      const radius = 1.8 - (i * 0.3); // Aumentado de 1.2 para 1.8
      const ringGeometry = new THREE.TorusGeometry(radius, 0.075, 16, segments); // Aumentado thickness de 0.05 para 0.075
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: '#4A90A0',
        wireframe: true,
        transparent: true,
        opacity: 0.9 - (i * 0.1),
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      rings.push(ring);
      scene.add(ring);
    }

    // Create central pupil design - Aumentando proporcionalmente
    const pupilGeometry = new THREE.CircleGeometry(0.75, 32); // Aumentado de 0.5 para 0.75
    const pupilMaterial = new THREE.MeshBasicMaterial({
      color: '#4A90A0',
      wireframe: true,
      side: THREE.DoubleSide,
      opacity: 1,
    });
    const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupil.position.z = 0.15; // Ajustado de 0.1 para 0.15
    scene.add(pupil);

    // Create dynamic pattern around pupil - Aumentando proporcionalmente
    const patternGroup = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const lineGeometry = new THREE.BoxGeometry(0.6, 0.03, 0.03); // Aumentado de 0.4/0.02/0.02 para 0.6/0.03/0.03
      const lineMaterial = new THREE.MeshBasicMaterial({
        color: '#4A90A0',
        transparent: true,
        opacity: 0.8,
      });
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.position.x = Math.cos(angle) * 1.05; // Aumentado de 0.7 para 1.05
      line.position.y = Math.sin(angle) * 1.05; // Aumentado de 0.7 para 1.05
      line.rotation.z = angle;
      patternGroup.add(line);
    }
    scene.add(patternGroup);

    camera.position.z = 7.5; // Aumentado de 5 para 7.5 para manter a proporção da visualização

    // Enhanced animation
    const animate = () => {
      requestAnimationFrame(animate);
      sclera.rotation.y += 0.003;
      
      rings.forEach((ring, index) => {
        ring.rotation.z += 0.002 * (index + 1);
      });
      
      patternGroup.rotation.z += 0.005;
      pupil.rotation.z += 0.002;
      
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-[600px] h-[600px] mx-auto bg-white/10 rounded-full" // Aumentado de 400px para 600px
      style={{
        boxShadow: `
          0 0 90px rgba(74,144,160,0.5),
          0 0 150px rgba(74,144,160,0.3),
          0 0 210px rgba(74,144,160,0.2)
        `, // Aumentado proporcionalmente (60/100/140 para 90/150/210)
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 70%, transparent 100%)'
      }}
    />
  );
};

export default EyeAnimation;
