// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     alert("I am popup!");
//     sendResponse({
//         data: "I am fine, thank you. How is life in the background?"
//     }); 
// });

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         const { type, value, videoId } = request;
//         console.log(type);
//     }
// );

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("button1").addEventListener("click", function(){
        alert("The button has been clicked on")
        var body = document.getElementsByTagName("body")[0].style.backgroundColor = "aqua";
    });
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "from the dom") {
            console.log("from dom");
            console.log(request.cursors);
        }
        sendResponse({msg: "response"});
    }
);
