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
    if (todoTask !== "" && todoDate !== "") {
      todoArray = [...todoArray, { Task: todoTask, Date: todoDate }];
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
  
  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todoArray));
  };
  