const taskName = document.getElementById("task-name");
const taskDate = document.getElementById("task-date");
const taskTime = document.getElementById("task-time");
const addTaskButton = document.getElementById("add-task");
const dueTasksList = document.querySelector("#due-tasks ul");
const upcomingTasksList = document.querySelector("#upcoming-tasks ul");

const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];
const saveTasks = (tasks) => localStorage.setItem("tasks", JSON.stringify(tasks));

function renderTasks() {
    const tasks = getTasks();
    const today = new Date().toISOString().split("T")[0];

    dueTasksList.innerHTML = "";
    upcomingTasksList.innerHTML = "";

    tasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${task.description} <span>${task.time}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>`;
        listItem.querySelector(".edit-btn").onclick = () => editTask(task.id);
        listItem.querySelector(".delete-btn").onclick = () => deleteTask(task.id);    

        if (task.date === today) {
            dueTasksList.appendChild(listItem);
        } else {
            upcomingTasksList.appendChild(listItem);
        }
    });
}

function addTask() {

    const newTask = {
        id: Date.now(),
        description: taskName.value,
        date: taskDate.value,
        time: taskTime.value,
    };

    const tasks = getTasks();
    tasks.push(newTask);
    saveTasks(tasks);

    taskName.value = "";
    taskDate.value = "";
    taskTime.value = "";

    renderTasks();
}
function editTask(id) {
    const tasks = getTasks();
    const taskToEdit = tasks.find((task) => task.id === id);

    taskName.value = taskToEdit.description;
    taskDate.value = taskToEdit.date;
    taskTime.value = taskToEdit.time;

    deleteTask(id);
}

function deleteTask(id) {
    const tasks = getTasks().filter((task) => task.id !== id);
    saveTasks(tasks);
    renderTasks();
}

function filterTasks() {
    const searchText = searchBar.value.toLowerCase();
    const tasks = document.querySelectorAll("li");

    tasks.forEach((task) => {
        const text = task.textContent.toLowerCase();
        task.style.display = text.includes(searchText) ? "" : "none";
    });
}


addTaskButton.onclick = addTask;

document.addEventListener("DOMContentLoaded", renderTasks);
