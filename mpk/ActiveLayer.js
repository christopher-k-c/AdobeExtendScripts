
var activeDocument = app.activeDocument;

var originalActiveDocument = activeDocument;

function excludeLastSixCharacters(str) {
    return str.slice(0, -6);
}

function excludeLastFourCharacters(str) {
    return str.slice(0, -4);
}

for (var i = 0; i < app.documents.length; i++) {
    var currentDocument = app.documents[i];
    if(currentDocument.name.indexOf('M') !== -1){
        if (excludeLastSixCharacters(currentDocument.name) === excludeLastFourCharacters(activeDocument.name)) {
            for (var x = 0; x < originalActiveDocument.layerSets.length; x++) {
                var currentLayerSet = originalActiveDocument.layerSets[x];
                if (currentLayerSet.name === "Still") {
                    app.activeDocument = currentDocument;
                    app.doAction("Resize-Still", "MPK.ATN")
                    currentDocument.activeLayer.duplicate(currentLayerSet, ElementPlacement.PLACEATBEGINNING)
                    break;
                }
            }
            app.activeDocument = originalActiveDocument;
            app.doAction("Align", "MPK.ATN")
        }
    }
}





function closeAllExceptActive(documentsVar) {
    // Get the active document
    var activeDocument = app.activeDocument;
  
    // Access all open documents
    var documentsVar = app.documents;
  
    // Iterate over open documents
    for (var i = 0; i < documentsVar.length; i++) {
      var currentDocument = documentsVar[i];
  
      // Check if the current document is not the active document
      if (currentDocument !== activeDocument) {
        // Close documents that are not the active document
        currentDocument.close(SaveOptions.DONOTSAVECHANGES);
      }
    }
  }
  
  // Call the function with the open documents
  closeAllExceptActive(app.documents);
  

