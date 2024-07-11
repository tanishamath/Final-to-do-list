function addSection() {
    const sectionName = document.getElementById('new-section').value;
    if (sectionName) {
        const section = document.createElement('div');
        section.className = 'section';
        section.innerText = sectionName;
        section.onclick = function() {
            localStorage.setItem('currentSection', sectionName);
            window.location.href = 'section.html';
        };
        
        document.getElementById('sections').appendChild(section);
        document.getElementById('new-section').value = '';
    }
}

function addTask() {
    const taskName = document.getElementById('new-task').value;
    if (taskName) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        const currentSection = localStorage.getItem('currentSection');
        if (!tasks[currentSection]) {
            tasks[currentSection] = [];
        }
        tasks[currentSection].push({ name: taskName, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
        document.getElementById('new-task').value = '';
    }
}

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    const currentSection = localStorage.getItem('currentSection');
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';

    if (tasks[currentSection]) {
        tasks[currentSection].forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task';
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            const taskNameSpan = document.createElement('span');
            taskNameSpan.innerText = task.name;
            taskItem.appendChild(taskNameSpan);

            const taskActions = document.createElement('div');

            const checkButton = document.createElement('button');
            checkButton.innerText = '✓';
            checkButton.onclick = function() {
                task.completed = !task.completed;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                displayTasks();
            };
            taskActions.appendChild(checkButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerText = '✗';
            deleteButton.onclick = function() {
                tasks[currentSection].splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                displayTasks();
            };
            taskActions.appendChild(deleteButton);

            taskItem.appendChild(taskActions);
            taskList.appendChild(taskItem);
        });
    }
}

function goBack() {
    window.location.href = 'index.html';
}

window.onload = function() {
    if (window.location.pathname.includes('section.html')) {
        document.getElementById('section-title').innerText = localStorage.getItem('currentSection');
        displayTasks();
    }
};
