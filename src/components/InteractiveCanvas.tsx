import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface InteractiveCanvasProps {
  theme: 'dark' | 'light';
  heroPhase: number;
  performanceMode?: 'high' | 'balanced' | 'low';
  isVisible?: boolean;
  opacity?: number;
}

export const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({
  theme,
  heroPhase,
  performanceMode = 'low',
  isVisible = true,
  opacity = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isVisibleRef = useRef(isVisible);
  const opacityRef = useRef(opacity);

  useEffect(() => {
    isVisibleRef.current = isVisible;
    opacityRef.current = opacity;
  }, [isVisible, opacity]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: performanceMode === 'high',
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, performanceMode === 'high' ? 2 : 1));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7;

    // Particle Count based on performance
    const particleCount = performanceMode === 'high' ? 2400 : performanceMode === 'balanced' ? 1200 : 600;

    // Geometry & Attributes
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);

    // Generate organic sphere / torus distribution
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.8 + (Math.random() - 0.5) * 0.9;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      scales[i] = Math.random() * 0.8 + 0.2;
      phases[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle texture (procedural soft circle)
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.7, 'rgba(200, 160, 255, 0.25)');
      gradient.addColorStop(1, 'rgba(144, 71, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Material
    const material = new THREE.PointsMaterial({
      size: performanceMode === 'high' ? 0.14 : 0.18,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: theme === 'dark' ? new THREE.Color(0x9047ff) : new THREE.Color(0x7114ff),
      opacity: theme === 'dark' ? 0.75 : 0.6,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Inner wireframe sphere for depth
    const sphereGeo = new THREE.IcosahedronGeometry(2.4, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x6e28d9 : 0x9333ea,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.08 : 0.05,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip heavy operations if user has scrolled past landing page
      if (!isVisibleRef.current || opacityRef.current <= 0.01) {
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      // Rotate group
      particles.rotation.y = elapsedTime * 0.08 + mouseRef.current.x * 0.4;
      particles.rotation.x = elapsedTime * 0.05 + mouseRef.current.y * 0.3;
      sphere.rotation.y = -elapsedTime * 0.05 + mouseRef.current.x * 0.2;
      sphere.rotation.x = -elapsedTime * 0.04 + mouseRef.current.y * 0.2;

      // Morph particles based on wave noise and current hero phase
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const currentPos = posAttr.array as Float32Array;

      const phaseSpeed = 1.0 + heroPhase * 0.25;
      const phaseIntensity = 0.2 + heroPhase * 0.06;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];
        const p = phases[i];

        // Complex trigonometric undulation
        const wave = Math.sin(elapsedTime * phaseSpeed + p) * phaseIntensity;
        const dist = 1 + wave * Math.sin(ox * 0.5 + elapsedTime * 0.5);

        currentPos[i3] = ox * dist;
        currentPos[i3 + 1] = oy * dist;
        currentPos[i3 + 2] = oz * dist;
      }
      posAttr.needsUpdate = true;

      // Color reaction
      if (theme === 'dark') {
        material.color.setHSL(0.72 + Math.sin(elapsedTime * 0.2) * 0.05, 0.9, 0.65);
      } else {
        material.color.setHSL(0.75 + Math.sin(elapsedTime * 0.2) * 0.05, 0.8, 0.45);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      renderer.dispose();
    };
  }, [theme, heroPhase, performanceMode]);

  return (
    <div
      ref={containerRef}
      style={{
        opacity: isVisible ? opacity : 0,
        display: isVisible && opacity > 0.01 ? 'block' : 'none',
      }}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-500 ease-out"
      aria-hidden="true"
    />
  );
};
