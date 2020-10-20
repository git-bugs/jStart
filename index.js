'use strict';


let result = document.querySelector('#start'),
  btnIncome = document.querySelector('button')[0],
  btnExpenses = document.querySelector('button')[1],
  checkBox = document.querySelector('.period-select'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  monthValue = document.getElementsByClassName('budget_month-value'),
  dayValue = document.getElementsByClassName('budget_day-value'),
  expensesMonth = document.getElementsByClassName('expenses_month-value'),
  incomeValue = document.getElementsByClassName('additional_income-value'),
  expensesValue = document.getElementsByClassName('additional_expenses-valuee'),
  incomePeriod = document.getElementsByClassName('income_period-value'),
  targetMonthValue = document.getElementsByClassName('target_month-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  incomeAmount= document.querySelector('.income-amount'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesAmount = document.querySelector('.expenses-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select');


