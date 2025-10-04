import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const WorldCanvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    let frameId;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setSize(600, 600);
    renderer.setPixelRatio(window.devicePixelRatio);

    const geometry = new THREE.SphereGeometry(0.9, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0x0a0a23,
      wireframe: true,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const animate = () => {
      sphere.rotation.y += 0.002;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative aspect-square w-full flex justify-center items-center">
      <canvas
        ref={canvasRef}
        style={{ width: '600px', height: '600px', touchAction: 'none' }}
      />
      {/* Sample label like on x.ai */}
      <div
        className="absolute whitespace-nowrap w-40 pointer-events-none"
        style={{ left: '312px', top: '116px', transform: 'translate(-0.5rem, -100%)' }}
      >
        <div className="flex flex-col">
          <div className="size-4 order-2" style={{ background: '#FF6308' }}></div>
          <div className="pl-6 font-mono uppercase text-white text-sm order-1">
            <span>San Francisco • Palo Alto</span><br />
            <span className="opacity-75">37.6145°N,<br />122.3945°W</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldCanvas;
