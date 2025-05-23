// Blockchain background animation
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'blockchain-bg';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const nodes = [];
  const connections = [];
  const nodeCount = 20;

  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: 4
    });
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw nodes
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;
      
      // Bounce off walls
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;
      
      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#60A5FA';
      ctx.fill();
    });

    // Draw connections
    nodes.forEach((node1, i) => {
      nodes.slice(i + 1).forEach(node2 => {
        const dx = node2.x - node1.x;
        const dy = node2.y - node1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(node1.x, node1.y);
          ctx.lineTo(node2.x, node2.y);
          ctx.strokeStyle = `rgba(96, 165, 250, ${1 - distance / 150})`;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  }

  // Handle resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  animate();
});