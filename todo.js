// Initialize an empty array that will be the container for the todo items
let todoItems = [];

const form = document.querySelector('.todo-form');
form.addEventListener('submit', extractTodoText);

const list = document.querySelector('.todo-list');
list.addEventListener('click', toggleTodoStatus );
list.addEventListener('click', deleteTodo);

function addTodo(text) {
  // create object with todo properties, push to the todoItems array
  const todo = {
    text,
    checked: false,
    id: Date.now()
    };

  todoItems.push(todo);
  displayTodo(todo);  
}

function extractTodoText(e) {
  e.preventDefault();
  const input = document.querySelector('.todo-input-text');
  
  !input.value ? alert("todo was blank, enter a todo...") : passTodo()
    function passTodo() {
            const text = input.value;
              input.value=""; 
              addTodo(text);
    } 
  document.getElementById("todo-input-text").focus();
}

function displayTodo(todo) {
  const list = document.querySelector('.todo-list');

  const item = document.querySelector(`[id='${todo.id}']`);

  const isChecked = todo.checked ? 'done': 'undone';

  const todoItem = document.createElement('li');
  todoItem.setAttribute('class', `todo-item ${isChecked}`); 
  todoItem.setAttribute('id', todo.id);                                 

  todoItem.innerHTML = `
    <button class="tick-todo" id="${todo.id}"/>
    <img src="done-icon.jpg" class="tick-todo" id="${todo.id}" height=20></img> 
    </button>
    <span style="width:350px;display:inline-block;text-align:left">${todo.text}</span>
    
    <button class="delete-todo" id="${todo.id}">
    <img src="delete-icon.jpg" class="delete-todo" id="${todo.id}" height=20></img>
    </button>
    `;

    if (item) {      
      list.replaceChild(todoItem, item);
    } else {      
      list.append(todoItem);
    }
    
}

function toggleTodoStatus(e) {  
  if(e.target.className == 'tick-todo'){
    const todoId = e.target.id;   
    const index = todoItems.findIndex( item => item.id == todoId);   
    todoItems[index].checked = !todoItems[index].checked;
    displayTodo(todoItems[index]);    
  }
}

function deleteTodo(e) {  
  if(e.target.className == 'delete-todo'){
    const todoId = e.target.id;   
    const index = todoItems.findIndex( item => item.id == todoId);

    todoToDelete = todoItems[index];
    const item = document.querySelector(`[id='${todoToDelete.id}']`);
    item.remove();
    todoItems = todoItems.filter(item => item.id != todoId);
  }
}
