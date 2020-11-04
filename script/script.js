window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const countTimer = function (deadline) {
    const timeHours = document.querySelector('#timer-hours'),
      timeMinuts = document.querySelector('#timer-minutes'),
      timeSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemainig = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemainig % 60),
        minutes = Math.floor((timeRemainig / 60) % 60),
        hours = Math.floor(timeRemainig / 60 / 60);
      return { timeRemainig, hours, minutes, seconds };
    }
    const updateClock = () => {
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
    const menu = document.querySelector('menu');

    const handlerMenu = function () {
      menu.classList.toggle('active-menu');
    };

    document.body.addEventListener('click', (event) => {
      let target = event.target;
      if (target.matches('menu li>a')) {
        event.preventDefault();
        handlerMenu();
        scroll(target);
      } else if (target.matches('.close-btn') || target.closest('.menu')) {
        handlerMenu();
      } else if (menu.classList.contains('active-menu') && !target.closest('menu')) handlerMenu();
    })
  };
  toggleMenu();


  const anch = () => {
    const anchBtn = document.querySelector('main a');
    anchBtn.addEventListener('click', function (event) {
      event.preventDefault();
      scroll(this);
    });
  };
  anch();
  const scroll = item => {
    const id = item.getAttribute('href').substring(1);
    const elem = document.getElementById(id);
    window.scroll({
      top: elem.offsetTop,
      behavior: 'smooth'
    });
  };


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
  togglePopUp();

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');
    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target.classList.contains('service-header-tab')) {
        tab.forEach((item, index) => {
          if (item === target) {
            toggleTabContent(index);
          }
        });
      }
    });
  };
  tabs();


});