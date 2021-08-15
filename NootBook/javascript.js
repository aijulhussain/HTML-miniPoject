



//if user adds a note , then use it to the localstorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function (e) {

    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTitle.value="";
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();
});

//function to show element from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card my-2 mx-3" style="width: 20rem;">
            <div class="card-body">
                <h5 class="card-title"> ${element.title}</h5>
                <p class="card-title"> ${element.text}</p>
                <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>
        `;
    });
    let notesEle = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    }
    else {
        notesEle.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// function to delete a note
function deleteNotes(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }


    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {

    let searchTxt = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");

    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if (cardTxt.includes(searchTxt)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});