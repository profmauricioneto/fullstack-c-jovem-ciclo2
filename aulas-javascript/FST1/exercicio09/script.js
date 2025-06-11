let tasks = [];

const form = document.querySelector('#form-tasks');
const list = document.querySelector('#task-list');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const task = document.querySelector('#name-task').value;
    const level = document.querySelector('#level').value;

    const newTask = {name: task, order: level};

    tasks.push(newTask);

    const orderLevel = {high: 1, medium: 2, low: 3};
    tasks.sort((a, b) => {
        return orderLevel[a.order] - orderLevel[b.order];
    });

    list.innerHTML = '';
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = `${task.name} - ${task.order}`;
        list.appendChild(li);
    });
});