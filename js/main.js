'use strict'

let money, isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let valid = function(name){
  return isNaN(name[0])
};

let start = function(){
  do{
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){

    if (confirm('Есть ли у вас дополнительный источник заработка?')){
      let itemIncome,cashIncome;
      do{
        itemIncome = prompt('Какой у вас дополнительный заработок?','Таксую');  
      }
      while (!valid(itemIncome)) 
      do{
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      }
      while (!isNumber(cashIncome))  
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'квартира, проезд, кредит');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  getExpenseMonth: function(){
    let exp,z;  
    for( let i = 0; i < 2; i++){   
      do{ 
        z = prompt('Введите обязательную статью расходов?');   
      }
      while (!valid(z)) 
      do{
        exp = prompt('Во сколько это обойдется?');
        appData.expenses[z] = exp;
      }
      while (!isNumber(exp))    
    }
    for (let key in appData.expenses){
      appData.expensesMonth += +appData.expenses[key];
    };
    console.log('Расходы за месяц: ', appData.expensesMonth);
  },
  getBudget: function(){
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function(){
    let mounths = Math.ceil(appData.mission / appData.budgetMonth); 
    if ( mounths < 0){
      console.log('Цель не будет достигнута');
    } else {
      console.log('Цель будет достигнута (месяцев) ', mounths);
    };
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
  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period
  }
}

appData.asking();
appData.getExpenseMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

// for (let key in appData){
//   console.log('данные: ' + key + ' - ' + appData[key]);
// }


for (let key in appData.addExpenses){
  appData.addExpenses[key] = appData.addExpenses[key][0].toUpperCase() + appData.addExpenses[key].slice(1);
}

console.log(appData.addExpenses.toString());