// chrome.commands.onCommand.addListener((command) => {

//     if (command === 'showSettings'){
//         chrome.system.display.getInfo({ singleUnified: true }, (info) => {
//           console.log("gher");
//           const wDimension = info[0].workArea;
//           const { top, left, height, width } = wDimension;
//           console.log(top);
//           const w = 440;
//           const h = 220;
//           const l = width / 2 - w / 2 + left;
//           const t = height / 2 - h / 2 + top;
//           const newWindow = () => {
//             console.log('in new window function');
//           };
//           chrome.windows.create(
//             {
//               url: 'index.html',
//               type: 'popup',
//               width: w,
//               height: h,
//               left: Math.round(l),
//               top: Math.round(t),
//             },
//             newWindow
//           );
          
//         });

      
//     }

  

// })
// chrome.tabs.onUpdated.addListener((tabId, tab)=>{
//   // console.log(tab.url);
//   if (tab.url && tab.url.includes("https://docs.google.com/document")){
//     chrome.tabs.sendMessage(tabId, {
//       text: "displayDialog",
//       url: tab.url,
//     })
//   }
// })

chrome.tabs.onUpdated.addListener((tabId, tab)=>{
  const response = chrome.runtime.sendMessage({greeting: "hello"});
  // do something with response here, not outside the function
  console.log(response);

})
