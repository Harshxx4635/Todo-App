const input = document.querySelector('input');
const addBtn = document.querySelector('.add');
const list = document.querySelector('ul');


let ev = null;

const addTodo = (todo) => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = todo;
    li.appendChild(p);
    li.innerHTML += `<i class="fa-solid fa-pen-to-square"></i><i class="fa-solid fa-trash"></i>`
    list.appendChild(li);
}

document.addEventListener('DOMContentLoaded',() => {
    if(localStorage.getItem('todos')===null) return;
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    localTodos.forEach(todo => addTodo(todo));
})

const saveLocal= todo => {
    let todos=[];
    if(localStorage.getItem('todos')!==null)
        todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

const deleteLocal = todo => {
    let todos = JSON.parse(localStorage.getItem('todos'));
    let index;
    for(let i in todos) {
        if(todos[i]===todo) {
            index = i;
            break;
        }
    }
    todos.splice(index,1);
    localStorage.setItem('todos',JSON.stringify(todos));
}

const updateLocal = (prev,curr) => {
    let todos = JSON.parse(localStorage.getItem('todos'));
    for(let i in todos) {
        if(todos[i]===prev) {
            todos[i]=curr;
            break;
        }
    }
    
    localStorage.setItem('todos',JSON.stringify(todos));
}

addBtn.addEventListener('click',() => {
    const todo = input.value;
    if(todo.length<1) {
        alert("Todo Cannot Be Empty");
        return;
    }
    if(addBtn.textContent==="Edit") {
        let prev = ev.previousElementSibling.textContent;
        ev.previousElementSibling.textContent = todo;
        input.value="";
        addBtn.textContent= "Add";
        updateLocal(prev,todo);
    } else {
        addTodo(todo);
        saveLocal(todo);
    }
    input.value = ""
})

list.addEventListener('click',(e) => {
    if(e.target.tagName === "P") {
        e.target.classList.toggle('active');
    }
    else if(e.target.classList.contains('fa-pen-to-square')) {
        ev = e.target;
        input.value = e.target.previousElementSibling.textContent;
        input.focus();
        addBtn.textContent = "Edit";
    } else if(e.target.classList.contains('fa-trash')) {
        deleteLocal(e.target.previousElementSibling.previousElementSibling.textContent);
        e.target.parentElement.remove();
    }
})