const btn = document.getElementById('explore-btn'),
  homeLink = document.querySelector('a[href="#home"]'),
  keys = [32,33,34,35,36,37,38,39,40],
  stop = e => e.preventDefault(),
  stopKeys = e => keys.includes(e.keyCode) && e.preventDefault();

['wheel','touchmove'].forEach(e => addEventListener(e, stop, {passive:false}));
addEventListener('keydown', stopKeys, {passive:false});

const smoothScroll = (targetY) => {
  const S = scrollY, D = 300, T = performance.now(),
    ease = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;
  const step = now => {
    const p = Math.min((now - T) / D, 1);
    scrollTo(0, S + (targetY - S) * ease(p));
    p < 1 && requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

btn.onclick = () => {
  ['wheel','touchmove'].forEach(e => removeEventListener(e, stop));
  removeEventListener('keydown', stopKeys);
  smoothScroll(innerHeight);
};

homeLink.onclick = (e) => {
  e.preventDefault();
  smoothScroll(0);
};
