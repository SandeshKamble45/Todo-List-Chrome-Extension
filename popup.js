// the selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// event listeners
document.addEventListener('DOMContentLoaded', getTodos); 
todoButton.addEventListener('click', addTodo); 
todoList.addEventListener('click' , deleteCheck);


function addTodo(event){
    event.preventDefault();

//    creating DIV tag
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");

// creating li tag
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // adding todo to local storage
    saveLocalTodos(todoInput.value);

// creating checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

// creating delete button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

// Append whole todoDiv to list
    todoList.appendChild(todoDiv);
    // clear todo input value
    todoInput.value ="";
}

function deleteCheck(e){
    const item = e.target;
    // delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }


    // checkmark
    if(item.classList[0] === "complete-btn"){
        const todo= item.parentElement;
        todo.classList.toggle("completed");
        // Animation for task done
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }
}

function saveLocalTodos(todo){
    // check if you already have things in there
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
     // check if you already have things in there
     let todos;
     if(localStorage.getItem('todos') === null){
         todos = [];
     }else{
         todos = JSON.parse(localStorage.getItem('todos'));
     }
       
    //  loop over them
     todos.forEach(function(todo){

        const todoDiv=document.createElement("div");
        todoDiv.classList.add("todo");
    
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
       
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
    
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
    
        todoList.appendChild(todoDiv);  
     })
}

function removeLocalTodos(todo){

     // check if you already have things in there
     let todos;
     if(localStorage.getItem("todos") === null){
         todos = [];
     }else{ 
         todos = JSON.parse(localStorage.getItem("todos"));
     }

     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex), 1);
     localStorage.setItem("todos",JSON.stringify(todos));
    }
