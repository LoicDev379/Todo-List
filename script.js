// Active automatiquement le input au chargement de la page
document.body.onload = init = () => {
    document.form.input.focus();
}

document.form.addEventListener("input", (e) => {
    e.preventDefault;
})

// SELECTEURS
const inputText = document.querySelector(".inputText");
const btn = document.querySelector(".button");
const list = document.querySelector(".list");
const selectOption = document.querySelector(".todos-select");

// ECOUTEURS D'EVENEMENTS
document.addEventListener("DOMContentLoaded", getTodos, true)
btn.addEventListener("click", addTodoList, true);
list.addEventListener("click", deleteCheck, true);
selectOption.addEventListener("input", selectTodo, true);

// FONCTIONS
function addTodoList(e) {
    e.preventDefault();

    if (inputText.value != "") {
        // Creation d'une DIV
        const DIV = document.createElement("div");
        DIV.classList.add("todo");

        // Creation d'un LI
        const LI = document.createElement("li");
        LI.innerText = inputText.value;
        LI.classList.add("todo-item");
        DIV.appendChild(LI);

        // Saving todo in local storage
        saveTodo(inputText.value);

        // Check button
        const checkButton = document.createElement("button");
        checkButton.innerHTML = `<i class="fas fa-check"></i>`;
        checkButton.classList.add("check");
        DIV.appendChild(checkButton);

        // Edit button
        const editButton = document.createElement("button");
        editButton.innerHTML = `<i class="far fa-edit"></i>`;
        editButton.classList.add("edit");
        DIV.appendChild(editButton);

        // Delete botton
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<i class="far fa-trash-alt"></i>`;
        deleteButton.classList.add("delete");
        DIV.appendChild(deleteButton);

        // Ajout de notre DIV a list
        list.appendChild(DIV);
    }

    // Initialisation de l'input
    inputText.value = "";
    init();
}

function deleteCheck(e) {
    e.stopImmediatePropagation();
    const item = e.target;

    if (item.classList[0] === "check") {
        item.parentElement.classList.toggle("completed");
    }

    if (item.classList[0] === "edit") {
        const todo = item.parentElement.children[0].innerText;
        inputText.value = todo;
        btn.onclick = (e) => {
            e.preventDefault();
            removeTodo(item.parentElement);
            item.parentElement.children[0].innerText = inputText.value;
            document.location.reload();
        }
    }

    if (item.classList[0] === "delete") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeTodo(todo);
        todo.addEventListener("transitionend", () => {
            todo.remove();
        })
    }
}

function selectTodo(e) {
    const todos = list.childNodes;

    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;

            case "realised":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

            case "not-realised":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

            default:
                break;
        }
    });
}

function saveTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        // Creation d'une DIV
        const DIV = document.createElement("div");
        DIV.classList.add("todo");

        // Creation d'un LI
        const LI = document.createElement("li");
        LI.innerText = todo;
        LI.classList.add("todo-item");
        DIV.appendChild(LI);

        // Check button
        const checkButton = document.createElement("button");
        checkButton.innerHTML = `<i class="fas fa-check"></i>`;
        checkButton.classList.add("check");
        DIV.appendChild(checkButton);

        // Edit button
        const editButton = document.createElement("button");
        editButton.innerHTML = `<i class="far fa-edit"></i>`;
        editButton.classList.add("edit");
        DIV.appendChild(editButton);

        // Delete botton
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<i class="far fa-trash-alt"></i>`;
        deleteButton.classList.add("delete");
        DIV.appendChild(deleteButton);

        // Ajout de notre DIV a list
        list.appendChild(DIV);
    })
}

function removeTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoElt = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoElt), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}