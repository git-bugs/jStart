'use strict';


let start = document.querySelector('#start'),
  btnPlus = document.querySelectorAll('button'),
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


  let isNumber = function(n){
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
    start: function(){
      appData.budget = +salaryAmount.value;

      appData.getExpenses();
      appData.getIncome();
      appData.getAddExpenses();
      appData.getExpenseMonth();
      appData.getAddIncome();
      
      appData.getBudget();
      appData.showResult();
    },
    showResult: function(){
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = appData.getTargetMonth();
      incomePeriodValue.value = appData.calcPeriod();
      periodSelect.addEventListener('input', function(e){    
        appData.calcPeriod();
      });
    },
    addExpensesBlock: function(){
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      cloneExpensesItem.children[0].value = '';
      cloneExpensesItem.children[1].value = '';
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3){
        expensesPlus.style.display = 'none';
      }
    },
    addIncomeBlock: function(){
      let cloneIncomeItem = incomeItem[0].cloneNode(true);
      cloneIncomeItem.children[0].value = '';
      cloneIncomeItem.children[1].value = '';
      incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItem = document.querySelectorAll('.income-items');
      if (incomeItem.length === 3){
        incomePlus.style.display = 'none';
      }
    },
    getExpenses: function(){
      expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== ''){
          appData.expenses[itemExpenses] = cashExpenses;
        }
      })
    },
    getIncome: function(){
      incomeItem.forEach(function(item){
        let itemExpenses = item.querySelector('.income-title').value;
        let cashExpenses = item.querySelector('.income-amount').value;
        if (itemExpenses !== '' && cashExpenses !== ''){
          appData.income[itemExpenses] = cashExpenses;
          appData.addIncome.push(cashExpenses);
        }
      })

      for (let key in appData.addIncome){
        appData.incomeMonth += +appData.addIncome[key]
      }
    },
    getAddExpenses: function(){
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item){
        item = item.trim();
        if(item !== ''){
          appData.addExpenses.push(item);
        }
      })
    },
    getAddIncome: function(){
      additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ''){
          appData.addIncome.push(itemValue);
        }
      })
    },
    getExpenseMonth: function(){
      for (let key in appData.expenses){
        appData.expensesMonth += +appData.expenses[key];
      };
    },
    getBudget: function(){
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
      return Math.ceil(targetAmount.value / appData.budgetMonth);
    },
    getStatusIncome: function(){
      if ( appData.budgetDay < 0){
        console.log('Что то пошло не так');
      } else if (appData.budgetDay < 600){
        console.log('К сожалению у вас уровень дохода ниже среднего');
      } else if( appData.budgetDay <= 1200){
        console.log('У вас средний уровень дохода');
      } else {
        console.log('У вас высокий уровень дохода');
      }
    },
    getInfoDeposit: function(){
      if(appData.deposit){
        do{
          appData.percentDeposit = prompt('Какой годовой процент?', 10);
        }
        while (!isNumber(appData.percentDeposit))  
        do{
          appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        }
        while (!isNumber(appData.moneyDeposit))  
      }
    },
    calcPeriod: function(){
      return appData.budgetMonth * periodSelect.value
    }
  };

  start.addEventListener('click', function(e){
    if (salaryAmount.value !== '' && isNumber(salaryAmount.value)){
      appData.start();
    } else {
      alert ('Введите месячный доход')
    }
  });

  expensesPlus.addEventListener('click', appData.addExpensesBlock);
  incomePlus.addEventListener('click', appData.addIncomeBlock);


  periodSelect.addEventListener('input', function(e){    
    document.querySelector('.period-amount').innerHTML = periodSelect.value;
    appData.showResult();
  });


  let inputNum = function(event){
    if((event.keyCode < 48)||(event.keyCode > 57)) event.returnValue=false
  }

  let inputText = function(event){
    if((event.keyCode > 43) && (event.keyCode < 47)) {
      event.returnValue=true;
    } else if ((event.keyCode > 1039) && (event.keyCode < 1104)){
      event.returnValue=true;
    } else if (event.keyCode === 32){
      event.returnValue=true;
    } else {
      event.returnValue=false;
    }
  }


  for (let i = 0; i < inputs.length; i++){
    if(inputs[i].placeholder === 'Сумма'){
      inputs[i].addEventListener('keypress', inputNum)
    } else {
      inputs[i].addEventListener('keypress', inputText)
    }
  }

  
