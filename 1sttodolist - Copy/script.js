// 1. Select the elements we need
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

// 2. Load saved tasks (or start with an empty array)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 3. Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 4. Show all tasks on the page
function renderTasks() {
  list.innerHTML = ""; // clear the list first

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    const completedbtn =document.createElement("button");
    completedbtn.textContent = "completed";
    completedbtn.addEventListener("click", () =>toggleTask(index));

    li.append(span, deleteBtn,);
    list.appendChild(li);
    
    li.append(completedbtn);
    list.appendChild(li);

  });
}

// 5. Add a task
function addTask(text) {
  tasks.push({ text: text, done: false });
  saveTasks();
  renderTasks();
}

// 6. Mark done / not done
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

// 7. Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// 7.1 Mark a task as completed
function toggleTask(index) {
    tasks[index].done = true;
    saveTasks();
    renderTasks();
}

// 8. Handle the form being submitted
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  const text = input.value.trim();
  if (text === "") return;
  addTask(text);
  input.value = "";
});

// 9. Show saved tasks when the page first loads
renderTasks();