let tasks = [];

const formData = document.querySelector('#tasks-form');
const taskList = document.querySelector('#task-list');

formData.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskDescription = document.querySelector('#task-description').value;
    const taskLevel = document.querySelector('#task-level').value;

    const newTask = {description: taskDescription, level: taskLevel};

    tasks.push(newTask);

    const levels = {high: 1, medium: 2, low: 3}
    tasks.sort((a, b) => {
        return levels[a.level] - levels[b.level];
    });

    taskList.innerHTML = '';
    tasks.forEach((item) => {
        let li = document.createElement('li');
        li.textContent = `${item.description} - ${item.level}`;
        taskList.appendChild(li);
    });

    formData.reset();
});