/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  speedZ: number;
  brightness: number;
  color: string;
}

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
}

export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle pool with 3D projection coordinates
    const particles: Particle[] = [];
    const isMobileDevice = width < 768;
    const particleCount = isMobileDevice ? 20 : Math.min(65, Math.floor((width * height) / 15000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1000 + 100,
        size: Math.random() * 2 + 1,
        speedZ: -Math.random() * 0.4 - 0.1,
        brightness: Math.random() * 0.5 + 0.5,
        color: Math.random() > 0.3 ? "rgba(90, 90, 64, " : "rgba(138, 138, 107, " // sage or organic soft sage-brown
      });
    }

    // Floating large soft bokeh orbs
    const orbs: Orb[] = [];
    const orbCount = isMobileDevice ? 0 : 5;
    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 150 + 100,
        alpha: 0,
        targetAlpha: Math.random() * 0.08 + 0.02
      });
    }

    // Resize events
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse movement listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - width / 2) / (width / 2);
      mouseRef.current.targetY = (e.clientY - height / 2) / (height / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Scroll listener for parallax
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Render loop
    const render = () => {
      ctx.fillStyle = "#fdfcf7";
      ctx.fillRect(0, 0, width, height);

      // Damp mouse movement
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const currentScroll = scrollRef.current;

      // Draw active floating bokeh gradients (skipped on mobile for 60fps performance)
      if (!isMobileDevice) {
        ctx.globalCompositeOperation = "multiply";
        orbs.forEach((orb) => {
          orb.x += orb.vx;
          orb.y += orb.vy;

          // Bounce walls
          if (orb.x < -orb.radius) orb.x = width + orb.radius;
          if (orb.x > width + orb.radius) orb.x = -orb.radius;
          if (orb.y < -orb.radius) orb.y = height + orb.radius;
          if (orb.y > height + orb.radius) orb.y = -orb.radius;

          orb.alpha += (orb.targetAlpha - orb.alpha) * 0.01;

          // Apply scroll drift (parallax on back layer)
          const scrollOffset = currentScroll * 0.15;

          const gradient = ctx.createRadialGradient(
            orb.x + mouse.x * 30,
            orb.y + mouse.y * 30 - scrollOffset,
            0,
            orb.x + mouse.x * 30,
            orb.y + mouse.y * 30 - scrollOffset,
            orb.radius
          );
          gradient.addColorStop(0, `rgba(90, 90, 64, ${orb.alpha})`);
          gradient.addColorStop(0.5, `rgba(209, 204, 186, ${orb.alpha * 0.4})`);
          gradient.addColorStop(1, "rgba(253, 252, 247, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(
            orb.x + mouse.x * 30,
            orb.y + mouse.y * 30 - scrollOffset,
            orb.radius,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });
      }

      // Render & project particles with 3D perspective rotation
      // Center of projection
      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 400; // Focal length

      // Apply slow rotation around Y & X axes based on mouse and time
      const angleY = mouse.x * 0.08 + Date.now() * 0.00002;
      const angleX = mouse.y * 0.08 + Date.now() * 0.00001;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      particles.forEach((p) => {
        // Z movement
        p.z += p.speedZ;
        if (p.z < 10) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * 2000;
          p.y = (Math.random() - 0.5) * 2000;
        }

        // Apply scroll-impact based on depth
        // Deeper particles move slower (parallax)
        const scrollParallax = currentScroll * (200 / p.z); // deeper particles have smaller scroll offset
        const py = p.y - scrollParallax;

        // 3D rotation around origin (0, 0, 500)
        // 1. Shift to origin of rotation
        let rx = p.x;
        let ry = py;
        let rz = p.z - 500;

        // Rotate Y
        let x1 = rx * cosY - rz * sinY;
        let z1 = rx * sinY + rz * cosY;

        // Rotate X
        let y2 = ry * cosX - z1 * sinX;
        let z2 = ry * sinX + z1 * cosX;

        // Shift back
        rz = z2 + 500;

        // Clip behind camera
        if (rz <= 50) return;

        // 3D Projection
        const scale = fov / rz;
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        // Draw only if on screen
        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          const depthAlpha = Math.min(1, scale * 1.5) * (1 - rz / 1000);
          const alpha = p.brightness * depthAlpha * 0.7;

          ctx.fillStyle = p.color + alpha + ")";
          ctx.beginPath();
          ctx.arc(projX, projY, p.size * scale * 0.6, 0, Math.PI * 2);
          ctx.fill();

          // Subtle glow for closer particles (built via lightweight overlapping concentric arcs for 10x rendering speed)
          if (rz < 350) {
            ctx.fillStyle = "rgba(90, 90, 64, " + alpha * 0.25 + ")";
            ctx.beginPath();
            ctx.arc(projX, projY, p.size * scale * 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      ctx.globalCompositeOperation = "source-over";
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="royal-bg-canvas"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
