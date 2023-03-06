// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         const { type, value, videoId } = request;
//         console.log(type);
//     }
// );

//   chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log(sender.tab ?
//                   "from a content script:" + sender.tab.url :
//                   "from the extension");
//       if (request.greeting === "hello")
//         sendResponse({farewell: "goodbye"});
//     }
//   );

function loadingModal() {
  $('#modal-content').css('display', "none");
  $('#modal-status').css('display', "block");
  $('#myModal').css('display', "block");

  $("#tab_Collaborators").on('click', function() {
      openChange('Collaborators');
  });

  $("#tab_Comments").on('click', function() {
      console.log("Opening Comments");
      openChange('Comments');
  })

  $("#tab_Text").on('click', function() {
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
}

function OpenDialog() {
  console.log("Opening Dialog");
  $('#modal-status').text('Loading information');
  focusElement = document.activeElement;
  // //   DialogTrigger = btnID;
  //   // Get all the elements to manipulate
    var body = document.getElementsByTagName("body");
  //   var landmarks = document.querySelectorAll("header, main, footer");
    var overlay = document.getElementById("myModal");  
    var dialog = document.getElementById("modal-content");  
    console.log(dialog);
    // var focusElm = document.getElementById("modal-body");
  //   // Hide the content regions from AT
  //   for (var i = 0; i < landmarks.length; i++) {
  //     landmarks[i].setAttribute("aria-hidden","true");
  //     landmarks[i].setAttribute("inert","");
  //   }
  //   // Hide the content behind the overlay
    overlay.style.display = "block";
  //   // Add click handler to overlay
  //   // Kill the page scroll
    body[0].style.overflow = "hidden";
  //   // Set the dialog to modal
    dialog.setAttribute("aria-modal","true");
    dialog.removeAttribute("hidden"); 
  //   // Put focus on the close button
  //   // Normally I would put it on the modal, but this fits
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

      // Return focus to trigger
      console.log('FocusElement: ', focusElement);

      focusElement.focus();

  } catch (e) {
    console.log("CloseDialog Error: " + e);
  }
}

function initializeModal() {
  $('body').append('<div id="dialog"></div>')
  $('#dialog').load(chrome.runtime.getURL('/popup.html'), function() {
      loadingModal();
      
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == document.getElementById("myModal")) {
              $('#myModal').css('display', "none");
          }
      }
  });
}

let collaborator_cursors = document.getElementsByClassName("kix-cursor docs-ui-unprintable");

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