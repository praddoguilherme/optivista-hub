
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

    // Create outer eye shape (sclera)
    const scleraGeometry = new THREE.SphereGeometry(2.2, 32, 32);
    const scleraMaterial = new THREE.MeshBasicMaterial({
      color: '#FFFFFF',
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const sclera = new THREE.Mesh(scleraGeometry, scleraMaterial);
    scene.add(sclera);

    // Create iris
    const irisGeometry = new THREE.TorusGeometry(1, 0.3, 16, 50);
    const irisMaterial = new THREE.MeshBasicMaterial({
      color: '#4A90A0',
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const iris = new THREE.Mesh(irisGeometry, irisMaterial);
    iris.rotation.x = Math.PI / 2;
    scene.add(iris);

    // Create pupil
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

    // Create iris details
    const detailsGeometry = new THREE.TorusGeometry(0.7, 0.1, 16, 50);
    const detailsMaterial = new THREE.MeshBasicMaterial({
      color: '#4A90A0',
      wireframe: true,
      transparent: true,
      opacity: 0.6,
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
      className="w-[400px] h-[400px] mx-auto hover:scale-105 transition-transform duration-300"
    />
  );
};

export default EyeAnimation;
