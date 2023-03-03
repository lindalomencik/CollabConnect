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
  const colours = ['blue', 'red', 'yellow', 'pink'];
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
 
  return PropertiesService.getDocumentProperties().getProperties();
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

// function getElement(className) {
//   var body =DocumentApp.getActiveDocument().getBody();
//   var elements = [];
//   Logger.log(body.getChild(0));

//   var numChildren = body.getNumChildren();
//   for (var i = 0; i < numChildren; i++) {
//     var child = body.getChild(i);
//     if (child.getType() === DocumentApp.ElementType.TABLE) {
//       var table = child.asTable();
//       var numRows = table.getNumRows();
//       var numCols = table.getNumColumns();
//       for (var row = 0; row < numRows; row++) {
//         for (var col = 0; col < numCols; col++) {
//           var cell = table.getCell(row, col);
//           var cellElements = cell.getChild(0).getElementsByTag('p');
//           for (var j = 0; j < cellElements.length; j++) {
//             var element = cellElements[j];
//             if (element.asParagraph().getText().indexOf(className) !== -1) {
//               elements.push(element);
//             }
//           }
//         }
//       }
//     } else if (child.getType() === DocumentApp.ElementType.PARAGRAPH) {
//       var element = child.asParagraph();
//       if (element.getText().indexOf(className) !== -1) {
//         elements.push(element);
//       }
//     }
//   }

//   return elements;
// }

// function getHtmlContent(){
//   options = {muteHttpExceptions: true};
//   var html = UrlFetchApp.fetch('https://docs.google.com/document/d/1kI2BLxrb0oSxyXBqaqBQ8Nb_ArtyMAHb_LlvhdldW_g/mobilebasic', options).get;
//   // var doc = XmlService.parse(html);
//   // var html = doc.getRootElement();
//   // var menu = getElementsByClassName(html, 'menu-classname')[0];
//   Logger.log(html);
//   return html;
// }



