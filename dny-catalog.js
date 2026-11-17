document.querySelectorAll('.cat-feature').forEach(feature => {
  const cover = feature.querySelector('.cat-cover');
  const buttons = [...feature.querySelectorAll('button')];
  let current = buttons.findIndex(button => button.getAttribute('aria-pressed') === 'true');
  function select(index) {
    buttons[current].setAttribute('aria-pressed','false');
    current = index;
    const button = buttons[index];
    const image = button.querySelector('img');
    cover.src = image.src;
    cover.alt = image.alt;
    button.setAttribute('aria-pressed','true');
    const strip = button.parentElement;
    if (button.offsetLeft < strip.scrollLeft || button.offsetLeft + button.offsetWidth > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = button.offsetLeft;
  }
  buttons.forEach((button,index) => button.addEventListener('click', () => select(index)));
  let timer;
  new IntersectionObserver(([entry]) => {
    clearInterval(timer);
    if (entry.isIntersecting) timer = setInterval(() => {
      if (!document.hidden && !matchMedia('(prefers-reduced-motion: reduce)').matches && !feature.matches(':hover,:focus-within')) select((current+1)%buttons.length);
    }, 4500);
  }).observe(feature);
});
document.querySelectorAll('.cat-group').forEach(group => {
  const track = group.querySelector('.cat-track');
  group.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
    track.scrollBy({left:Number(button.dataset.step)*(track.clientWidth+14), behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }));
});
