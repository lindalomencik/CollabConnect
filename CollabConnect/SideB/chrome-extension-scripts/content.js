// CollabAlly
function getCollaboratorNames() {
  const div = document.createElement("div");
  var collaborator_cursors = document.getElementsByClassName(
    "kix-cursor docs-ui-unprintable"
  );
  let allCollaborators = [];

  for (var i = 0; i < collaborator_cursors.length; i++) {
    var cursor_name =
      collaborator_cursors[i].getElementsByClassName("kix-cursor-name")[0]
        .innerText;
    if (cursor_name !== "") {
      allCollaborators.push(cursor_name);
    }
  }
  return allCollaborators;
}

function writeCollaborators(tabName) {
  chrome.runtime.sendMessage({ name: "getAllEditors" }, (results) => {
    let htmlStr = "";

    allCollaborators = getCollaboratorNames();
    collabCount = allCollaborators.length;

    htmlStr = `<h2 tabindex="0">Number of Collaborators: ${collabCount}</h2>`;

    if (allCollaborators.length != 0) {
      htmlStr += [`<div tabindex="0"><h2> ${tabName} list: </h2></div>`];
      for (i in allCollaborators) {
        htmlStr += `<p>  ${allCollaborators[i]} </p>`;
      }
      htmlStr += "<hr/>";
    }
    htmlStr += `<div><h2>Number of Editors: ${results.allPosts.length}</h2></div>`;
    htmlStr += `<div tabindex="0"><h2>Editor list: </h2></div>`;

    for (let i = 0; i < results.allPosts.length; i++) {
      htmlStr += `<div tabindex="0"><p>${results.allPosts[i].name}<p></div>`;
    }

    $(`#${tabName}`).html(htmlStr);
    $("#modal-content").css("display", "block");
    $(`#${tabName}`).css("display", "block");
  });
}

function writeLocked(tabName) {
  chrome.runtime.sendMessage({ name: "fetchLocked" }, (results) => {
    let htmlStr = "";
    let collab_tts = `<h2>Number of Locked Sections: ${results.allPosts.length}</h2><hr/>`;
    htmlStr += `<div tabindex="0">${collab_tts}</div>`;
    htmlStr += `<div tabindex="0"> <h2>${tabName} Sections list: </h2></div>`;

    for (let i = 0; i < results.allPosts.length; i++) {
      htmlStr += `<div><h4 tabindex="0" >${results.allPosts[i].title}</h4><h3 tabindex="0">${results.allPosts[i].author}</h3><p tabindex="0">${results.allPosts[i].text}</p></div>`;
    }

    $(`#${tabName}`).html(htmlStr);
    $("#modal-content").css("display", "block");
    $(`#${tabName}`).css("display", "block");
  });
}

async function deleteSummary(id) {
  console.log("click" + id);
  await chrome.runtime.sendMessage(
    { name: "deletePost", postId: `${id}` },
    (results) => {
      console.log(results);
      openChange("Text");
      $("#Locked").load(location.href + " #Locked");
    }
  );
}

//https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

async function writeTextChanges(tabName) {
  await chrome.runtime.sendMessage({ name: "fetchSummary" }, (results) => {
    let htmlStr = "";
    let collab_tts = `<h2>Number of Summarised Sections: ${results.allPosts.length}</h2><hr/>`;
    htmlStr += `<div tabindex="0">${collab_tts}</div>`;
    htmlStr += `<div tabindex="0"> <h2>${tabName} Changes list: </h2></div>`;

    for (let i = 0; i < results.allPosts.length; i++) {
      if (results.allPosts[i].summary != "null") {
        htmlStr += `<div class="output"> 
          <h4 tabindex="0">${results.allPosts[i].title}</h4>
          <h3 tabindex="0">${results.allPosts[i].author}</h3>
          <p tabindex="0"> Text: ${results.allPosts[i].text}</p>
          <p tabindex="0"> New Text: ${results.allPosts[i].new_text}</p>
          <p tabindex="0"> Summary: ${results.allPosts[i].summary}</p>
          <button type="button" class="myButton" value=${results.allPosts[i].id}>Delete Summary</button>
        </div>`;
      }
    }

    $(`#${tabName}`).html(htmlStr);
    $("#modal-content").css("display", "block");
    $(`#${tabName}`).css("display", "block");
  });

  waitForElm(".myButton").then((elm) => {
    $(".myButton").on("click", function () {
      deleteSummary(this.value);
    });
  });
}

function updateModal(changeClass) {
  $("#modal-status").css("display", "none");

  if (changeClass == "Collaborators") {
    writeCollaborators("Collaborators");
  }
  if (changeClass == "Locked") {
    writeLocked("Locked");
  }
  if (changeClass == "Text") {
    writeTextChanges("Text");
  }

  $(`#${changeClass}`).html("");
  $("#modal-content").css("display", "block");
  $(`#${changeClass}`).css("display", "block");
}

//CollabAlly
function openChange(changeName) {

  var x = document.getElementsByClassName("changes");
  for (var i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  var tabs = document.getElementsByClassName("tab_button");
  for (let j = 0; j < tabs.length; j++) {
    tabs[j].setAttribute("aria-pressed", "false");
  }

  document.getElementById(changeName).style.display = "block";
  document
    .getElementById(`tab_${changeName}`)
    .setAttribute("aria-pressed", "true");

  updateModal(changeName);
}

let focusElement;

//CollabAlly
function loadingModal() {
  focusElement = document.activeElement;

  $("#modal-status").css("display", "block");
  $("#myModal").css("display", "block");

  $("#tab_Collaborators").on("click", function () {
    // console.log("Opening Collab");
    openChange("Collaborators");
  });
  $("#tab_Locked").on("click", function () {
    // console.log("Opening Comments");
    openChange("Locked");
  });

  $("#tab_Text").on("click", function () {
    // console.log("Opening Text Change");
    openChange("Text");
  });

  openDialog('dialog1', this, "tab_Collaborators");

}

//CollabAlly
function CloseDialog() {

  try {
    console.log("Closing Dialog");

    // Get all the elements to manipulate
    var body = document.getElementsByTagName("body");
    var landmarks = document.querySelectorAll("header, main, footer");
    var overlay = document.getElementById("MyModal");
    var dialog = document.getElementById("dialog1");
    // Make the regions available to AT
    for (var i = 0; i < landmarks.length; i++) {
      landmarks[i].removeAttribute("aria-hidden");
      landmarks[i].removeAttribute("inert");
    }
    // Remove the overlay
    overlay.style.display = "none";
    // Return the scrollbar
    body[0].style.overflow = "auto";
    // Kill the dialog
    dialog.removeAttribute("aria-modal");
    dialog.removeAttribute("data-id");
    dialog.setAttribute("hidden", "");

  } catch (e) {
    console.log("CloseDialog Error: " + e);
  }
}

//CollabAlly
function initializeModal() {
  $("body").append('<div id="dialog"></div>');

  $("#dialog").load(chrome.runtime.getURL("/dialog.html"), function () {
    loadingModal();

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == document.getElementById("MyModal")) {
        document.getElementById("close_modal").click();
        $("#myModal").css("display", "none");
      }
    };
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.message === "displayModal") {
    // sendMsg();
    initializeModal();
    sendResponse("opened modal box");
  }
});