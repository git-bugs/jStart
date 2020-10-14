'use strict'

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
  addExpense = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'квартира, проезд, кредит'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 500000;

let start = function(){

  do{
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money)) 
  
};

start();

let showTypeOf = function(data){
  return console.log(typeof(data))
};
showTypeOf(money);
showTypeOf(deposit);

let expenses = [];

let getExpenseMonth = function(){
  let sum = 0, exp;

  for( let i = 0; i < 2; i++){

    expenses[i] = prompt('Введите обязательную статью расходов?');

    do{
      exp = prompt('Во сколько это обойдется?');
    }
    while (!isNumber(exp)) 

    sum += +exp;

  }
  return sum;
};

let expensesAmount = getExpenseMonth();
console.log('Расходы за месяц: ', expensesAmount)

let getAccumulatedMomth = function(){
  return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMomth();

let getTargetMonth = function(){
  let mounths = Math.ceil(mission / accumulatedMonth);

  if ( mounths < 0){
    console.log('Цель не будет достигнута');
  } else {
    console.log('Цель будет достигнута ', mounths);
  };

};
getTargetMonth();



let exp = addExpense.split(', ');
console.log('Возможные расходы: ', exp);

let budgetDay;
budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Дневной бюджет: ', budgetDay);

let getStatusIncome = function(){
  if ( budgetDay < 0){
    console.log('Что то пошло не так');
  } else if (budgetDay < 600){
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else if( budgetDay <= 1200){
    console.log('У вас средний уровень дохода');
  } else {
    console.log('У вас высокий уровень дохода');
  }
};
getStatusIncome();

