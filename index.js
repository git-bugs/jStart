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
  inputs = document.querySelectorAll('input')


let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};


let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  incomeMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getAddExpenses();
    this.getExpenseMonth();
    this.getAddIncome();

    this.getBudget();
    this.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
  },
  reset: function () {
    for (let item of inputs) {
      item.value = '';
      if (item.getAttribute('type') == 'text') item.readOnly = false;
    }
    startBtn.style.display = 'block';
    cancelBtn.style.display = 'none';
    for (let item of btnPlus) {
      item.style.display = 'block';
    }
    appData.income = {};
    appData.addIncome = [];
    appData.incomeMonth = 0;
    appData.expenses = {};
    appData.expensesMonth = 0;
    console.log(appData);
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.children[0].value = '';
    cloneExpensesItem.children[1].value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    inputs = document.querySelectorAll('input');
    appData.numOrText();
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    cloneIncomeItem.children[0].value = '';
    cloneIncomeItem.children[1].value = '';
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    inputs = document.querySelectorAll('input');
    appData.numOrText();
    incomeItem = document.querySelectorAll('.income-items');
    if (incomeItem.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: function () {
    for (let item of expensesItems) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    }
  },
  getIncome: function () {
    for (let item of incomeItem) {
      let itemExpenses = item.querySelector('.income-title').value;
      let cashExpenses = item.querySelector('.income-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.income[itemExpenses] = cashExpenses;
        this.budget += +cashExpenses;
      }
    }
    for (let key in this.addIncome) {
      this.incomeMonth += +this.addIncome[key]
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    for (let item of addExpenses) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }
  },
  getAddIncome: function () {
    for (let item of additionalIncomeItem) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }
  },
  getExpenseMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    };
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function () {
    if (this.budgetDay < 0) {
      console.log('Что то пошло не так');
    } else if (this.budgetDay < 600) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay <= 1200) {
      console.log('У вас средний уровень дохода');
    } else {
      console.log('У вас высокий уровень дохода');
    }
  },
  getInfoDeposit: function () {
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
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
  numOrText: function () {
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].placeholder === 'Сумма') {
        inputs[i].addEventListener('keypress', inputNum)
      } else {
        inputs[i].addEventListener('keypress', inputText)
      }
    }
  }
};

startBtn.addEventListener('click', function () {
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
    appData.start();
  } else {
    alert('Введите месячный доход')
  }
});

cancelBtn.addEventListener('click', appData.reset)
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);


periodSelect.addEventListener('input', function () {
  document.querySelector('.period-amount').innerHTML = periodSelect.value;
  if (salaryAmount.value) incomePeriodValue.value = appData.budgetMonth * periodSelect.value;

});

let inputNum = function (event) {
  if ((event.keyCode < 48) || (event.keyCode > 57)) event.returnValue = false
}

let inputText = function (event) {
  if ((event.keyCode > 43) && (event.keyCode < 47)) {
    event.returnValue = true;
  } else if ((event.keyCode > 1039) && (event.keyCode < 1104)) {
    event.returnValue = true;
  } else if (event.keyCode === 32) {
    event.returnValue = true;
  } else {
    event.returnValue = false;
  }
}

appData.numOrText();







