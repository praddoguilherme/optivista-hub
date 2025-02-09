
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EyeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(400, 400);
    containerRef.current.appendChild(renderer.domElement);

    // Create outer eye shape (sclera) with more prominent wireframe
    const scleraGeometry = new THREE.SphereGeometry(2.2, 32, 32);
    const scleraMaterial = new THREE.MeshBasicMaterial({
      color: '#FFFFFF',
      wireframe: true,
      transparent: true,
      opacity: 0.5, // Increased opacity
    });
    const sclera = new THREE.Mesh(scleraGeometry, scleraMaterial);
    scene.add(sclera);

    // Create iris with multiple layers for depth
    const irisGeometry = new THREE.TorusGeometry(1, 0.3, 32, 100); // Increased segments
    const irisMaterial = new THREE.MeshBasicMaterial({
      color: '#4A90A0',
      wireframe: true,
      transparent: true,
      opacity: 0.9, // Increased opacity
    });
    const iris = new THREE.Mesh(irisGeometry, irisMaterial);
    iris.rotation.x = Math.PI / 2;
    scene.add(iris);

    // Create additional iris layer
    const irisInnerGeometry = new THREE.TorusGeometry(0.8, 0.2, 32, 100);
    const irisInnerMaterial = new THREE.MeshBasicMaterial({
      color: '#4A90A0',
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const irisInner = new THREE.Mesh(irisInnerGeometry, irisInnerMaterial);
    irisInner.rotation.x = Math.PI / 2;
    scene.add(irisInner);

    // Create pupil with more detail
    const pupilGeometry = new THREE.CircleGeometry(0.5, 32);
    const pupilMaterial = new THREE.MeshBasicMaterial({
      color: '#4A90A0',
      wireframe: true,
      side: THREE.DoubleSide,
      opacity: 1,
    });
    const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupil.position.z = 2;
    scene.add(pupil);

    // Create iris details with multiple rings
    const detailsGeometry = new THREE.TorusGeometry(0.7, 0.1, 32, 100);
    const detailsMaterial = new THREE.MeshBasicMaterial({
      color: '#4A90A0',
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const irisDetails = new THREE.Mesh(detailsGeometry, detailsMaterial);
    irisDetails.rotation.x = Math.PI / 2;
    scene.add(irisDetails);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      sclera.rotation.y += 0.003;
      iris.rotation.z += 0.005;
      irisInner.rotation.z -= 0.003;
      pupil.rotation.z += 0.002;
      irisDetails.rotation.z -= 0.004;
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
      className="w-[400px] h-[400px] mx-auto bg-white/10 rounded-full"
      style={{
        boxShadow: `
          0 0 40px rgba(74,144,160,0.4),
          0 0 80px rgba(74,144,160,0.3),
          0 0 120px rgba(74,144,160,0.2)
        `,
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 70%, transparent 100%)'
      }}
    />
  );
};

export default EyeAnimation;
