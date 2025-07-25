const btn = document.getElementById('explore-btn'),
  keys = [32,33,34,35,36,37,38,39,40],
  stop = e => e.preventDefault(),
  stopKeys = e => keys.includes(e.keyCode) && e.preventDefault();

['wheel','touchmove'].forEach(e => addEventListener(e, stop, {passive:false}));
addEventListener('keydown', stopKeys, {passive:false});

btn.onclick = () => {
  ['wheel','touchmove'].forEach(e => removeEventListener(e, stop));
  removeEventListener('keydown', stopKeys);

  const S = scrollY, H = innerHeight, D = 1300, T = performance.now(),
    ease = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;

  const step = now => {
    const p = Math.min((now - T) / D, 1);
    scrollTo(0, S + ease(p) * H);
    p < 1 && requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
