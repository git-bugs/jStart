'use strict';

let regBtn = document.getElementById('registerUser'),
  list = document.getElementById('list'),
  userName = document.getElementById('username'),
  dataUsers = []

let registration = function () {
  let name = prompt('Введите имя и фамилию'),
    names = name.split(' '),
    newNames = [],
    count = 0;

  names.forEach(function (item) {
    if (item) {
      newNames[count] = item;
      count++;
    }
  })

  if (newNames.length === 2) {
    name = newNames[0].substring(0, 1).toUpperCase() + newNames[0].substring(1).toLowerCase() + ' ' + newNames[1].substring(0, 1).toUpperCase() + newNames[1].substring(1).toLowerCase();
  } else registration();

  let login = prompt('Логин').trim(),
    password = prompt('Пароль').trim(),
    date = new Date(),
    textDate = date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
    newUser = {
      name: name,
      login: login,
      password: password,
      date: textDate
    };

  dataUsers.push(newUser);

  render();
}

let render = function () {
  list.textContent = '';
  dataUsers.forEach(function (item) {
    let li = document.createElement('li');
    li.classList.add('user-item');
    li.innerHTML = '<span class="user-text">' + item.name + '</span><span class = "user-date">' + item.date + '<span><button class="user-btn">Удалить</button>'
    list.append(li);
    let userBtn = document.querySelectorAll('.user-btn');
    userBtn.forEach(function (item) {
      item.addEventListener('click', function (event) {
        let elemKey = event.target.closest('.user-item').querySelector('.user-text').textContent;
        dataUsers.forEach(function (e, i) {
          if (e.name == elemKey) {
            delete dataUsers[i];
            render();
            localStorage.removeItem(elemKey);
          }
        })
      })
    })
  })
  for (let key in dataUsers) {
    localStorage.setItem(dataUsers[key].name, JSON.stringify(dataUsers[key]))
  }
}

let userLogin = function () {
    let login = prompt('Логин'),
      password = prompt('Пароль'),
      flag = true;
    dataUsers.forEach(function (e) {
      if (e.login == login && e.password == password) {
        userName.textContent = e.name;
        flag = false;
      }
    })
    if (flag) alert('Пользователь не найден');
}

let getLocal = function () {
  for (let i in localStorage) {
    if (localStorage.getItem(i)) {
      dataUsers.push(JSON.parse(localStorage.getItem(i)));
    }
  }
}



regBtn.addEventListener('click', registration);
login.addEventListener('click', userLogin)


getLocal();
render();