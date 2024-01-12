const taskForm = document.querySelector('#taskForm');

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // console.log(taskForm['title'].value, taskForm['description'].value);
  App.createTask(taskForm['title'].value, taskForm['description'].value);
});
