chrome.commands.onCommand.addListener((command) => {

    if (command === 'displayModal')
        chrome.system.display.getInfo({ singleUnified: true }, (info) => {
        
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
    })