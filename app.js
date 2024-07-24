// function addTask() {
//     var taskContent = prompt("Enter task content");
//     if (taskContent) {
//         var task = document.createElement("div");
//         task.className = "task";
//         task.id = "task" + Date.now();
//         task.setAttribute("draggable", "true");
//         task.setAttribute("ondragstart", "drag(event)");
//         task.setAttribute("onclick", "removeTask(event)"); // Add click event for removing the task
//         task.textContent = taskContent;
//         document.getElementById("todo").appendChild(task);
//     }
// }

// function allowDrop(event) {
//     event.preventDefault();
// }

// function drag(event) {
//     event.dataTransfer.setData("text", event.target.id);
// }

// function drop(event, targetId) {
//     event.preventDefault();
//     var data = event.dataTransfer.getData("text");
//     var task = document.getElementById(data);
//     document.getElementById(targetId).appendChild(task);
// }

// function removeTask(event) {
//     if (confirm("Are you sure you want to delete this task?")) {
//         event.target.remove();
//     }
// }
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    var taskContent = prompt("Enter task content");
    if (taskContent) {
        var task = createTaskElement(taskContent);
        document.getElementById("todo").appendChild(task);
        saveTasks();
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event, targetId) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var task = document.getElementById(data);
    document.getElementById(targetId).appendChild(task);
    saveTasks();
}

function removeTask(event) {
    if (confirm("Are you sure you want to delete this task?")) {
        event.target.remove();
        saveTasks();
    }
}

function createTaskElement(content) {
    var task = document.createElement("div");
    task.className = "task";
    task.id = "task" + Date.now();
    task.setAttribute("draggable", "true");
    task.setAttribute("ondragstart", "drag(event)");
    task.setAttribute("onclick", "removeTask(event)");
    task.textContent = content;
    return task;
}

function saveTasks() {
    var columns = document.querySelectorAll(".tasks");
    var tasks = {
        todo: [],
        "in-progress": [],
        done: []
    };

    columns.forEach(function(column) {
        var columnId = column.id;
        var columnTasks = column.querySelectorAll(".task");
        columnTasks.forEach(function(task) {
            tasks[columnId].push(task.textContent);
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        for (var columnId in tasks) {
            tasks[columnId].forEach(function(taskContent) {
                var task = createTaskElement(taskContent);
                document.getElementById(columnId).appendChild(task);
            });
        }
    }
}