import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as topojson from 'topojson-client';

const locations = [
  { name: 'San Francisco • Palo Alto', lat: 37.7749, lng: -122.4194 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946 }
];

const GlobeVisualization = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const pointLight = new THREE.PointLight(0xab2fea, 1.2);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Globe
    const globeGeometry = new THREE.SphereGeometry(5, 64, 64);
    const globeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1a,
      metalness: 0.8,
      roughness: 0.25,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      reflectivity: 1,
      transparent: true,
      opacity: 0.95
    });
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    globeMesh.rotation.x = Math.PI / 8;
    scene.add(globeMesh);

    // Convert lat/lng to 3D position
    const latLngToVector3 = (lat, lng, radius = 5.05) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Markers & Labels
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xab2fea });
    locations.forEach((loc) => {
      const marker = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), markerMaterial);
      marker.position.copy(latLngToVector3(loc.lat, loc.lng));
      scene.add(marker);
      loc.marker = marker;

      const label = document.createElement('div');
      label.className = 'absolute text-white font-mono text-[0.6rem] sm:text-xs';
      label.innerHTML = `<strong>${loc.name}</strong><br/>${Math.abs(loc.lat).toFixed(2)}°${loc.lat >= 0 ? 'N' : 'S'}, ${Math.abs(loc.lng).toFixed(2)}°${loc.lng >= 0 ? 'E' : 'W'}`;
      label.style.position = 'absolute';
      label.style.pointerEvents = 'none';
      label.style.zIndex = '10';
      container.appendChild(label);

      loc.label = label;
      loc.position = marker.position.clone();
    });

    // Curved Arcs
    const arcMaterial = new THREE.LineBasicMaterial({
      color: 0xab2fea,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const start = latLngToVector3(locations[i].lat, locations[i].lng);
        const end = latLngToVector3(locations[j].lat, locations[j].lng);
        const distance = start.distanceTo(end);
        const arcHeight = 2 + distance * 0.3;

        const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(5 + arcHeight);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        scene.add(new THREE.Line(geometry, arcMaterial));
      }
    }

    // Country Borders
    fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
      .then(res => res.json())
      .then(worldData => {
        const countries = topojson.feature(worldData, worldData.objects.countries).features;
        countries.forEach(country => {
          const coordsList = country.geometry.type === 'MultiPolygon'
            ? country.geometry.coordinates.flat()
            : country.geometry.coordinates;

          coordsList.forEach(polygon => {
            const geometry = new THREE.BufferGeometry();
            const vertices = [];

            polygon.forEach(([lng, lat]) => {
              const vec = latLngToVector3(lat, lng);
              vertices.push(vec.x, vec.y, vec.z);
            });

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

            const borderMaterial = new THREE.LineBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.3,
              blending: THREE.AdditiveBlending
            });

            scene.add(new THREE.LineLoop(geometry, borderMaterial));
          });
        });
      });

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.5; // 🚀 Increased speed here
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      const visibleLabels = [];

      locations.forEach(loc => {
        const worldPos = loc.marker.getWorldPosition(new THREE.Vector3());
        const dirToCamera = new THREE.Vector3().subVectors(camera.position, worldPos).normalize();
        const markerNormal = worldPos.clone().normalize();
        const dot = markerNormal.dot(dirToCamera);
        const isFacingCamera = dot > 0.2;

        if (isFacingCamera) visibleLabels.push(loc);
      });

      locations.forEach(loc => {
        if (visibleLabels.includes(loc) && visibleLabels.length <= 2) {
          const vector = loc.position.clone();
          vector.project(camera);
          const x = (vector.x * 0.5 + 0.5) * container.clientWidth;
          const y = (-vector.y * 0.5 + 0.5) * container.clientHeight;
          loc.label.style.left = `${x}px`;
          loc.label.style.top = `${y}px`;
          loc.label.style.transform = 'translate(-50%, -100%)';
          loc.label.style.display = 'block';
        } else {
          loc.label.style.display = 'none';
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      container.innerHTML = '';
      window.removeEventListener('resize', handleResize);
      locations.forEach(loc => loc.label.remove());
    };
  }, []);

  return <div ref={containerRef} className="relative w-full h-[500px] sm:h-[600px]" />;
};

export default GlobeVisualization;
