const slider = () => {
  const slide = document.querySelectorAll('.portfolio-item'),
    slider = document.querySelector('.portfolio-content'),
    dotList = document.querySelector('.portfolio-dots');

  let currentSlide = 0,
    interval,
    dot = document.querySelectorAll('.dot');

  const dotsRender = () => {
    for (let i = 0; i < slide.length; i++) {
      const li = document.createElement('li');
      li.classList.add('dot');
      dotList.appendChild(li);
    };
    dot = document.querySelectorAll('.dot');
    dot[0].classList.add('dot-active');
  };
  dotsRender();

  const removeSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };
  const addSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };
  const autoPlaySlide = () => {
    removeSlide(slide, currentSlide, 'portfolio-item-active');
    removeSlide(dot, currentSlide, 'dot-active');
    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    addSlide(slide, currentSlide, 'portfolio-item-active');
    addSlide(dot, currentSlide, 'dot-active');
  };

  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;
    if (!target.matches('.portfolio-btn, .dot')) {
      return;
    }
    removeSlide(slide, currentSlide, 'portfolio-item-active');
    removeSlide(dot, currentSlide, 'dot-active');
    if (target.matches('#arrow-right')) {
      currentSlide++;
    } else if (target.matches('#arrow-left')) {
      currentSlide--;
    } else if (target.matches('.dot')) {
      dot.forEach((item, index) => {
        if (target === item) {
          currentSlide = index;
        }
      })
    };
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }
    addSlide(slide, currentSlide, 'portfolio-item-active');
    addSlide(dot, currentSlide, 'dot-active');
  });

  slider.addEventListener('mouseover', event => {
    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
      stopSlide();
    }
  });

  slider.addEventListener('mouseout', event => {
    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
      startSlide();
    }
  });

  startSlide(2000);
};

export default slider;