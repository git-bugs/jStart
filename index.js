'use strict';


let startBtn = document.querySelector('#start'),
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
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpenses = document.querySelector('.additional_expenses'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  incomeItem = document.querySelectorAll('.income-items'),
  inputs = document.querySelectorAll('input'),
  periodAmaunt = document.querySelector('.period-amount');



const AppData = function () {
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
};

AppData.prototype.start = function () {
  if (salaryAmount.value !== '') {
    inputs = document.querySelectorAll('input');
    for (let item of inputs) {
      if (item.getAttribute('type') == 'text') item.readOnly = true;
    }
    for (let item of btnPlus) {
      item.style.display = 'none'
    }
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'block';
  } else {
    alert('Введите месячный доход')
  }
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getAddExpenses();
  this.getExpenseMonth();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
};

AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcPeriod();
};

AppData.prototype.reset = function () {
  for (let item of inputs) {
    item.value = '';
    if (item.getAttribute('type') == 'text') item.readOnly = false;
  }
  startBtn.style.display = 'block';
  cancelBtn.style.display = 'none';
  for (let item of btnPlus) {
    item.style.display = 'block';
  }
  for (let i = 1; i < incomeItem.length; i++){
    incomeItem[i].remove();
  }
  for (let i = 1; i < expensesItems.length; i++){
    expensesItems[i].remove();
  }
  this.income = {};
  this.addIncome = [];
  this.incomeMonth = 0;
  this.expenses = {};
  this.expensesMonth = 0;
  this.budgetMonth = 0;
  periodSelect.value = 1;
  periodAmaunt.innerHTML = 1;
};

AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.children[0].value = '';
  cloneExpensesItem.children[1].value = '';
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  this.numOrText();
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    expensesPlus.style.display = 'none';
  }
};

AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItem[0].cloneNode(true);
  cloneIncomeItem.children[0].value = '';
  cloneIncomeItem.children[1].value = '';
  incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  this.numOrText();
  if (incomeItem.length === 3) {
    incomePlus.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function () {
  expensesItems = document.querySelectorAll('.expenses-items');
  for (let item of expensesItems) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
    }
  }
};

AppData.prototype.getIncome = function () {
  incomeItem = document.querySelectorAll('.income-items');
  for (let item of incomeItem) {
    let itemExpenses = item.querySelector('.income-title').value;
    let cashExpenses = item.querySelector('.income-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.income[itemExpenses] = cashExpenses;
      this.budget += +cashExpenses;
    }
  }
  for (let key in this.addIncome) {
    console.log(key);
    this.incomeMonth += +this.addIncome[key]
  }
};

AppData.prototype.getAddExpenses = function () {
  let addExpenses = additionalExpensesItem.value.split(',');
  for (let item of addExpenses) {
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  }
};

AppData.prototype.getAddIncome = function () {
  for (let item of additionalIncomeItem) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  }
};

AppData.prototype.getExpenseMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  };
};

AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
  if (targetAmount.value) {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  } else {
    return 'Нет цели';
  }
};

AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay < 0) {
    console.log('Что то пошло не так');
  } else if (this.budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else if (this.budgetDay <= 1200) {
    console.log('У вас средний уровень дохода');
  } else {
    console.log('У вас высокий уровень дохода');
  }
};

AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент?', 10);
    }
    while (!isNumber(this.percentDeposit))
    do {
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    }
    while (!isNumber(this.moneyDeposit))
  }
};

AppData.prototype.calcPeriod = function () {
  periodAmaunt.innerHTML = periodSelect.value;
  return incomePeriodValue.value = this.budgetMonth * periodSelect.value;
};

AppData.prototype.numOrText = function () {
  inputs = document.querySelectorAll('input');
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].placeholder === 'Сумма') {
      inputs[i].addEventListener('keypress', this.inputNum)
    } else {
      inputs[i].addEventListener('keypress', this.inputText)
    }
  }
};
AppData.prototype.inputNum = function (event) {
  if ((event.keyCode < 48) || (event.keyCode > 57)) event.returnValue = false
};
AppData.prototype.eventListeners = function () {
  cancelBtn.addEventListener('click', this.reset.bind(this))
  expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this))
  incomePlus.addEventListener('click', this.addIncomeBlock.bind(this))
  startBtn.addEventListener('click', this.start.bind(this));
  periodSelect.addEventListener('input', this.calcPeriod.bind(this));
  this.numOrText();
};
AppData.prototype.inputText = function (event) {
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


