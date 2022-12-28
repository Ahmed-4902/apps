// SELECTORS
const addBox = document.querySelector(".add-box"),
	popupBox = document.querySelector(".popup-box"),
	popupTitle = document.querySelector("header p"),
	closeIcon = document.querySelector("header i"),
	titleTag = document.querySelector("input"),
	descTag = document.querySelector("textarea"),
	addBtn = document.querySelector("button");

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let log = console.log;
let isUpdate = false,
	updated;

// FUNCTIONS
const togglePopup = () => {
	// isUpdate = false;
	titleTag.focus();
	titleTag.value = "";
	descTag.value = "";
	addBtn.innerText = "Add Note";
	popupTitle.innerText = "Add a new Note";
	popupBox.classList.toggle("show");
};
const addTask = (e) => {
	e.preventDefault();
	let noteTitle = titleTag.value,
		noteDesc = descTag.value;

	if (noteTitle || noteDesc) {
		let dateObj = new Date(),
			day = dateObj.getDate(),
			month = months[dateObj.getMonth()],
			year = dateObj.getFullYear();

		let noteInfo = {
			title: noteTitle,
			description: noteDesc,
			date: `${month} ${day} ${year}`,
		};
		if (!isUpdate) {
			notes.push(noteInfo);
		} else {
			isUpdate = false;
			notes[updated] = noteInfo;
		}
		localStorage.setItem("notes", JSON.stringify(notes));
		closeIcon.click();
		showNotes();
	}
};
const showNotes = () => {
	document.querySelectorAll(".note").forEach((note) => {
		note.remove();
	});
	notes.forEach((note, index) => {
		let liTag = `
					<li class="note">
				<div class="details">
					<p>${note.title}</p>
					<span>${note.description}</span>
				</div>
				<div class="bottom-content">
					<span>${note.date}</span>
					<div class="settings">
						<i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
						<ul class="menu">
							<li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="fa-solid fa-pen"></i>Edit</li>
							<li onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i>Delete</li>
						</ul>
					</div>
				</div>
			</li>
		`;
		addBox.insertAdjacentHTML("afterend", liTag);
	});
};
const showMenu = (ele) => {
	ele.parentElement.classList.add("show");
	document.addEventListener("click", (e) => {
		if (e.target.tagName != "I" || e.target != ele) {
			ele.parentElement.classList.remove("show");
		}
	});
};
const deleteNote = (noteId) => {
	let confirmDel = confirm("Are you sure you want to delete this note?")
	if(!confirmDel) return
	notes.splice(noteId, 1);
	localStorage.setItem("notes", JSON.stringify(notes));
	showNotes();
};
const updateNote = (noteId, title, desc) => {
	isUpdate = true;
	updated = noteId;
	addBox.click();
	titleTag.value = title;
	descTag.value = desc;
	addBtn.innerText = "Update Note";
	popupTitle.innerText = "Update a Note";
};

// EVENTS
addBox.addEventListener("click", togglePopup);
closeIcon.addEventListener("click", togglePopup);
addBtn.addEventListener("click", addTask);
showNotes();
