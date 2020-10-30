'use strict';

const startBtn = document.querySelector('#start'),
  cancelBtn = document.getElementById('cancel'),
  btnPlus = document.querySelectorAll('.btn_plus'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  depositCheck = document.querySelector('#deposit-check'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  expensesTitle = document.querySelector('.expenses-title'),
  additionalExpenses = document.querySelector('.additional_expenses'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  periodAmaunt = document.querySelector('.period-amount'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');

let inputs = document.querySelectorAll('input'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItem = document.querySelectorAll('.income-items');



class AppData {
  constructor() {
    this.budget = 0,
      this.budgetMonth = 0,
      this.budgetDay = 0,
      this.income = {},
      this.addIncome = [],
      this.incomeMonth = 0,
      this.expenses = {},
      this.addExpenses = [],
      this.deposit = false,
      this.percentDeposit = 0,
      this.moneyDeposit = 0,
      this.mission = 50000,
      this.expensesMonth = 0;
  }
  start() {
    if (salaryAmount.value !== '') {
      inputs = document.querySelectorAll('input');
      for (let item of inputs) {
        if (item.getAttribute('type') == 'text') {
          item.readOnly = true;
          item.style.background = '#ccc';
        }
      }
      for (let item of btnPlus) {
        item.style.display = 'none'
      }
      startBtn.style.display = 'none';
      cancelBtn.style.display = 'block';
      this.budget = +salaryAmount.value;
      this.getExpInc();
      this.getAddExpenses();
      this.getAddIncome();
      this.getInfoDeposit();
      this.getBudget();
      this.showResult();
      this.pushData();
    } else {
      alert('Введите месячный доход')
    }
  };
  pushData() {
    const items = document.querySelectorAll('.result-total');
    items.forEach(item => {
      const key = item.className.split(' ')[1];
      localStorage.setItem(key, item.value);
      document.cookie = `${key} = ${item.value}`;
      document.cookie = 'isLoad=true';
    });
  };
  getData() {
    if (localStorage['expenses_month-value']) {
      for (let item of inputs) {
        item.value = '';
        if (item.getAttribute('type') == 'text') {
          item.readOnly = true;
          item.style.background = '#ccc';
        }
      }
      for (let i in localStorage) {
        if (localStorage.getItem(i)) {
          startBtn.style.display = 'none';
          cancelBtn.style.display = 'block';
          document.querySelector(`.${i}`).value = localStorage[i]
        }
      }
    }
  };
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
  };
  reset() {
    for (let item of inputs) {
      item.value = '';
      item.style.background = 'transparent';
      if (item.getAttribute('type') == 'text') item.readOnly = false;
    }
    startBtn.style.display = 'block';
    cancelBtn.style.display = 'none';
    for (let item of btnPlus) {
      item.style.display = 'block';
    }
    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItem = document.querySelectorAll('.income-items');
    for (let i = 1; i < incomeItem.length; i++) {
      incomeItem[i].remove();
    }
    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].remove();
    }
    for (let key in localStorage) {
      localStorage.removeItem(key)
    }
    const cookieTemp = document.cookie.split(';');
    for (let item of cookieTemp){
      document.cookie = item.trim().slice(0, item.indexOf('=')) + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    }
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.expensesMonth = 0;
    this.budgetMonth = 0;
    depositCheck.checked = false;
    this.moneyDeposit = 0;
    this.depositHandler();
    periodSelect.value = 1;
    periodAmaunt.innerHTML = 1;
  };
  addBlock() {
    const classBtn = this.className.split(' ')[1].split('_')[0];
    const cloneItem = document.querySelectorAll(`.${classBtn}-items`)[0].cloneNode(true);
    cloneItem.children[0].value = '';
    cloneItem.children[1].value = '';
    document.querySelectorAll(`.${classBtn}-items`)[0].parentNode.insertBefore(cloneItem, this);
    incomeItem = document.querySelectorAll(`.${classBtn}-items`);
    if (incomeItem.length === 3) {
      this.style.display = 'none';
    }
    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItem = document.querySelectorAll('.income-items');
    numOrText();
  };
  getExpInc() {
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = itemAmount;
      }
    }
    incomeItem.forEach(count);
    expensesItems.forEach(count);
  };
  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    for (let item of addExpenses) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }
  };
  getAddIncome() {
    for (let item of additionalIncomeItem) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }
  };
  getBudget() {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key]
    };
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    };
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  };
  getTargetMonth() {
    if (targetAmount.value) {
      return Math.ceil(targetAmount.value / this.budgetMonth);
    } else return 'Нет цели';
  };
  calcPeriod() {
    periodAmaunt.innerHTML = periodSelect.value;
    return incomePeriodValue.value = this.budgetMonth * periodSelect.value;
  };
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block'
    } else {
      depositPercent.value = valueSelect;
    }
  };
  percentChangeValue() {
    if (depositPercent.value < 101) {
      startBtn.disabled = false;
      startBtn.style.background = '#353a43';
      startBtn.style.cursor = 'pointer';
    } else {
      startBtn.disabled = true;
      startBtn.style.background = 'red';
      startBtn.style.cursor = 'default';
      alert('Введите процент от 0 до 100');

    }
  };
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositPercent.value = '';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  };
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  };
  eventListeners() {
    this.getData();
    cancelBtn.addEventListener('click', this.reset.bind(this));
    expensesPlus.addEventListener('click', this.addBlock);
    incomePlus.addEventListener('click', this.addBlock);
    startBtn.addEventListener('click', this.start.bind(this));
    periodSelect.addEventListener('input', this.calcPeriod.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    depositPercent.addEventListener('input', this.percentChangeValue);
    document.addEventListener('focus', this.checkCookie.bind(this));
    numOrText();
  };
  checkCookie() {
    const cookieArray = document.cookie.split(';')
    const temp = [];
    for (let item of cookieArray) {
      if (item.slice(item.indexOf('-') + 1, item.indexOf('=')) === 'value') {   
        temp.push(item.trim().split('='));
      }
    }
    if (temp.length === localStorage.length) {
      temp.forEach( item => {
        if (localStorage.getItem(item[0]) == item[1]) {
        } else this.reset();
      })
    } else this.reset()
  };
};
const numOrText = function () {
  inputs = document.querySelectorAll('input');
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].placeholder === 'Сумма' || inputs[i].placeholder === 'Процент') {
      inputs[i].addEventListener('keypress', inputNum)
    } else {
      inputs[i].addEventListener('keypress', inputText)
    }
  }
};
const inputNum = function (event) {
  if ((event.keyCode < 48) || (event.keyCode > 57)) event.returnValue = false
};
const inputText = function (event) {
  if ((event.keyCode > 43) && (event.keyCode < 47)) {
    event.returnValue = true;
  } else if ((event.keyCode > 1039) && (event.keyCode < 1104)) {
    event.returnValue = true;
  } else if (event.keyCode === 32) {
    event.returnValue = true;
  } else {
    event.returnValue = false;
  }
};

const appData = new AppData();
appData.eventListeners();





