//    .openById('1kI2BLxrb0oSxyXBqaqBQ8Nb_ArtyMAHb_LlvhdldW_g')
function onOpen(){
  var docId = DocumentApp.getActiveDocument().getId();
  addDocument(docId);
  
  const ui = DocumentApp.getUi();
  ui.createMenu('Add on')  
      .addItem('Sidebar', 'openSidebar')
      .addItem('Lock Dialog Box', 'openLockDialog')
      .addItem('Unlock Dialog Box', 'openUnlockDialog')
      .addToUi();

  // const documentProperties = PropertiesService.getDocumentProperties();
  // const users = documentProperties.getKeys();
  // Logger.log(users.includes(getActiveUser()));
  //   if(!users.includes(getActiveUser())){
  //     setColors();
  //   }
}

function onInstall(){
  onOpen();
  setColors();
};

function reportSelection () {
  var doc = DocumentApp.getActiveDocument();
  var selection = doc.getSelection();
  var ui = DocumentApp.getUi();
  
  var report = "Your Selection: ";

  if (!selection) {
    report += " No current selection ";
    ui.alert( report );
  }

  else if (selection){
    var elements = selection.getSelectedElements();
    // Report # elements. For simplicity, assume elements are paragraphs
    // report += " Paragraphs selected: " + elements.length + ". ";
    if (elements.length > 1) {
    }
    else {
      var element = elements[0].getElement();
      var startOffset = elements[0].getStartOffset();      // -1 if whole element
      var endOffset = elements[0].getEndOffsetInclusive(); // -1 if whole element
      var selectedText = element.asText().getText();       // All text from element
      // Is only part of the element selected?
      if (elements[0].isPartial())
        selectedText = selectedText.substring(startOffset,endOffset+1);

      // Google Doc UI "word selection" (double click)
      // selects trailing spaces - trim them
      selectedText = selectedText.trim();
      endOffset = startOffset + selectedText.length - 1;

      // Now ready to hand off to format, setLinkUrl, etc.
      openLockDialog(selectedText)
      // report += " Selected text is: '" + selectedText + "', ";
      // report += " and is " + (elements[0].isPartial() ? "part" : "all") + " of the paragraph."
      // Logger.log(selectedText);
    }
  }
  
}

// https://stackoverflow.com/questions/67391525/javascript-generate-random-pastel-hex-rgba-color
function getColor(){ 
  let R = Math.floor((Math.random() * 127) + 127);
  let G = Math.floor((Math.random() * 127) + 127);
  let B = Math.floor((Math.random() * 127) + 127);
  
  let rgb = (R << 16) + (G << 8) + B;
  return `#${rgb.toString(16)}`;      
}

function deleteProp(){
  var userProperties = PropertiesService.getDocumentProperties();
  userProperties.deleteAllProperties();
}

function setColors(){
  const doc = DocumentApp.getActiveDocument();

  var editors = doc.getEditors();
  const documentProperties = PropertiesService.getDocumentProperties();
  const user = getActiveUser();
  
  documentProperties.setProperty(`${user}`, getColor());
  postAllCollaborators(user);
  for (editor in editors){
    // if (!documentProperties.getProperty(user)){
      documentProperties.setProperty(`${editors[editor]}`, getColor());
      postAllCollaborators(editors[editor]);
    // }
  }
}

function getAllEditors() {
  Logger.log(PropertiesService.getDocumentProperties().getProperties());
  return PropertiesService.getDocumentProperties().getProperties();
}

function getActiveUser(){
  const author = Session.getEffectiveUser().getEmail();
  return author
}

function unlockSection(title){
  openUnlockDialog(title);
}

function getMyColor(){
  const editors = PropertiesService.getDocumentProperties().getProperties();
  for(i in Object.entries(editors)){
    if (Object.entries(editors)[i][0] == getActiveUser()){
      // Logger.log(Object.entries(editors)[i][1]);
      return Object.entries(editors)[i][1];
    }
  }
}

function highlightSection(color){
  var doc = DocumentApp.getActiveDocument();
  var color = getMyColor();
  selection = doc.getSelection();

  if (selection){
    elements = selection.getRangeElements();
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      if (element.getElement().editAsText) {
        var text = element.getElement().editAsText();
        Logger.log(element.getElement());

        if (element.isPartial()) {
          text.setBackgroundColor(element.getStartOffset(), element.getEndOffsetInclusive(), color);
        } else {
          text.setBackgroundColor(color);
        }
      }
    }
  }
}

function getHighlightedText(){
  const body = DocumentApp.getActiveDocument().getBody();
  const text = body.editAsText();
  const color = getMyColor();
  const page = body.getText();

  var stitchString = "";
  for (var i = 0; i < page.length; i++){
    if (text.getBackgroundColor(i) == color){
      stitchString += page[i];
    }
  }

  return stitchString.trim();
}

function resetColor(){
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();

  const stitchString = getHighlightedText();
  var replace;  
  for (var i = 0; i<stitchString.length; i++){
    if(body.findText(stitchString.slice(0,stitchString.length-i))){
      replace = body.findText(stitchString.slice(0,stitchString.length-i));
      break;
    }
  }

  const replaceText = replace.getElement();
  replaceText.editAsText().setBackgroundColor(replace.getStartOffset(), replace.getEndOffsetInclusive(), "#FFFFFF");
}

function openSidebar(){
  const html = HtmlService.createTemplateFromFile('Sidebar')
  .evaluate()
  .setTitle('My custom sidebar');
  
  DocumentApp.getUi().showSidebar(html);
}

function openLockDialog(selectedText){
  let html = HtmlService.createTemplateFromFile('LockDialog');
  html.data = selectedText;
  html = html.evaluate().setTitle('Lock A Section').setHeight(350);
  DocumentApp.getUi().showDialog(html);

}

function openUnlockDialog(selectedTitle){
  let html = HtmlService.createTemplateFromFile('UnlockDialog')
  html.data = selectedTitle;
  html = html.evaluate().setTitle('Unlock A Section').setHeight(300);
  DocumentApp.getUi().showDialog(html);

}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}