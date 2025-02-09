
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EyeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300);
    containerRef.current.appendChild(renderer.domElement);

    // Create eye shape
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: '#4A90A0',
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const eye = new THREE.Mesh(sphereGeometry, material);
    scene.add(eye);

    // Create iris
    const irisGeometry = new THREE.CircleGeometry(0.8, 32);
    const irisMaterial = new THREE.MeshBasicMaterial({
      color: '#4A90A0',
      wireframe: true,
      side: THREE.DoubleSide,
    });
    const iris = new THREE.Mesh(irisGeometry, irisMaterial);
    iris.position.z = 2;
    scene.add(iris);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      eye.rotation.y += 0.005;
      iris.rotation.z += 0.005;
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
      className="w-[300px] h-[300px] mx-auto"
    />
  );
};

export default EyeAnimation;
