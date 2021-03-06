//selction
document.addEventListener('DOMContentLoaded',getTodoItems);
const todoInput=document.querySelector(".list-input");
const addBtn=document.querySelector(".addBtn");
const todolist=document.querySelector(".todoList");
const input=document.querySelector("#action");
const saveBtn=document.querySelector(".saveBtn");
const label=document.getElementById("#inputStatus");
const choice=document.querySelector(".filter");
//DOM manipulation
addBtn.addEventListener("click",addList);

todolist.addEventListener("click",manipulateTodo);
choice.addEventListener("click",sortTodo);
// saveBtn.addEventListener("click",editTodo);

function addList(e){
    e.preventDefault();
    //validation of whether the input is empty
    if(todoInput.value){
    const todoContainer=document.createElement("div");
    todoContainer.classList.add("todo");
    const listItem=document.createElement("li");
    listItem.classList.add("list_Item");
    listItem.innerText=todoInput.value;
    SaveToLocalStorage(todoInput.value);
    todoContainer.appendChild(listItem);

    // create the deleteButton
    const delBtn=document.createElement("button");
    delBtn.classList.add("del-Btn");
    delBtn.innerHTML='<i class="fas fa-trash"></i>'
    todoContainer.appendChild(delBtn);

    //create the edit Button
    const editBtn=document.createElement("button");
    editBtn.classList.add("edit-Btn");
    editBtn.innerHTML='<i class="fas fa-edit"></i>'
    todoContainer.appendChild(editBtn);

    // create the checked Button
    const checkBtn=document.createElement("button");
    checkBtn.classList.add("check-Btn");
    checkBtn.innerHTML='<i class="far fa-check-circle"></i>'
    todoContainer.appendChild(checkBtn);

    //appending to the main div element
    todolist.appendChild(todoContainer);
    todoInput.value="";
    }
    else{
        alert("please Enter a task")
    }
}
// manipulate the Todo
function manipulateTodo(e){
    const selectItem=e.target;
    if(selectItem.classList[0]==="del-Btn"){
        const todo=selectItem.parentElement;
        todo.classList.add("fall");
        deleteTodoItem(todo);
        todo.addEventListener("transitionend",function(){
                todo.remove();
    });
    }
    if(selectItem.classList[0]==="check-Btn"){
        const todo=selectItem.parentElement;
        todo.classList.toggle("completed");
    }
    if(selectItem.classList[0]==="edit-Btn"){
        const todo=selectItem.parentElement.innerText;
        todoInput.value=todo;
        let todoitems;
        if(localStorage.getItem('todoitems')===null){
            todoitems=[];
        }
        else{
            todoitems=JSON.parse(localStorage.getItem("todoitems"));
        }
        const todoItemIndex=todoitems.indexOf(todo)
        console.log(todoItemIndex);
        addBtn.removeEventListener("click",function(){
            console.log("Updating todoItem");
        });
        addBtn.style.display="none";
        saveBtn.style.display="inline";
        saveBtn.addEventListener("click",function(){
            todoitems[todoItemIndex]=todoInput.value;
            console.log(todoitems);
            localStorage.setItem("todoitems",JSON.stringify(todoitems));
                // addBtn.style.display="inline";
                // saveBtn.style.display="none";
            e.preventDefault();
        });
    }
    
}
function sortTodo(e){
    const items=todolist.childNodes;
    items.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
                break;
            case "incomplete":
                if(!todo.classList.contains('completed')){
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
                break;
            
        }
    });
}
// implement the web storage API
//adding items to local Storage
function SaveToLocalStorage(todo){
    let todoitems;
    if(localStorage.getItem('todoitems')===null){
        todoitems=[];
    }
    else{
        todoitems=JSON.parse(localStorage.getItem("todoitems"));
    }
    todoitems.push(todo);
    localStorage.setItem("todoitems",JSON.stringify(todoitems));
}

function getTodoItems(){
    let todoitems;
    if(localStorage.getItem('todoitems')===null){
        todoitems=[];
    }
    else{
        todoitems=JSON.parse(localStorage.getItem("todoitems"));
    }
    todoitems.forEach(function(todo){
        //implement the UI Of the item thatare in the local Storage
        const todoContainer=document.createElement("div");
        todoContainer.classList.add("todo");
        const listItem=document.createElement("li");
        listItem.classList.add("list_Item");
        // if(listItem.textContent.length !== 0){
        // console.log(listItem);
        listItem.innerText=todo;
        todoContainer.appendChild(listItem);
    
        // create the deleteButton
        const delBtn=document.createElement("button");
        delBtn.classList.add("del-Btn");
        delBtn.innerHTML='<i class="fas fa-trash"></i>'
        todoContainer.appendChild(delBtn);
    
        //create the edit Button
        const editBtn=document.createElement("button");
        editBtn.classList.add("edit-Btn");
        editBtn.innerHTML='<i class="fas fa-edit"></i>'
        todoContainer.appendChild(editBtn);
    
        // create the checked Button
        const checkBtn=document.createElement("button");
        checkBtn.classList.add("check-Btn");
        checkBtn.innerHTML='<i class="far fa-check-circle"></i>'
        todoContainer.appendChild(checkBtn);
    
        //appending tto the main div element
        todolist.appendChild(todoContainer);
    });

}
//implement the deletion of content ven to the local Storage
function deleteTodoItem(todo){
    let todoitems;
    if(localStorage.getItem('todoitems')===null){
        todoitems=[];
    }
    else{
        todoitems=JSON.parse(localStorage.getItem("todoitems"));
    }
    const todoItemIndex=todo.children[0].innerText;
    const itemIndex=todoitems.indexOf(todoItemIndex);
    todoitems.splice(itemIndex,1);
    localStorage.setItem("todoitems",JSON.stringify(todoitems));
}