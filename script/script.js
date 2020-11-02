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
        hours = Math.floor(timeRemainig / 60 / 60) % 24;
      return { timeRemainig, hours, minutes, seconds };
    }
    function updateClock() {
      let timer = getTimeRemaining();
      if (timer.timeRemainig > 0) {
        timeHours.textContent = timer.hours < 10? '0' + timer.hours: timer.hours;
        timeMinuts.textContent = timer.minutes < 10? '0' + timer.minutes: timer.minutes;
        timeSeconds.textContent = timer.seconds < 10? '0' + timer.seconds: timer.seconds;
      } else {
        clearInterval(timerId);
        document.getElementById('timer').style.color = 'red';
      }        
    }
    const timerId = setInterval(updateClock, 1000);
  }
  countTimer('04 november 2020')
})