import "./style.css";

const toDoBtn = document.getElementById("toDoBtn");
const toDoInput = document.getElementById("toDoInput");
const toDoList = document.getElementById("toDoList");
let taskArray = []; // storing all tasks here

toDoBtn.addEventListener("click", () => {
  const todoText = toDoInput.value.trim();
  createToDoList(todoText); // creates To Do
  renderToDoItems();
});

const createToDoList = (todoText) => {
  if (!todoText) return; // if todo input is blank so return
  taskArray.push(todoText);
  saveTasks();
  console.log("task array:", taskArray);
  return (toDoInput.value = "");
};

// delete tasks
const deleteToDoItem = (index) => {
  toDoList.innerHTML = ""; // clearing previous list before rendering new list
  taskArray.splice(index, 1);
  taskArray = arrTasks;
  console.log("task array:", taskArray);
};

function loadtasks() {
  const tasks = localStorage.getItem("todo");
  // checking tasks exist or not
  if (tasks) {
    const arrTasks = JSON.parse(tasks);
    taskArray = arrTasks;
    renderToDoItems();
  } else {
    taskArray = [];
  }
}

const saveTasks = () => {
  const strTaskArr = JSON.stringify(taskArray);
  localStorage.setItem("todo", strTaskArr);
};

function renderToDoItems() {
  toDoList.innerHTML = "";

  if (taskArray.length > 0) {
    taskArray.forEach((item, index) => {
      // creating elements
      const toDoItem = document.createElement("li");
      const deleteBtn = document.createElement("button");

      toDoItem.innerText = item;
      deleteBtn.innerHTML = '<i class="fa-solid fa-x"></i>';

      deleteBtn.addEventListener("click", () => {
        deleteToDoItem(index);
      });

      toDoList.appendChild(toDoItem);
      toDoItem.appendChild(deleteBtn);
    });
  }
}

loadtasks();
