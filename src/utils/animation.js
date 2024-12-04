export function createMovingElement(element) {
  // Set initial position in the middle of the screen
  let x = (window.innerWidth - 150) / 2;
  let y = (window.innerHeight - 150) / 2;
  let dx = 5;
  let dy = 5;

  function animate() {
    x += dx;
    y += dy;

    // Bounce off walls, using fixed dimensions
    if (x <= 0 || x >= window.innerWidth - 150) {
      dx = -dx;
    }
    if (y <= 0 || y >= window.innerHeight - 150) {
      dy = -dy;
    }

    element.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animate);
  }

  return animate;
}