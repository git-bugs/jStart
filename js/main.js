'use strict'


let money = +prompt('Ваш месячный доход?', 50000),
  addExpense = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'квартира, проезд, кредит'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  expense1 = prompt('Введите обязательную статью расходов?'),
  amount1 = +prompt('Во сколько это обойдется?', 5000),
  expense2 = prompt('Введите обязательную статью расходов?'),
  amount2 = +prompt('Во сколько это обойдется?', 5000),
  mission = 500000;

let showTypeOf = function(data){
  return console.log(typeof(data))
};
showTypeOf(money);
showTypeOf(deposit);

let getExpenseMonth = function(a1, a2){
  return a1 + a2;
};
let allExp = getExpenseMonth(amount1,amount2);
console.log('Расходы за месяц: ', allExp)

let getAccumulatedMomth = function(a , b){
  return a - b;
};
let accumulatedMonth = getAccumulatedMomth(money, getExpenseMonth(amount1,amount2));

let getTargetMonth = function(a , b){
  return Math.ceil(a / b);
};
let mounths = getTargetMonth(mission, accumulatedMonth);
console.log('Месяцев до цели: ', mounths);


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

