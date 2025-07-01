// Hàm cập nhật đồng hồ và lời chào
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const mins = now.getMinutes().toString().padStart(2, '0');
  const secs = now.getSeconds().toString().padStart(2, '0');
  document.getElementById('clockDisplay').textContent = `${hours}:${mins}:${secs}`;

  const greeting = document.getElementById("greeting");
  if (now.getHours() < 12) greeting.textContent = "Chào buổi sáng ☀️";
  else if (now.getHours() < 18) greeting.textContent = "Chào buổi chiều 🌤";
  else greeting.textContent = "Chào buổi tối 🌙";
}
setInterval(updateClock, 1000); // Cập nhật mỗi giây
updateClock(); // Gọi ngay khi load

// Chuyển đổi giao diện sáng tối
const themeToggle = document.getElementById("themeToggle");
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

// Khôi phục chế độ sáng/tối đã lưu
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

// Tạo và xử lý To-Do List
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoError = document.getElementById("todoError");

// Load danh sách việc từ localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
savedTodos.forEach(todo => createTodo(todo.text, todo.completed));

// Khi nhấn nút "Add"
document.getElementById("addTodo").onclick = () => {
  if (todoInput.value.trim() === "") {
    todoError.textContent = "Vui lòng nhập nội dung công việc.";
    return;
  }
  todoError.textContent = "";
  createTodo(todoInput.value);
  todoInput.value = "";
};

// Tạo công việc mới
function createTodo(text, completed = false) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  if (completed) li.classList.add("completed");
  checkbox.onchange = () => {
    li.classList.toggle("completed");
    saveTodos();
  };

  const delBtn = document.createElement("button");
  delBtn.textContent = "Xoá";
  delBtn.onclick = () => {
    li.remove();
    saveTodos();
  };

  li.append(checkbox, span, delBtn);
  todoList.appendChild(li);
  saveTodos();
}

// Lưu danh sách công việc vào localStorage
function saveTodos() {
  const todos = [];
  todoList.querySelectorAll("li").forEach(li => {
    todos.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Bộ lọc công việc: tất cả, hoàn thành, chưa hoàn thành
function filterTodos(type) {
  const items = todoList.querySelectorAll("li");
  items.forEach(item => {
    const completed = item.classList.contains("completed");
    item.style.display =
      type === "all" ||
      (type === "completed" && completed) ||
      (type === "incomplete" && !completed)
        ? "flex"
        : "none";
  });
}

// Sticky Notes
const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");
const noteError = document.getElementById("noteError");
const colors = ["#f39c12", "#e74c3c", "#2ecc71", "#3498db", "#9b59b6"];

// Load ghi chú từ localStorage
const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
savedNotes.forEach(noteText => createNote(noteText));

// Khi nhấn nút thêm ghi chú
document.getElementById("addNote").onclick = () => {
  if (noteInput.value.trim() === "") {
    noteError.textContent = "Vui lòng nhập nội dung ghi chú.";
    return;
  }
  noteError.textContent = "";
  createNote(noteInput.value);
  noteInput.value = "";
};

// Tạo ghi chú mới
function createNote(text) {
  const note = document.createElement("div");
  note.className = "note";
  note.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  note.innerHTML = `<div class="delete">&times;</div>${text}`;
  note.querySelector(".delete").onclick = () => {
    note.remove();
    saveNotes();
  };
  notesContainer.appendChild(note);
  saveNotes();
}

// Lưu ghi chú vào localStorage, loại bỏ nút ×
function saveNotes() {
  const notes = [];
  notesContainer.querySelectorAll(".note").forEach(note => {
    const content = note.cloneNode(true);
    content.querySelector(".delete").remove(); // loại bỏ nút x
    notes.push(content.textContent.trim());
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
