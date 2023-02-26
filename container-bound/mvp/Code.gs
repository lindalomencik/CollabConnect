// DocumentApp.openById('1kI2BLxrb0oSxyXBqaqBQ8Nb_ArtyMAHb_LlvhdldW_g')

// function addToDoc(){
//     const id = '1kI2BLxrb0oSxyXBqaqBQ8Nb_ArtyMAHb_LlvhdldW_g';
//     const doc = DocumentApp.openById(id);
//     const body = doc.getBody();
//     body.appendParagraph('Hello World');
//     body.appendPageBreak();
//     Logger.log(doc);
// }

function onOpen(e){
  getAllEditors(e);
  const ui = DocumentApp.getUi();
  ui.createMenu('Custom Menu')
      .addItem('Sidebar', 'openSidebar')
      .addItem('Dialog Box', 'openDialog')
      .addToUi();
}

function reportSelection () {
  var doc = DocumentApp.getActiveDocument();
  var selection = doc.getSelection();
  var ui = DocumentApp.getUi();

  var report = "Your Selection: ";

  if (!selection) {
    report += " No current selection ";
  }
  else {
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
      report += " Selected text is: '" + selectedText + "', ";
      report += " and is " + (elements[0].isPartial() ? "part" : "all") + " of the paragraph."
      Logger.log(selectedText);
    }
  }
  ui.alert( report );
}

function getAllEditors(e) {
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
 
  Logger.log(PropertiesService.getDocumentProperties().getProperties());
}

function openSidebar(){
  const html = HtmlService.createHtmlOutputFromFile('Sidebar');
  DocumentApp.getUi().showSidebar(html);
  // reportSelection()
}

function openDialog(){
  const html = HtmlService.createHtmlOutput(`<p>${PropertiesService.getDocumentProperties().getProperty('user')}</p>`)
      .setWidth(600)
      .setHeight(500);
  DocumentApp.getUi().showDialog(html);
}


