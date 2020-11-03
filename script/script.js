window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const countTimer = function (deadline) {
    const timeHours = document.querySelector('#timer-hours'),
      timeMinuts = document.querySelector('#timer-minutes'),
      timeSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemainig = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemainig % 60),
        minutes = Math.floor((timeRemainig / 60) % 60),
        hours = Math.floor(timeRemainig / 60 / 60);
      return { timeRemainig, hours, minutes, seconds };
    }
    function updateClock() {
      let timer = getTimeRemaining();
      if (timer.timeRemainig > 0) {
        timeHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
        timeMinuts.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
        timeSeconds.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;
      } else {
        clearInterval(timerId);
        document.getElementById('timer').style.color = 'red';
      }
    }
    const timerId = setInterval(updateClock, 1000);
  }
  countTimer('14 november 2020')

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li>a');
    const handlerMenu = function () {
      menu.classList.toggle('active-menu');
    };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach(item => item.addEventListener('click', function (e) {
      e.preventDefault();
      menu.classList.toggle('active-menu');
      scroll(this);
    }));
  };
  toggleMenu();


  const anch = () => {
    const anchBtn = document.querySelector('main a');
    anchBtn.addEventListener('click', function (event) {
      event.preventDefault();
      scroll(this);
    });
  };
  const scroll = item => {
    const id = item.getAttribute('href').substring(1);
    const elem = document.getElementById(id);
    window.scroll({
      top: elem.offsetTop,
      behavior: 'smooth'
    });
  };
  anch();


  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close'),
      popupContent = document.querySelector('.popup-content')

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

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    const popupAnimate = () => {
      let animateName = requestAnimationFrame(popupAnimate);
      if (count < (innerHeight / 2 - popupContent.clientHeight / 2)) {
        count += 20;
        popupContent.style.top = count + 'px';
      } else cancelAnimationFrame(animateName);
    };
  };
  togglePopUp();

 










});