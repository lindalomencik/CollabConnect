function onOpen(){
    DocumentApp.getUi()
        .createMenu('Custom Menu')
        .addItem('Show sidebar', 'showSidebar')
        .addToUi();
}

function showSidebar(){
    var html = HtmlService.crateHtmlOutputFromfile('Sidebar')
        .setTitle('Lock Sidebar');
    DocumentApp.getUi()
        .showSidebar(html);
}