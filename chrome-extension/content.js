// chrome.runtime.onMessage.addListener(gotMessage);
var docHTMLElementMap = [];
var docHTMLContextJSON = [];
function getUpdatedDoc() {
    // All the pages for the google doc
    docHTMLElementMap.splice(0, docHTMLElementMap.length);
    docHTMLContextJSON.splice(0, docHTMLContextJSON.length);
    // var doc_pages = document.getElementsByClassName("kix-page kix-page-header-clip-enabled docs-page docs-page-portrait kix-page-paginated");
    var doc_pages = document.getElementsByClassName("kix-page-paginated");
    console.log(doc_pages.length);

    // For each page, get the spans in each page
    for (let i = 0; i < doc_pages.length; i++) {
        console.log('i did it');
        // console.log("Page number ", i, " with elements: ", doc_pages[i]);
        // docHTMLElementMap.push({top: $(doc_pages[i]).offset().top, text: []});
        // docHTMLContextJSON[i] = [];

        // var page_text = doc_pages[i].getElementsByClassName("kix-wordhtmlgenerator-word-node");
        // for (let j = 0; j < page_text.length; j++) {
        //     let elementObj = {
        //         top: $(page_text[j]).offset().top,
        //         element: page_text[j],
        //     };

        //     // console.log("Page Element: ", elementObj);
        //     docHTMLElementMap[i].text.push(elementObj);
        //     docHTMLContextJSON[i].push(page_text[j].innerText);
        // }
    }

    // console.log("Final State: ", docHTMLElementMap);
}

function getElem(){
    const div = document.createElement('div');
    var collaborator_cursors = document.getElementsByClassName("kix-cursor docs-ui-unprintable");
    console.log(collaborator_cursors);

    for (var i = 0; i < collaborator_cursors.length; i++) {
        var cursor_name = collaborator_cursors[i].getElementsByClassName("kix-cursor-name")[0].innerText;
        console.log(cursor_name);
        const p = document.createElement('p');
        p.textContent = collaborator_cursors;
        div.append(p);
      if (cursor_name === ""){
        cursor_name = "Self";
      }
    }
    let onlineCollabs = document.querySelectorAll(".docs-presence-plus-collab-widget-container.goog-inline-block.docs-presence-plus-collab-widget-focus");
    console.log("onlineCollabs:", onlineCollabs);

}

window.addEventListener("load", function(event) {
    // console.log(document.getElementsByClassName('').length);

    getUpdatedDoc();
    getElem();
   
});

// chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
//     // Called at start to connect to socket
//     currentURL = req.url;
    
//     if  (req.message === "displayModal"){
//         getCollabStates();
//         console.log("called");
//         return true;
//     }
// });
function createModal(){
    chrome.system.display.getInfo({ singleUnified: true }, (info) => {
        console.log("gher");
        const wDimension = info[0].workArea;
        const { top, left, height, width } = wDimension;
        console.log(top);
        const w = 440;
        const h = 220;
        const l = width / 2 - w / 2 + left;
        const t = height / 2 - h / 2 + top;
        const newWindow = () => {
          console.log('in new window function');
        };
        chrome.windows.create(
          {
            url: 'index.html',
            type: 'popup',
            width: w,
            height: h,
            left: Math.round(l),
            top: Math.round(t),
          },
          newWindow
        );
        
      });
}

// (()=>{
//     let currentUrl = "";
//     chrome.runtime.onMessaqe.addListener((obj, sender,response)=>{
//         const {message, url} = obj;
//         if(message === "displayDialog") {
//             currentUrl = url;
//             createModal();
//         }

//     })
// })();



//   chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log(sender.tab ?
//                   "from a content script:" + sender.tab.url :
//                   "from the extension");
//       if (request.greeting === "hello")
//         sendResponse({farewell: "goodbye"});
//     }
//   );

// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.color === "green") {
      document.body.style.backgroundColor = "green";
      sendResponse({ status: "done" });
    }
  });