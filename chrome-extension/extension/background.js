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

// let myPromise = new Promise (function(myResolve, myReject){
//     const apiCall = 'https://docsaddonproject-service-2f6jvpnqoq-uc.a.run.app/getAll';

//         fetch(apiCall)
//             .then(response => response.json())
//             .then(data => {
//                 // data = JSON.stringify(data);
//                 const allPosts = data.data.map(loc => ({
//                     "title": loc.title,
//                     "text": loc.text
//                 }));
//                 console.log(allPosts);
//                 posts = allPosts;
//                 // response({status: "ready", posts: allPosts});
//                 // response({title: allPosts.title, text: allPosts.text});
//             })
//             .catch(error => {
//                 console.log(error)
//                 response("error");
//             });
//     if (posts){
//         myPromise(response);
//     }
// })

// const fetchPosts = async () => {
//     let allPosts;
//     const apiCall = 'https://docsaddonproject-service-2f6jvpnqoq-uc.a.run.app/getAll';
//     let res = await fetch(apiCall)
//         .then((response) => response.json)
//         .then(data => {
//             data = JSON.stringify(data);
//             const allPosts = data.data.map(loc => ({
//                 "title": loc.title,
//                 "text": loc.text
//             }));
//             allPosts = data;
//             console.log(allPosts);
//             return allPosts;
//         })
//     // console.log(response);
//     return res;
// }
console.log("start");

// import fetchAllPosts from "./api/fetchAllPosts";
chrome.runtime.onInstalled.addListener( details => {
    fetchAllPosts();
})

// async function fetchAllPosts(){
//     const apiCall = 'https://docsaddonproject-service-2f6jvpnqoq-uc.a.run.app/getAll';
//     const response = await fetch(apiCall);
//     const posts = await response.json();
//     return posts;
// }

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//     // let posts;
//     if(msg.name == "fetchWords"){
//         fetchAllPosts().then(response => {
//             console.log(response);
//             sendResponse({complete: true, posts: response.data})
//         })
//     }
//     return true;
// });


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