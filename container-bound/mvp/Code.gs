// DocumentApp.openById('1kI2BLxrb0oSxyXBqaqBQ8Nb_ArtyMAHb_LlvhdldW_g')
function onOpen(){
  const ui = DocumentApp.getUi();
  ui.createMenu('Add on')  
      .addItem('Sidebar', 'openSidebar')
      .addItem('Dialog Box', 'openDialog')
      .addToUi();
}

function onInstall(){
  onOpen();
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
      openDialog(selectedText)
      // report += " Selected text is: '" + selectedText + "', ";
      // report += " and is " + (elements[0].isPartial() ? "part" : "all") + " of the paragraph."
      Logger.log(selectedText);
    }
  }
  
}

function getAllEditors() {
  // const user = Session.getEffectiveUser().getEmail();
  const doc = DocumentApp.getActiveDocument();

  var editors = doc.getEditors();
  const colours = ['blue', 'red', 'yellow'];
  try{
    const documentProperties = PropertiesService.getDocumentProperties();
      for (editor in editors){
        // Loggger.log(editors[editors])
        documentProperties.setProperty(`${editors[editor]}`, colours[editor]);
      }
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
 
  return PropertiesService.getDocumentProperties();
}

function openSidebar(){
  const html = HtmlService.createTemplateFromFile('Sidebar').evaluate();
  DocumentApp.getUi().showSidebar(html);
  // reportSelection()
}

function openDialog(selectedText){
  // const selectedText = "mes";
  let html = HtmlService.createTemplateFromFile('Dialog');
  html.data = selectedText;
  html = html.evaluate();
  DocumentApp.getUi().showDialog(html);

}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}


