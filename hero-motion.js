(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const tiles = [...hero.querySelectorAll('.tile')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(any-pointer: fine)');
  let pendingFrame = 0;
  let pointer = null;

  function reset() {
    cancelAnimationFrame(pendingFrame);
    pendingFrame = 0;
    pointer = null;
    for (const tile of tiles) {
      tile.style.removeProperty('--mx');
      tile.style.removeProperty('--my');
    }
  }

  function move() {
    pendingFrame = 0;
    if (!pointer || reducedMotion.matches || !finePointer.matches) return;
    const bounds = hero.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (pointer.x - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (pointer.y - bounds.top) / bounds.height * 2 - 1));
    tiles.forEach((tile, index) => {
      const depth = 20 + index % 4 * 7;
      tile.style.setProperty('--mx', `${(x * depth).toFixed(2)}px`);
      tile.style.setProperty('--my', `${(y * depth * .75).toFixed(2)}px`);
    });
  }

  hero.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || reducedMotion.matches || !finePointer.matches) return;
    pointer = { x: event.clientX, y: event.clientY };
    if (!pendingFrame) pendingFrame = requestAnimationFrame(move);
  }, { passive: true });
  hero.addEventListener('pointerleave', reset);
  hero.addEventListener('pointercancel', reset);
  window.addEventListener('blur', reset);
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  reducedMotion.addEventListener('change', reset);
  finePointer.addEventListener('change', reset);
})();
