const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const notesContainer = document.getElementById("notesContainer");

// Load saved notes from localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Display all notes
function displayNotes() {
  notesContainer.innerHTML = "";

  const sortedNotes = [...notes].sort(function (a, b) {
    return Number(b.pinned) - Number(a.pinned);
  });

  const searchText = searchInput.value.toLowerCase();

  sortedNotes.forEach(function (note) {
    const index = notes.indexOf(note);

    // Skip notes that don't match the search text
    if (!note.text.toLowerCase().includes(searchText)) {
      return;
    }

    const noteElement = document.createElement("div");

    if (note.pinned) {
      noteElement.classList.add("pinned");
    }
    noteElement.classList.add("note");

    const noteDate = document.createElement("small");
    noteDate.classList.add("time");
    noteDate.textContent = note.date;

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️ Edit";
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", function () {
      const updatedNote = prompt("Edit your note:", note.text);

      if (updatedNote !== null && updatedNote.trim() !== "") {
        notes[index].text = updatedNote.trim();

        localStorage.setItem("notes", JSON.stringify(notes));

        displayNotes();
      }
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️ Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
      notes.splice(index, 1);

      localStorage.setItem("notes", JSON.stringify(notes));

      displayNotes();
    });

    // Pin Button
    const pinBtn = document.createElement("button");
    pinBtn.textContent = note.pinned ? "📌 Unpin" : "📍 Pin";
    pinBtn.classList.add("pin-btn");

    pinBtn.addEventListener("click", function () {
      notes[index].pinned = !notes[index].pinned;

      localStorage.setItem("notes", JSON.stringify(notes));

      displayNotes();
    });

    noteElement.appendChild(noteDate);
    noteElement.appendChild(noteText);
    noteElement.appendChild(pinBtn);
    noteElement.appendChild(editBtn);
    noteElement.appendChild(deleteBtn);

    notesContainer.appendChild(noteElement);
  });
}

// Add Note
addBtn.addEventListener("click", function () {
  const noteText = noteInput.value.trim();

  if (noteText === "") {
    alert("⚠️ Please write a note first.");
    return;
  }

  const note = {
    text: noteText,
    date: new Date().toLocaleString(),
    pinned: false,
  };

  notes.push(note);

  localStorage.setItem("notes", JSON.stringify(notes));

  displayNotes();

  noteInput.value = "";
});

// Live Search
searchInput.addEventListener("input", function () {
  displayNotes();
});

// Display saved notes when the page loads
displayNotes();
