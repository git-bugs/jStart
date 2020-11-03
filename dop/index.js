'use strict';


const date = new Date(),
dayArray = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
hour = date.getHours() > 18? 'Добрый вечер': date.getHours() > 9? 'Добрый день': date.getHours() > 6? 'Доброу утро':  'Доброй ночи',
day = dayArray[date.getDay()],
time = date.toLocaleTimeString('en-Us'),
days = Math.floor((new Date('2021').getTime() - new Date().getTime()) / 3600 / 24 / 1000);

document.write(hour + '</br>Сегодня: ' + day + '</br>Текущее время: ' + time + `</br>До нового года осталось ${days} дней`);
