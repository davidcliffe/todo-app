
// Initialize an empty array that will be the container for the todo items
let todoItems = [];

document.querySelector('.todo-form').addEventListener('submit', extractTodoText);
document.querySelector('.todo-list').addEventListener('click', toggleTodoStatus );
document.querySelector('.todo-list').addEventListener('click', deleteTodo);

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

function displayTodo(todo) {
  //the main function to add, toggle

  const list = document.querySelector('.todo-list');
  const item = document.querySelector(`[id='${todo.id}']`);
  const isChecked = todo.checked ? 'done': 'undone';

  const todoItem = document.createElement('li');
  todoItem.setAttribute('class', `todo-item ${isChecked}`); 
  todoItem.setAttribute('id', todo.id);                                 

  // below block is to format the li element for display    
      const doneButton = document.createElement('button');
        //img will be e.target, not the button (not sure why button element is not the e.target?)
        doneButtonImg = document.createElement('img');
        doneButtonImg.src = "done-icon.jpg";
        doneButtonImg.className = "tick-todo";
        doneButtonImg.id = todo.id;
      doneButton.append(doneButtonImg); 
      todoItem.appendChild(doneButton);

      const todoText = document.createElement('span');
      todoText.className = "todo-text";
      todoText.textContent = (todo.text);
      todoItem.appendChild(todoText);

      const deleteButton = document.createElement('button');
        //img will be e.target, not the button (not sure why button element is not the e.target?)
        deleteButtonImg = document.createElement('img');
        deleteButtonImg.src = "delete-icon.jpg";
        deleteButtonImg.className = "delete-todo";
        deleteButtonImg.id = todo.id;  
      deleteButton.append(deleteButtonImg);
      todoItem.append(deleteButton);

  //update the array: if item already in array: replace it, otherwise:append it
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
