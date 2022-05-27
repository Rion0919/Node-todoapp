const taskIdDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const formAlertDOM = document.querySelector('.form-alert');

const params = window.location.search;
const id = new URLSearchParams(params).get('id');
console.log(id);

const showTask = async () => {
  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id, completed, name } = task;
    taskIdDOM.textContent = _id;
    taskNameDOM.value = name;
    if(completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (err) {
    console.log(err);
  }
};

showTask();

editFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const taskName = taskNameDOM.value;
    taskCompleted = taskCompletedDOM.checked
    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted
    });
    formAlertDOM.getElementsByClassName.display = 'block';
    formAlertDOM.textContent = '編集が完了しました';
    formAlertDOM.classList.add('text-success');
  } catch (err) {
    console.log(err);
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);
});
