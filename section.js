document.getElementById('add-task-button').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');
        const newTask = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', toggleTask);

        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;

        // Create a Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            taskList.removeChild(newTask);
            saveTasks();
        });

        newTask.appendChild(checkbox);
        newTask.appendChild(taskContent);
        newTask.appendChild(removeButton); // Append the Remove button to the task
        taskList.appendChild(newTask);

        taskInput.value = '';
        saveTasks();
    }
}

function toggleTask(event) {
    const checkbox = event.target;
    const taskItem = checkbox.parentElement;
    if (checkbox.checked) {
        taskItem.classList.add('completed');
    } else {
        taskItem.classList.remove('completed');
    }
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
        const taskText = taskItem.querySelector('span').textContent;
        const isCompleted = taskItem.querySelector('input').checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list before loading
    tasks.forEach(task => {
        const newTask = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', toggleTask);

        const taskContent = document.createElement('span');
        taskContent.textContent = task.text;

        // Create a Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            taskList.removeChild(newTask);
            saveTasks();
        });

        if (task.completed) {
            newTask.classList.add('completed');
        }

        newTask.appendChild(checkbox);
        newTask.appendChild(taskContent);
        newTask.appendChild(removeButton); // Append the Remove button to the task
        taskList.appendChild(newTask);
    });
}

function goBack() {
    window.location.href = 'tdl.html';
}

// Initializes the tasks display on section page load
window.onload = function() {
    if (window.location.pathname.includes('section.html')) {
        document.getElementById('section-title').innerText = localStorage.getItem('currentSection');
        loadTasks();
    }
};

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", deleteAllTasks);

function deleteAllTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear all tasks from the DOM
    localStorage.removeItem('tasks'); // Clear all tasks from local storage
}

// Load tasks on initial page load
loadTasks();
let timer;
let isRunning = false;
let timeLeft = 1500; // 25 minutes in seconds

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                alert('Time\'s up!');
            } else {
                timeLeft--;
                updateDisplay();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 1500;
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
