const listsContainer = document.getElementById('listsContainer');
const lists = JSON.parse(localStorage.getItem("lists")) || [];

function addList() {
    const listNameInput = document.getElementById("listNameInput");
    const listName = listNameInput.value.trim();
    if (listName === "") return alert("Назва списку не може бути порожньою!");

    const newList = { name: listName, tasks: [] };
    lists.push(newList);

    localStorage.setItem("lists", JSON.stringify(lists));

    listNameInput.value = "";
    displayLists();
}

function deleteList(index) {
    lists.splice(index, 1);

    localStorage.setItem("lists", JSON.stringify(lists));

    displayLists();
}

function addTask(listIndex) {
    const taskInput = document.getElementById(`taskInput-${listIndex}`);
    const taskText = taskInput.value.trim();
    if (taskText === "") return alert("Ви повинні щось написати!");

    const task = { text: taskText };
    lists[listIndex].tasks.push(task);

    localStorage.setItem("lists", JSON.stringify(lists));

    taskInput.value = "";
    displayLists();
}

function deleteTask(listIndex, taskIndex) {
    lists[listIndex].tasks.splice(taskIndex, 1);

    localStorage.setItem("lists", JSON.stringify(lists));

    displayLists();
}

function editTask(listIndex, taskIndex) {
    const newTaskText = prompt("Редагувати завдання:", lists[listIndex].tasks[taskIndex].text);

    if (newTaskText !== null) {
        lists[listIndex].tasks[taskIndex].text = newTaskText;

        localStorage.setItem("lists", JSON.stringify(lists));

        displayLists();
    }
}

function toggleTaskCompletion(listIndex, taskIndex) {
    lists[listIndex].tasks[taskIndex].completed = !lists[listIndex].tasks[taskIndex].completed;

    localStorage.setItem("lists", JSON.stringify(lists));

    displayLists();
}

function displayLists() {
    listsContainer.innerHTML = "";

    lists.forEach((list, listIndex) => {
        const listDiv = document.createElement("div");
        listDiv.classList.add("list");

        listDiv.innerHTML = `
            <h2>${list.name}</h2>
            <div class="input-container">
                <input type="text" id="taskInput-${listIndex}" placeholder="Додати нове завдання">
                <button onclick="addTask(${listIndex})">Додати</button>
            </div>
            <ul class="task-list" id="taskList-${listIndex}"></ul>
            <button onclick="deleteList(${listIndex})">Видалити список</button>
        `;

        const taskList = listDiv.querySelector(`#taskList-${listIndex}`);

        list.tasks.forEach((task, taskIndex) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <hr>
                <button class="edit-button" onclick="editTask(${listIndex}, ${taskIndex})">Редагувати</button>
                <button class="delete-button" onclick="deleteTask(${listIndex}, ${taskIndex})">Видалити</button>
                <button class="toggle-button" onclick="toggleTaskCompletion(${listIndex}, ${taskIndex})">Завершити</button>
            `;
            taskList.appendChild(li);
        });

        listsContainer.appendChild(listDiv);
    });
}

displayLists();
