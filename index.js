// this line was for testing
console.log("this is a notes app by class and constructor method");



// -------------------------------------------------------------------------
// this class creates an object
class note {
  constructor(userTitle, userNote, noteTime) {
    this.title = userTitle;
    this.note = userNote;
    this.time = noteTime;
  }
}

// this class is only for methods/functions
class notesFunction {
  // this function will display the notes from the localstorage
  display() {
    let arr = JSON.parse(localStorage.getItem("notes"));
    let container = document.getElementById("cardContainer");
    let html = "";
    for (let i = 0; i < arr.length; i++) {
      html += `  <div class="card mx-3 my-3" style="width: 19rem;">
                            <div class="card-body">
                                <h5 class="card-title"> Notes ${i + 1}</h5>
                                <h3 class="card-text">${arr[i]["title"]}</h3>
                                <p class="card-text">${arr[i]["note"]}</p>
                                <p class="card-text">${arr[i]["time"]}</p>
                                <a href="#" class="btn btn-danger" id ='${i}' onClick = deletenote(this.id)>delete</a>
                            </div>
                     </div>`;
    }
    container.innerHTML = html;
  }

  // this function will clear the input feilds after an note is being added
  clear() {
    let title = document.getElementById("notetitle");
    let usernote = document.getElementById("note");

    title.value = "";
    usernote.value = "";
  }

  // this funciton will delete the note from the localstorage and will update the localstorage and then it will run the display function
  deletethisnote(id) {
    let arr = JSON.parse(localStorage.getItem("notes"));

    arr.splice(id, 1);
    localStorage.setItem("notes", JSON.stringify(arr));
    this.display();
  }

  // this function will show the message after  clicking on add note btn
  showPopUpMessage(type, displaymessage) {
    let boldText;
    if (type == "success") {
      boldText = "successful";
    } else if (type == "danger") {
      boldText = "Error";
    }

    let message = document.getElementById("message");
    let html = `<div class="column ">
                        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>${boldText}:</strong> ${displaymessage}
                        </div>
                    </div>`;

    message.innerHTML = html;
    setTimeout(function () {
      message.innerHTML = "";
    }, 1500);
  }
}
// ---------------------------------------------------------------------------



// ---------------------------------------------------------------------
// this will run as first line of javascript . this will check the local storage . if user has notes in his local storage then it will show him those notes

let notesfromlocalstorage = localStorage.getItem("notes");
if (notesfromlocalstorage === "[]" || notesfromlocalstorage === null) {
  let cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = `<h2 class='text-light'>nothing to show! use 'Add a note' section above to add notes</h2>`;
} else if (notesfromlocalstorage != null) {
  let notefunction = new notesFunction();
  notefunction.display();
}


// -------------------------------------------------------------------------
// # if localstorage is empty then it will strart from here
// grabbed all the elements . like title, note
let title = document.getElementById("notetitle");
let usernote = document.getElementById("note");

// grabbed the button
let addnote = document.getElementById("addnote");

// added an eventlistner to a button
addnote.addEventListener("click", function (e) {
  // e.preventDefault()

  // this if else case will ensure that user has enterd some value or not. if user has enterd some value then that will be added as note  . or else user will get a pop up message that enter some value
  if (title.value && usernote.value != "") {
    // grabbing a date of pc
    let caurrentTime = new Date();
    // creating a time variable and in that we are storing hour:minutes as a string
    let time = `${caurrentTime.getHours()} : ${caurrentTime.getMinutes()}`;

    // we are passing all the input values of user into an constructor to create an object. we are gonna get object in a notes variable
    let notes = new note(title.value, usernote.value, time);

    // grabing the notes which is in string form
    let notesfromlocalstorage = localStorage.getItem("notes");

    let arr;
    // when nothing is present in localstorage it will return null . if it returns null then make an empty array
    if (notesfromlocalstorage == null) {
      arr = [];
    } else {
      // if any note is present in local storage then parse it . here we will get an array coz we have pushed all objects in an array
      arr = JSON.parse(notesfromlocalstorage);
    }
    // here we will pass the notes object from an user to this array
    arr.push(notes);

    // then again we gonna set the localstorage with same key and value pair . but always remeber that you have to stringfy the array
    localStorage.setItem("notes", JSON.stringify(arr));

    // here we are creating an object as notefucntion and using its methods or functions
    let notefunction = new notesFunction();
    notefunction.clear();
    notefunction.display();

    let successmessage = "successfully added the note ";
    notefunction.showPopUpMessage("success", successmessage);
  } else {
    let notefunction = new notesFunction();
    let message = "you have not filled the input fields ";
    notefunction.showPopUpMessage("danger", message);
  }
});
// -------------------------------------------------------------------------


// -------------------------------------------------------------------------
// this function will run when user clicks on that delete button of that particular note
function deletenote(id) {
  let notefunction = new notesFunction();
  notefunction.deletethisnote(id);

  let notesfromlocalstorage = JSON.parse(localStorage.getItem("notes"));
  console.log(notesfromlocalstorage);

  if (notesfromlocalstorage.length === 0) {
    let cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = `<h2 class='text-light'>nothing to show! use 'Add a note' section above to add notes</h2>`;
  }
}
// -------------------------------------------------------------------------



// -------------------------------------------------------------------------

let search = document.getElementById("search");
search.addEventListener("input", function () {
  console.log(search.value);
  let searchvaluetoLowercase = search.value.toLowerCase();

  let card = document.getElementsByClassName("card");
  console.log(card);

  for (let i = 0; i < card.length; i++) {
    console.log(card[i]);
    let cardtitle = card[i].getElementsByTagName("h3")[0].innerText;
    console.log(cardtitle);

    if (cardtitle.includes(searchvaluetoLowercase)) {
      card[i].style.display = "block";
    } else {
      card[i].style.display = "none";
    }
  }
});
// ------------------------------- end ------------------------------------------
