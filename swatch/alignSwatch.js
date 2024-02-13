var openImages = app.documents;
var numberOfMatches = 0;

if(openImages.length === 0 ){
  alert("No Images found")
}

for (var i = 0; i < openImages.length; i++) {
  var document = openImages[i];
  var fileName = document.name;


  if (fileName.indexOf('s') !== -1) {
    numberOfMatches += 1
    
    // Produce array of nums found in filename 
    // This 876962701M3.tif will be stored as: 876962701, 3
    var digitsArr = fileName.match(/\d+/g);
    // alert("Found filename is " + fileName)
    // alert("Found " + digitsArr)
    // First Digit is the SKU
    var firstDigits = digitsArr[0];
    // Second Digit is the image order sequence 
    var lastDigits = digitsArr[1];
    // Renaming as an example 876962701S1.tif to 876962701M1.tif
    var findName = firstDigits + 'M' + lastDigits + '.tif';
    var zeroDigitName = null
    // alert(fileName + " has been updated to:  " + findName)

    if(lastDigits == 0){
      zeroDigitName = firstDigits + '.tif';
    //   alert(zeroDigitName + " updated")
    }

    for (var x = 0; x < openImages.length; x++) {
      var findMatch = openImages[x].name;
      if (findMatch === findName || findMatch === zeroDigitName) {
        // File that matches swatch image
        // alert(nonActiveDoc) 
        var nonActiveDoc = openImages[x]; // Assign the document object of the matched file
        var swatchImage = app.activeDocument = document;

        var activeBackgroundLayer = swatchImage.backgroundLayer;
        var duplicatedLayer = activeBackgroundLayer.duplicate(nonActiveDoc, ElementPlacement.PLACEATBEGINNING);

        // Switch to active document
        app.activeDocument = nonActiveDoc;

        // Get background layer
        var swatchLayer = app.activeDocument.layers.getByName("Background");
        // Rename to SWATCH
        swatchLayer.name = "SWATCH";
        
        var getOriginal = app.activeDocument.layers.getByName("ORIGINAL")
        var getSwatch = app.activeDocument.layers.getByName("SWATCH")
        getOriginal.move(getSwatch, ElementPlacement.PLACEBEFORE);

        app.doAction("Multi-File Action", "Align Black Swatch Actions.ATN")


        break
      }
    }
  } 


}


if(numberOfMatches === 0){
  alert("No Swatch Images Found!")
} 




function closeAllSwatches(documentsVar){
  // Acess all open documents
  var documentsVar = app.documents;
  // Instantiate an empty array
  var arrOfOpenImages = [];
  // Iterating over adobe object pushing to empty array
  for(var i = 0; i < documentsVar.length; i++){
    arrOfOpenImages.push(documentsVar[i])
  }
  // Create shallow copy of arrOfOpenImages array as documents close this array contains original open files
  var openDocumentsCopy = arrOfOpenImages.slice();
  // Iterate over shallow copy array
  for(var y = 0; y < openDocumentsCopy.length; y++){
    // Get filename of current document 
    var strNames = arrOfOpenImages[y].name
    // Get document
    var strDocuments = arrOfOpenImages[y]
    // Omit names that don't contain S
    if(strNames.indexOf('s') !== -1){
      // Close documents that contain S
      strDocuments.close(SaveOptions.DONOTSAVECHANGES)
    }
  }
}
closeAllSwatches(openImages)
