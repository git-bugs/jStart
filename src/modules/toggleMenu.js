const toggleMenu = () => {
  const menu = document.querySelector('menu');

  const handlerMenu = function () {
    menu.classList.toggle('active-menu');
  };
  const scroll = item => {
    const id = item.getAttribute('href').substring(1);
    const elem = document.getElementById(id);
    window.scroll({
      top: elem.offsetTop,
      behavior: 'smooth'
    });
  };
  const phoneValid = target => {
    target.addEventListener('input', () => {
      target.value = target.value.replace(/[^\+\d]/, '');
    })
  };
  const textValid = target => {
    target.addEventListener('input', () => {
      target.value = target.value.replace(/[^а-я ]/i, '');
    })
  };
  document.body.addEventListener('click', (event) => {
    let target = event.target;
    if (target.matches('menu li>a')) {
      event.preventDefault();
      handlerMenu();
      scroll(target);
    } else if (target.matches('.close-btn') || target.closest('.menu')) {
      handlerMenu();
    } else if (menu.classList.contains('active-menu') && !target.closest('menu')) {
      handlerMenu();
    } else if (target.name === 'user_phone') {
      phoneValid(target);
    } else if (target.name === 'user_name' || target.name === 'user_message') {
      textValid(target);
    }
  });
};

export default toggleMenu;