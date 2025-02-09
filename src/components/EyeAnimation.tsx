
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EyeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(400, 400); // Mantendo 400x400
    containerRef.current.appendChild(renderer.domElement);

    // Create outer eye shape (sclera) com mais detalhes na grade
    const scleraGeometry = new THREE.SphereGeometry(2.8, 32, 32); // Aumentado de 2.2 para 2.8
    const scleraMaterial = new THREE.MeshBasicMaterial({
      color: '#FFFFFF',
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const sclera = new THREE.Mesh(scleraGeometry, scleraMaterial);
    scene.add(sclera);

    // Create main iris structure com anéis maiores
    const segments = 100;
    const rings = [];
    for (let i = 0; i < 4; i++) {
      const radius = 1.5 - (i * 0.25); // Aumentado de 1.2 para 1.5
      const ringGeometry = new THREE.TorusGeometry(radius, 0.06, 16, segments); // Aumentado thickness
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

    // Create central pupil design
    const pupilGeometry = new THREE.CircleGeometry(0.65, 32); // Aumentado de 0.5 para 0.65
    const pupilMaterial = new THREE.MeshBasicMaterial({
      color: '#4A90A0',
      wireframe: true,
      side: THREE.DoubleSide,
      opacity: 1,
    });
    const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupil.position.z = 0.12;
    scene.add(pupil);

    // Create dynamic pattern around pupil com linhas maiores
    const patternGroup = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const lineGeometry = new THREE.BoxGeometry(0.5, 0.025, 0.025); // Aumentado proporcionalmente
      const lineMaterial = new THREE.MeshBasicMaterial({
        color: '#4A90A0',
        transparent: true,
        opacity: 0.8,
      });
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.position.x = Math.cos(angle) * 0.9; // Aumentado de 0.7 para 0.9
      line.position.y = Math.sin(angle) * 0.9; // Aumentado de 0.7 para 0.9
      line.rotation.z = angle;
      patternGroup.add(line);
    }
    scene.add(patternGroup);

    camera.position.z = 6; // Ajustado para a nova escala

    // Animation loop
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

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-[400px] h-[400px] mx-auto bg-white/10 rounded-full"
      style={{
        boxShadow: `
          0 0 60px rgba(74,144,160,0.5),
          0 0 100px rgba(74,144,160,0.3),
          0 0 140px rgba(74,144,160,0.2)
        `,
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 70%, transparent 100%)'
      }}
    />
  );
};

export default EyeAnimation;
