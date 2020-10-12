'use strict'


let money = prompt('Ваш месячный доход?'),
  addExpense = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: Квартплата, проездной, кредит...'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  expense1 = prompt('Введите обязательную статью расходов?'),
  amount1 = +prompt('Во сколько это обойдется?'),
  expense2 = prompt('Введите обязательную статью расходов?'),
  amount2 = +prompt('Во сколько это обойдется?'),
  mission = 500000;

let exp = addExpense.split(',');
console.log(exp);

let sum = 0;
for(var i = 0; i < exp.length; i++){
  sum += +(parseInt(exp[i]));
  
}

let budgetMonth;
budgetMonth = money - (sum + amount1 + amount2);
console.log('Бюджет на месяц: ', budgetMonth);

let missionInterval;
missionInterval = Math.round(mission / budgetMonth);
console.log('Месяцев до собираемой суммы - ', missionInterval);
let budgetDay;

budgetDay = Math.floor(budgetMonth / 30);
console.log('Дневной бюджет: ', budgetDay);

if (budgetDay > 1200){
  console.log('У вас высокий уровень дохода');
} else if( budgetDay > 600 && budgetDay <= 1200){
  console.log('У вас средний уровень дохода');
} else if( budgetDay >=0 && budgetDay <= 600){
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
};

