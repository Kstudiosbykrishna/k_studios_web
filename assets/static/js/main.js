// Slider + dots logic + lead form submission
(function(){
  // Slider
  const slidesWrap = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const dotsWrap = document.querySelector('.dots');
  let idx = 0, timer;
  function createDots(){
    for(let i=0;i<slides.length;i++){
      const d = document.createElement('div'); d.className='dot';
      d.addEventListener('click', () => go(i));
      dotsWrap.appendChild(d);
    }
    if(dotsWrap.children[0]) dotsWrap.children[0].classList.add('active');
  }
  function update(){ slidesWrap.style.transform = `translateX(${-idx*100}%)`; Array.from(dotsWrap.children).forEach((d,i)=>d.classList.toggle('active', i===idx)); }
  function next(){ idx = (idx + 1) % slides.length; update(); }
  function go(i){ idx = i; update(); reset(); }
  function reset(){ clearInterval(timer); timer = setInterval(next, 4500); }
  if(slides.length){ createDots(); reset(); }

  // Lead form AJAX post
  const leadForm = document.getElementById('leadForm');
  if(leadForm){
    leadForm.addEventListener('submit', async function(e){
      e.preventDefault();
      const formData = new FormData(leadForm);
      const data = {};
      formData.forEach((v,k) => data[k] = v);
      const status = document.getElementById('formStatus');
      status.textContent = 'Sending...';
      try{
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(data)
        });
        const j = await res.json();
        if(j.status === 'ok'){ status.textContent = 'Thanks! We will contact you soon.'; leadForm.reset(); }
        else{ status.textContent = 'Something went wrong, try again.'; }
      }catch(err){ status.textContent = 'Network error, try again.'; }
    });
  }
})();

