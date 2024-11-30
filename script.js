const taskName = document.getElementById("task-name");
const taskDate = document.getElementById("task-date");
const taskTime = document.getElementById("task-time");
const addTaskBut = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const dueTaskList = document.getElementById("due-task");
const upcomingTaskList = document.getElementById("upcoming-task");

function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const tasks = getTasks();

    dueTaskList.innerHTML = '';
    upcomingTaskList.innerHTML = '';

    const today = new Date().toISOString().split('T')[0]; 

    const dueTasks = tasks.filter(task => task.date === today);
    const upcomingTasks = tasks.filter(task => task.date !== today);

    if (dueTasks.length > 0) {
        dueTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `${task.description} - ${task.time}`;
            dueTaskList.appendChild(taskItem);
        });
    } else {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = "No tasks due today!";
        dueTaskList.appendChild(emptyMessage);
    }

    if (upcomingTasks.length > 0) {
        upcomingTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `${task.description} - ${task.time}`;
            upcomingTaskList.appendChild(taskItem);
        });
    } else {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = "No upcoming tasks!";
        upcomingTaskList.appendChild(emptyMessage);
    }
}

function addTask() {
    if (!taskName.value || !taskDate.value || !taskTime.value) {
        alert("Please fill in all fields");
        return;
    }

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

addTaskBut.addEventListener('click', addTask);

renderTasks();
