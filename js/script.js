'use strict';


class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
  }

  addToStorage() {
    localStorage.setItem('todoList', JSON.stringify([...this.todoData]))
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) { 
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('beforeend', `
				<span class="text-todo">${todo.value}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>
    `);
    if (todo.complated){
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        complated: false,
        key: this.generateKey()
      }
      this.todoData.set(newTodo.key, newTodo)
    } else alert('Пустое дело добавить нельзя!')
    this.input.value = '';
    this.render();
  }

  generateKey() {
    return Math.random().toString(32).substring(2, 15) + Math.random().toString(32).substring(2, 15);
  }

  handler = (event) => {
    let target = event.target;
    if (target.classList.contains('todo-remove')) this.deleteItem(target.closest('.todo-item'));
    if (target.classList.contains('todo-complete')) this.compatedItem(target.closest('.todo-item'));
  }

  deleteItem(target) {
    this.todoData.delete(target.key);
    this.render();
  }

  compatedItem(target) {
    const temp = {...this.todoData.get(target.key)};
    this.todoData.delete(target.key);
    temp.complated = !temp.complated;
    this.todoData.set(target.key, temp);
    this.render();
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
    document.querySelector('.todo-container').addEventListener('click', this.handler);
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();