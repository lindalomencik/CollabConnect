var url;
chrome.commands.onCommand.addListener((command) => {
  // console.log('hello?');
  console.log(`Command "${command}" triggered`);

  if (command === "inject-script") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      url = activeTab.url;
      console.log(activeTab.url);

      if ( url.indexOf(  "https://docs.google.com/document/" ) > -1 ) {
        chrome.tabs.sendMessage(
          activeTab.id,
          { message: "displayModal" },
          function (response) {
            console.log(response);
          }
        );
      }  
    });
  }
});

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: false };
  let [tab] = chrome.tabs.query(queryOptions);
  return tab;
}

async function fetchSummary() {
  // let url = getCurrentTab();
  const myArray = url.split("/");
  const docId = myArray[5];

  const apiCall = `https://docsaddonproject-service-2f6jvpnqoq-uc.a.run.app/getSummary/${docId}`;
  const response = await fetch(apiCall);
  const posts = await response.json();
  return posts;
}

async function fetchLockedPosts() {
  const myArray = url.split("/");
  const docId = myArray[5];

  const apiCall = `https://docsaddonproject-service-2f6jvpnqoq-uc.a.run.app/getAll/${docId}`;
  const response = await fetch(apiCall);
  const posts = await response.json();
  return posts;
}

async function deletePost(id) {
  console.log(id);
  const apiCall = `https://docsaddonproject-service-2f6jvpnqoq-uc.a.run.app/deletePost/${id}`;
  const response = await fetch(apiCall, { method: 'DELETE' });
  return response;
}

async function getAllEditors() {
  const myArray = url.split("/");
  const docId = myArray[5];

  const apiCall = `https://docsaddonproject-service-2f6jvpnqoq-uc.a.run.app/getEditors/${docId}`;
  const response = await fetch(apiCall);
  const posts = await response.json();
  return posts;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // let posts;
  if (msg.name == "fetchLocked") {
    fetchLockedPosts().then((response) => {
      console.log(response);
      sendResponse({ complete: true, allPosts: response.data });
    });
  }
  if (msg.name == "fetchSummary") {
    fetchSummary().then((response) => {
      console.log(response);
      sendResponse({ complete: true, allPosts: response.data });
    });
  }
  if (msg.name == "deletePost") {
    deletePost(msg.postId).then((response) => {
      console.log(response);
      sendResponse({ complete: true, allPosts: response.data });
    });
  }
  if (msg.name == "getAllEditors") {
    getAllEditors().then((response) => {
      console.log(response);
      sendResponse({ complete: true, allPosts: response.data });
    });
  }
  return true;
});
