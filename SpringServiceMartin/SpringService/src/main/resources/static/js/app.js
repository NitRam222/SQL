
const container = document.querySelector(".container");
const noteTemplate = document.getElementById("note");
const noteService = NoteService(RestService("http://localhost:8080/api/notes"), container, noteTemplate);
const newNote = document.getElementById("new-note");

const postNote = () => {
    if (!newNote.value) return;
    noteService.add({ content: newNote.value });
    newNote.value = "";
};

document.getElementById("submit-note").addEventListener("click", postNote);

newNote.addEventListener("keypress", event => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    postNote();
});


