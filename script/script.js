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
      } else if (menu.classList.contains('active-menu') && !target.closest('menu')) {
        handlerMenu();
      } else if (target.name === 'user_phone') {
        phoneValid(target);
      } else if (target.name === 'user_name' || target.name === 'user_message') {
        textValid(target);
      } else if (target.type === 'submit') {
        sendForm(target.closest('form').id);
      }
    });
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
        dotList.append(li);
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
  slider();

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
  changeImg();

  const calcValid = () => {
    const calcInput = document.querySelector('.calc');
    const inputNum = (event) => {
      let target = event.target;
      if (target.matches('input')) {
        target.addEventListener('input', () => {
          target.value = target.value.replace(/\D/g, '')
        })
      }
    }
    calcInput.addEventListener('click', inputNum)
  }
  calcValid();


  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      if (calcDay.value < 5 && calcDay.value) {
        dayValue *= 2;
      } else if (calcDay.value < 10 && calcDay.value) {
        dayValue *= 1.5;
      }
      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      const totalAnimate = () => {
        let count = totalValue.textContent;
        const timer = () => {
          requestAnimationFrame(timer);
          if (count < total) {
            count++;
            totalValue.textContent = count;
          } else if (count > total) {
            count--;
            totalValue.textContent = count;
          } else clearInterval(idAnimate);
        };
        const idAnimate = setInterval(timer, 1);
      };
      totalAnimate();
    };

    calcBlock.addEventListener('change', event => {
      let target = event.target;
      if (target.matches('.calc-item')) {
        countSum();
      }
    })
  };
  calc();

  const sendForm = (formId) => {
    const errorMessage = 'Что-то пошло не так',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся';
    const form = document.getElementById(formId);
    let statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: white;';
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.lastChild.remove();
      form.append(statusMessage);
      const formData = new FormData(form);
      statusMessage.textContent = loadMessage;
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });
      postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status not 200');
        }
        statusMessage.textContent = successMessage;
        form.querySelectorAll('input').forEach(item => item.value = '')
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.log(error);
      })
    })

    const postData = (body) => {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/json'
        },
        body: JSON.stringify(body)
      });
    }
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
});