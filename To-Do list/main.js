function addTask() {
  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();
  
  if (taskText === "") {
      alert("Please enter a task.");
      return;
  }

  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  const taskLabel = document.createElement("label");
  taskLabel.textContent = taskText;
  taskLabel.classList.add("task");

  li.appendChild(checkbox);
  li.appendChild(taskLabel);
  taskList.appendChild(li);

  taskInput.value = "";

  updateTaskCount();
  saveTasks();
}

function removeCompletedTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = taskList.querySelectorAll("li");
  
  tasks.forEach(task => {
      const checkbox = task.querySelector(".checkbox");
      if (checkbox.checked) {
          taskList.removeChild(task);
      }
  });

  updateTaskCount();
  saveTasks();
}

function filterTasks(filterType) {
  const taskList = document.getElementById("taskList");
  const tasks = taskList.querySelectorAll("li");
  
  tasks.forEach(task => {
      const checkbox = task.querySelector(".checkbox");
      
      if (filterType === "all") {
          task.style.display = "block";
      } else if (filterType === "active" && checkbox.checked) {
          task.style.display = "none";
      } else if (filterType === "completed" && !checkbox.checked) {
          task.style.display = "none";
      } else {
          task.style.display = "block";
      }
  });
}

function updateTaskCount() {
  const taskList = document.getElementById("taskList");
  const taskCount = taskList.querySelectorAll("li").length;
  document.getElementById("taskCount").textContent = `Total Tasks: ${taskCount}`;
}

function saveTasks() {
  const taskList = document.getElementById("taskList").innerHTML;
  localStorage.setItem("tasks", taskList);
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = localStorage.getItem("tasks") || "";
}

loadTasks();
updateTaskCount();

document.getElementById("task").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
      addTask();
  }
});
