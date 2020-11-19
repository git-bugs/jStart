const changeImg = () => {
  const images = document.getElementById('command');
  const toggle = event => {
    let target = event.target;
    if (target.classList.contains('command__photo')) {
      [target.src, target.dataset.img] = [target.dataset.img, target.src];
    }
  }
  images.addEventListener('mouseout', toggle);
  images.addEventListener('mouseover', toggle);
};

export default changeImg;