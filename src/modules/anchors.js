const anch = () => {
  const anchBtn = document.querySelector('main a');
  anchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const id = this.getAttribute('href').substring(1);
    const elem = document.getElementById(id);
    window.scroll({
      top: elem.offsetTop,
      behavior: 'smooth'
    });
  });
};


export default anch;