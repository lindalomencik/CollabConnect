// chrome.runtime.onInstalled.addListener(()=>{
//     console.log("hello world");
//     chrome.runtime.sendMessage({
//         data: "Hello popup, how are you"
//     }, function (response) {
//         console.log(response);
//     });
// })

// chrome.tabs.onUpdated.addListener(function
//     (tabId, changeInfo, tab) {
//         if(changeInfo.status ===  "complete") {
//             console.log(tab.url);
//             url = tab.url
    
//                 chrome.tabs.sendMessage(tabId, {
//                     type: "NEW",
//                     url: url,
//                 })
            
//         }
//     }
// );

chrome.commands.onCommand.addListener((command) => {
    // console.log('hello?');
    console.log(`Command "${command}" triggered`);

    if (command === "inject-script") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            console.log(activeTab.id);
    
            chrome.tabs.sendMessage(activeTab.id, {message: "displayModal"}, function
            (response){
                console.log(response);
            });
        });
    }  
});

// chrome.commands.onCommand.addListener((command) => {
//     console.log(`Command "${command}" triggered`);
//     // const [tab] =  chrome.tabs.query({active: true, lastFocusedWindow: true});
//     const tab = chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     });
//     console.log(tab);
//     chrome.tabs.sendMessage(tab, {greeting: "hello"}, function(response){
//         console.log(response);
//     });
    // do something with response here, not outside the function
   

    // chrome.runtime.sendMessage({greeting: "hello"}, function(response){
    //     console.log("response.farewell")
    //     if(response.farewell === "goodbye"){
    //         console.log(response.farewell);
    //     }
    //   });

    // chrome.runtime.onMessage.addListener(
    //     function(request, sender, sendResponse) {
    //         console.log(sender.tab ?
    //             "from a content script" + sender.tab.url :
    //             "from the extension");
    //         if (request.greeting === "hello")
    //             sendResponse({farewell: "goodbye"});
    //     }
    // )

//   });


// chrome.runtime.onInstalled.addListener(() => {

// })