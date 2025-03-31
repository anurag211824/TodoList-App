let todoArray = [];

document.addEventListener("DOMContentLoaded", () => {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  todoArray = [...todoArray, ...storedTodos];
  displayTasks();
});

document.querySelector(".taskInput").addEventListener("input", (event) => {
  const inputValue = event.target.value;
  if (inputValue.length > 50) {
    event.target.value = inputValue.substring(0, 50);
    alert("Maximum 50 characters allowed!");
  }

  todoTask = event.target.value;
});

document.querySelector(".taskDate").addEventListener("input", (event) => {
  todoDate = event.target.value;
});

const AddTask = () => {
  if (todoTask !== "" && (todoDate !== "" || editingTodo)) {
    if(editIndex!==-1){
      todoArray[editIndex]={ Task: todoTask, Date: todoDate}
      editIndex = -1;
      document.querySelector(".addTodoBtn").innerHTML = "Add Todo";
    }
    else{
      todoArray = [...todoArray,{ Task: todoTask, Date: todoDate}];
    }
    saveToLocalStorage();
  }
  document.querySelector(".taskInput").value = "";
  document.querySelector(".taskDate").value = "";
  todoTask = "";
  todoDate = "";
  displayTasks();
};

const displayTasks = () => {
  const todoListContainer = document.querySelector(".todoList");
  todoListContainer.innerHTML = "";
  todoArray.forEach((todo, index) => {
    const todoItem = `
        <div class="Todo-item">
          <p class="task">${todo.Task}</p>
          <p class="task-date">${todo.Date}</p>
          <button onClick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
    todoListContainer.innerHTML += todoItem;
  });
};

const deleteTask = (index) => {
  // todoArray = [...todoArray.slice(0, index), ...todoArray.slice(index + 1)];
  todoArray.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
};
let editIndex = -1;
let editingTodo=false;
const editTask = (index) => {
  editingTodo=true;
  const addTodoBtn = document.querySelector(".addTodoBtn");
  addTodoBtn.innerHTML = "Edit Todo";
  const inputBox = document.querySelector(".taskInput");
  const dateBox = document.querySelector(".taskDate");
  editIndex=index
  inputBox.value = todoArray[editIndex].Task;
  dateBox.value = todoArray[ editIndex].Date;
};
const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todoArray));
};
