let todos = [];
let editingId = null;

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function loadTodos() {
  try {
    const data = localStorage.getItem("todos");
    if (data) {
      todos = JSON.parse(data);
    }
  } catch (e) {
    todos = [];
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getFilteredTodos() {
  const category = document.getElementById("filter-category").value;
  const priority = document.getElementById("filter-priority").value;
  const status = document.getElementById("filter-status").value;

  return todos.filter(function (todo) {
    if (category !== "전체" && todo.category !== category) return false;
    if (priority !== "전체" && todo.priority !== priority) return false;
    if (status === "완료" && !todo.completed) return false;
    if (status === "진행중" && todo.completed) return false;
    return true;
  });
}

function updateStats() {
  var total = todos.length;
  var done = todos.filter(function (t) { return t.completed; }).length;
  var pending = total - done;

  document.getElementById("stat-total").textContent = "전체: " + total;
  document.getElementById("stat-done").textContent = "완료: " + done;
  document.getElementById("stat-pending").textContent = "진행중: " + pending;
}

function renderTodos() {
  var listEl = document.getElementById("todo-list");
  var emptyEl = document.getElementById("empty-state");
  var filtered = getFilteredTodos();

  listEl.innerHTML = "";

  if (filtered.length === 0) {
    emptyEl.classList.remove("hidden");
  } else {
    emptyEl.classList.add("hidden");
  }

  filtered.forEach(function (todo) {
    var li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");

    var priorityClass =
      todo.priority === "높음" ? "tag-priority-high" :
      todo.priority === "보통" ? "tag-priority-medium" :
      "tag-priority-low";

    li.innerHTML =
      '<input type="checkbox" class="todo-checkbox" ' + (todo.completed ? "checked" : "") + ' />' +
      '<div class="todo-content">' +
        '<div class="todo-text">' + escapeHtml(todo.text) + '</div>' +
        '<div class="todo-meta">' +
          '<span class="tag tag-category">' + escapeHtml(todo.category) + '</span>' +
          '<span class="tag ' + priorityClass + '">' + escapeHtml(todo.priority) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="todo-actions">' +
        '<button class="btn-edit" data-id="' + todo.id + '">수정</button>' +
        '<button class="btn-delete" data-id="' + todo.id + '">삭제</button>' +
      '</div>';

    var checkbox = li.querySelector(".todo-checkbox");
    checkbox.addEventListener("change", function () {
      toggleTodo(todo.id);
    });

    var editBtn = li.querySelector(".btn-edit");
    editBtn.addEventListener("click", function () {
      openEditModal(todo.id);
    });

    var deleteBtn = li.querySelector(".btn-delete");
    deleteBtn.addEventListener("click", function () {
      deleteTodo(todo.id);
    });

    listEl.appendChild(li);
  });

  updateStats();
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function addTodo(text, category, priority) {
  todos.unshift({
    id: generateId(),
    text: text,
    category: category,
    priority: priority,
    completed: false,
    createdAt: new Date().toISOString()
  });
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  var todo = todos.find(function (t) { return t.id === id; });
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

function deleteTodo(id) {
  todos = todos.filter(function (t) { return t.id !== id; });
  saveTodos();
  renderTodos();
}

function openEditModal(id) {
  var todo = todos.find(function (t) { return t.id === id; });
  if (!todo) return;

  editingId = id;
  document.getElementById("edit-input").value = todo.text;
  document.getElementById("edit-category").value = todo.category;
  document.getElementById("edit-priority").value = todo.priority;
  document.getElementById("modal-overlay").classList.add("active");
  document.getElementById("edit-input").focus();
}

function closeEditModal() {
  editingId = null;
  document.getElementById("modal-overlay").classList.remove("active");
}

function saveEdit() {
  if (!editingId) return;

  var text = document.getElementById("edit-input").value.trim();
  if (!text) return;

  var todo = todos.find(function (t) { return t.id === editingId; });
  if (todo) {
    todo.text = text;
    todo.category = document.getElementById("edit-category").value;
    todo.priority = document.getElementById("edit-priority").value;
    saveTodos();
    renderTodos();
  }

  closeEditModal();
}

window.addEventListener("DOMContentLoaded", function () {
  loadTodos();
  renderTodos();

  document.getElementById("todo-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = document.getElementById("todo-input");
    var text = input.value.trim();
    if (!text) return;

    var category = document.getElementById("category-select").value;
    var priority = document.getElementById("priority-select").value;

    addTodo(text, category, priority);
    input.value = "";
    input.focus();
  });

  document.getElementById("filter-category").addEventListener("change", renderTodos);
  document.getElementById("filter-priority").addEventListener("change", renderTodos);
  document.getElementById("filter-status").addEventListener("change", renderTodos);

  document.getElementById("edit-form").addEventListener("submit", function (e) {
    e.preventDefault();
    saveEdit();
  });

  document.getElementById("edit-cancel").addEventListener("click", closeEditModal);

  document.getElementById("modal-overlay").addEventListener("click", function (e) {
    if (e.target === this) {
      closeEditModal();
    }
  });
});
