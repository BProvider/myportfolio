import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Call once to initialize
    setCanvasDimensions();

    // Listen for resize events
    window.addEventListener('resize', setCanvasDimensions);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = this.getRandomColor();
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      getRandomColor() {
        const colors = ['#64748b', '#94a3b8', '#38bdf8', '#0ea5e9', '#facc15'];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Initialize particles
    const init = () => {
      particles = [];
      const particleCount = Math.min(150, Math.floor(window.innerWidth * window.innerHeight / 6000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Mouse interaction
    let mouse = { x: 0, y: 0 };
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        // Mouse interaction effect
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particles[i].x -= (dx / distance) * force * 0.5;
          particles[i].y -= (dy / distance) * force * 0.5;
        }
        
        particles[i].update();
        particles[i].draw();
      }
      
      // Connect nearby particles
      connectParticles();
      
      // Draw mouse interaction circle
      drawMouseEffect();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Draw lines between close particles
    const connectParticles = () => {
      const maxDistance = Math.min(200, canvas.width * 0.15);
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 116, 139, ${opacity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Draw mouse interaction effect
    const drawMouseEffect = () => {
      if (mouse.x === 0 && mouse.y === 0) return;
      
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // Initialize and start animation
    init();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};