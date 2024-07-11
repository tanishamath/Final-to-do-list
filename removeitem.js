document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');

    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item-button')) {
            const taskItem = event.target.parentElement;
            taskItem.remove();
            saveTasks(); // Call saveTasks to update the local storage
        }
    });
});
