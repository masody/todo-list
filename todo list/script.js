const inputTodo = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todoList");
const filterOption = document.querySelector(".filter-todos")

todoButton.addEventListener("click" , addInput);
todoList.addEventListener("click",checkRemove);
filterOption.addEventListener("click",filterTodos)
document.addEventListener("DOMContentLoaded",getLocalTodos)


function addInput(e){
    e.preventDefault();

    const form = document.forms["myForm"]["fname"].value;
    if(form == ""){
        alert("input is empty");
        return false;
    }
    
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    const newTodo = `
    <li>${inputTodo.value}</li>
    <span><i class="fa-solid fa-circle-check"></i></span>
    <span><i class="fa-solid fa-trash"></i></span>`
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
    saveLocalTodos(inputTodo.value);
    inputTodo.value = "";

}

function checkRemove(e){
    const classList = [...e.target.classList]
    const item = e.target
    if(classList[1] === "fa-circle-check" ){
         const todo = item.parentElement.parentElement;
         todo.classList.toggle("comple");
    }else if(classList[1] === "fa-trash"){
           const todo = item.parentElement.parentElement;
           removeLocalTodos(todo);
           todo.remove();
    }
}

function filterTodos(e){
    console.log(e.target.value);
    // console.log(todoList.childNodes);
    const todos = [...todoList.childNodes];
    todos.forEach((todo) => {
        switch(e.target.value) {
            case'all':
            todo.style.display = "flex";
            break;
        case'comple':
            if(todo.classList.contains("comple")) {
                todo.style.display = "flex";
            } else{
                todo.style.display = "none";
            }
            break;
            case'uncompleted':
            if (!todo.classList.contains("comple")) {
                   todo.style.display = "flex";           
            } else {
                todo.style.display = "none";
            }
            break;
        }
    })
}

function saveLocalTodos(todos){
  let savedTodos = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos'))
  : [];
  savedTodos.push(todos);
  localStorage.setItem("todos", JSON.stringify(savedTodos))
}


function getLocalTodos(){
    let savedTodos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [];
    savedTodos.forEach((todo) => {
         const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = `
        <li>${todo}</li>
        <span><i class="fa-solid fa-circle-check"></i></span>
        <span><i class="fa-solid fa-trash"></i></span>`
        todoDiv.innerHTML = newTodo;
        todoList.appendChild(todoDiv);
    })
 
  }

  function removeLocalTodos(todo){
    let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
    const filteredTodos = savedTodos.filter((t) => t !== todo.children[0].innerText)
    localStorage.setItem("todos", JSON.stringify(filteredTodos))
  }
