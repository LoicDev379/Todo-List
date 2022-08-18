const inputText = document.querySelector(".inputText");
const btn = document.querySelector(".button");
const list = document.querySelector(".list");

btn.addEventListener("click", addTodoList, true);
list.addEventListener("click", deleteCheck, true);

function addTodoList(event) {
    event.stopImmediatePropagation();

    // Creation d'une DIV
    const DIV = document.createElement("div");
    DIV.classList.add("todo");

    // Creation d'un LI
    const LI = document.createElement("li");
    LI.innerText = inputText.value;
    LI.classList.add("todo-item");
    DIV.appendChild(LI);

    // Check button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = `<i class="fas fa-check"></i>`;
    checkButton.classList.add("check");
    DIV.appendChild(checkButton);

    // Delete botton
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="far fa-trash-alt"></i>`;
    deleteButton.classList.add("delete");
    DIV.appendChild(deleteButton);

    // Ajout de notre DIV a list
    list.appendChild(DIV);

    // Initialisation de l'input
    inputText.value = "";
    init();
}

function deleteCheck(e) {
    e.stopImmediatePropagation();
    const item = e.target;

    if (item.classList[0] === "delete") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener("transitionend", function () {
            todo.remove();
        })
    }
    if (item.classList[0] === "check") {
        item.parentElement.classList.toggle("completed");

    }
}

init = () => {
    document.form.input.focus();
}