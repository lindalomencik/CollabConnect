function getCollaboratorNames(){
  const div = document.createElement('div');
  var collaborator_cursors = document.getElementsByClassName("kix-cursor docs-ui-unprintable");
  // console.log(collaborator_cursors);
  let allCollaborators =[];

  for (var i = 0; i < collaborator_cursors.length; i++) {
      var cursor_name = collaborator_cursors[i].getElementsByClassName("kix-cursor-name")[0].innerText;
      // allCollaborators.push(cursor_name);
    if (cursor_name !== ""){
      // cursor_name = "Self";
      allCollaborators.push(cursor_name);
    }
  }
  // let onlineCollabs = document.querySelectorAll(".docs-presence-plus-collab-widget-container.goog-inline-block.docs-presence-plus-collab-widget-focus");
  // console.log("onlineCollabs:", onlineCollabs);
  return allCollaborators;
}

function getClassObject(tabName){
  let classSummary = [];
  let classArray = [`<div> ${tabName} list: </div><br>`];

  const collabPage = {
    classSummary,
    classArray
  } 
  
  if (tabName === "Collaborators"){
    allCollaborators = getCollaboratorNames();
    collabCount = allCollaborators.length;

    let collab_tts = `<h1>Number of Collaborators: ${collabCount}</h1>`
    classSummary.push(collab_tts);

    for (i in allCollaborators){
      let collab_elem  = `<p>  ${allCollaborators[i]} </p>`;
      classArray.push(collab_elem);
    }
    return collabPage;
  }

  else if (tabName === "Text"){
    classSummary.push(`<h1>Number of Text Chnages: 4</h1>`);
    classArray.push(`<p>array for text</p>`);
    return collabPage;
  }
  else if (tabName === "Comments"){
    classSummary.push(`<h1>Number of Comments: 14</h1>`);
    classArray.push([`<p>array for comments</p>`, `<p>array for comments</p>`]);
    return collabPage;
  } 

}
  

function updateModal(changeClass, objectArray, objectSummary = null) {
  console.log(changeClass);
  console.log(objectArray);
  console.log(objectSummary);

  let htmlStr = "";
  if (objectSummary){
    htmlStr += `<div>${objectSummary}</div>`
  };

  for (let i = 0; i < objectArray.length; i++) {
      htmlStr += `<div>${objectArray[i]}</div>`;
  }

  $(`#${changeClass}`).html(htmlStr);
  $('#modal-content').css('display', "block");
  $(`#${changeClass}`).css('display', "block"); 
} 



function loadingModal() {
  // $('#modal-content').css('display', "none");
  $('#myModal').css('display', "block");

  $("#tab_Collaborators").on('click', function() {
    // console.log("Opening Collab");
    openChange('Collaborators');
  });
  $("#tab_Comments").on('click', function() {
      // console.log("Opening Comments");
      openChange('Comments');
  })

  $("#tab_Text").on('click', function() {
    // console.log("Opening Text Change");
      openChange('Text');
  })

  $('#myModal').css('display', "block");
  OpenDialog();
}

function openChange(changeName) {
  var i;
  var x = document.getElementsByClassName("changes");
  for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
  }

  var tabs = document.getElementsByClassName("tab_button");
  for(let j = 0; j < tabs.length; j++) {
      tabs[j].setAttribute("aria-pressed", "false");
  }

  document.getElementById(changeName).style.display = "block";
  document.getElementById(`tab_${changeName}`).setAttribute("aria-pressed", "true");
  
  updateModal(changeName, getClassObject(changeName).classArray, getClassObject(changeName).classSummary);
}

// let collaborator_cursors = document.getElementsByClassName("kix-cursor docs-ui-unprintable");
function OpenDialog() {
  console.log("Opening Dialog");
  var dialog = document.getElementById("modal-body");

  $(".modal_close").on('click', function() {
      CloseDialog();
  });

  // Close comment and text change div- show collab by default
  openChange("Collaborators");
  dialog.focus();
}

function CloseDialog() {
  try {
      console.log("Closing Dialog");

      // Get all the elements to manipulate
      var body = document.getElementsByTagName("body");
      var landmarks = document.querySelectorAll("header, main, footer");
      var overlay = document.getElementById("myModal");
      var dialog = document.getElementById("main_modal");
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
      dialog.setAttribute("hidden","");

  } catch (e) {
    console.log("CloseDialog Error: " + e);
  }
}

function initializeModal() {
  $('body').append('<div id="dialog"></div>')
  
  $('#dialog').load(chrome.runtime.getURL('/dialogBox.html'), function() {
      loadingModal();
      
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == document.getElementById("myModal")) {
              $('#myModal').css('display', "none");
          }
      }
  });
}



//for sending a message to popup.js
function sendMsg(){
  console.log("content new");

  console.log(collaborator_cursors);
  var myMessage = "openDialog";  // Assign your text to this variable

  chrome.runtime.sendMessage({
    message: myMessage, 
    cursors: document.getElementsByClassName("kix-cursor docs-ui-unprintable")
  }, 
  function(response) {
      console.log(response.msg)
  });
}


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.message === "displayModal"){
      // sendMsg();
      initializeModal();
      sendResponse("opened modal box");
    }
      
      // if (request.greeting === "hello"){
      //     console.log(request.greeting);
      //     sendResponse({farewell: "response from content"});
      //     // sendMsg();
      // }
  }
)