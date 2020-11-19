const togglePopUp = () => {
  const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popupContent = document.querySelector('.popup-content');

  let count;

  popupBtn.forEach(item => {
    item.addEventListener('click', () => {
      if (screen.width > 768) {
        popup.style.display = 'block';
        count = -popupContent.clientHeight;
        popupContent.style.top = count + 'px';
        popupAnimate();
      } else {
        popup.style.display = 'block';
      }
    });
  });

  popup.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('popup-close')) {
      popup.style.display = 'none';
    } else {
      target = target.closest('.popup-content');
      if (!target) {
        popup.style.display = 'none';
      }
    }

  });

  const popupAnimate = () => {
    let animateName = requestAnimationFrame(popupAnimate);
    if (count < (innerHeight / 2 - popupContent.clientHeight / 2)) {
      count += 20;
      popupContent.style.top = count + 'px';
    } else cancelAnimationFrame(animateName);
  };
};

export default togglePopUp;