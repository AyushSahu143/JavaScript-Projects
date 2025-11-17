// grabbing elements
const taskInput = document.getElementById("task-input");
const addTaskButt = document.getElementById("add-newTask");
const taskList = document.querySelector(".taskList");
const allBtn = document.getElementById("filter-all");
const pendingBtn = document.getElementById("filter-pending");
const completedBtn = document.getElementById("filter-completed");

updateEmptyState();

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTaskButt.click();
  }
});
function updateEmptyState() {
  if (taskList.children.length === 0) {
    taskList.classList.add("empty");
  } else {
    taskList.classList.remove("empty");
  }
}

//logic for sections
function setActive(button) {
  if (button === allBtn) {
    document
      .querySelectorAll(".fltr-btns")
      .forEach((btn) => btn.classList.remove("active"));
    return;
  } else {
    document
      .querySelectorAll(".fltr-btns")
      .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  }
}

allBtn.addEventListener("click", () => {
  setActive(allBtn);
  showAllTaks();
});
pendingBtn.addEventListener("click", () => {
  setActive(pendingBtn);
  showPending();
});
completedBtn.addEventListener("click", () => {
  setActive(completedBtn);
  showCompleted();
});

//functions for sections
function showAllTaks() {
  document.querySelectorAll(".taskList li").forEach((li) => {
    li.style.display = "flex";
  });
}

function showPending() {
  document.querySelectorAll(".taskList li").forEach((li) => {
    const checkBox = li.querySelector("input[type='checkbox']");
    li.style.display = checkBox.checked ? "none" : "flex";
  });
}

function showCompleted() {
  document.querySelectorAll(".taskList li").forEach((li) => {
    const checkBox = li.querySelector("input[type='checkbox']");
    li.style.display = checkBox.checked ? "flex" : "none";
  });
}

addTaskButt.addEventListener("click", () => {
  if (taskInput.value === "") return;
  const newTaskSpan = document.createElement("span");
  const newTaskList = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "task-check";

  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';

  //appending the dynamic elements
  newTaskSpan.textContent = taskInput.value.trim();
  newTaskList.appendChild(checkBox);
  newTaskList.appendChild(newTaskSpan);
  newTaskList.appendChild(editBtn);
  newTaskList.appendChild(deleteBtn);
  taskList.appendChild(newTaskList);
  updateEmptyState();

  // task completed or not
  checkBox.addEventListener("change", () => {
    newTaskList.classList.toggle("completed");
  });

  //delete button functionality
  deleteBtn.addEventListener("click", (e) => {
    newTaskList.remove();
    updateEmptyState();
  });

  //update button functionality
  editBtn.addEventListener("click", (e) => {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = newTaskSpan.textContent;
    editInput.className = "edit-input";

    newTaskList.replaceChild(editInput, newTaskSpan);
    editInput.focus();

    editInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveEdit();
      }
       updateEmptyState();
    });

    function saveEdit() {
      newTaskSpan.textContent = editInput.value.trim();
      newTaskList.replaceChild(newTaskSpan, editInput);
    }
  });
  taskInput.value = "";
});

//Empty taks list
