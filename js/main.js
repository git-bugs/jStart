let money = 300,
    income = 'freelance',
    addExpense = 'Inet, Home, Food',
    deposit = false,
    mission = 5000,
    period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpense.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель зарааботать ' + mission + ' долларов');
console.log(addExpense.toLocaleLowerCase().split(', '));


let budgetDay = 400 / 30;

console.log(budgetDay);