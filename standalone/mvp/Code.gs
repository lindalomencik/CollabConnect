// DocumentApp.openById('1kI2BLxrb0oSxyXBqaqBQ8Nb_ArtyMAHb_LlvhdldW_g')

function addToDoc(){
    const id = '1kI2BLxrb0oSxyXBqaqBQ8Nb_ArtyMAHb_LlvhdldW_g';
    const doc = DocumentApp.openById(id);
    const body = doc.getBody();
    body.appendParagraph('Hello World');
    body.appendPageBreak();
    Logger.log(doc);
}

function onOpen(){
    const ui = DocumentApp.getUi();
    ui.createMenu('Adv')
        .addItem('html Sidebar', 'side1')
}

function side1(){
    const html = HtmlService.createHtmlOutputFromFile('Sidebar')
        .setWidth(600)
        .setHeight(500);
    DocumentApp.getUi().showSidebar(html);
}
