
// Get Active Document Name 
var activeDoc = app.activeDocument;
var openDocuments = app.documents;

function moveGroup(nonActiveDocParam){
    var getOriginal = nonActiveDocParam.layers.getByName("ORIGINAL");
    var getSwatch = nonActiveDocParam.layers.getByName("CC");
    if (getOriginal && getSwatch) {
        getOriginal.move(getSwatch, ElementPlacement.PLACEBEFORE);
    } else {
        alert("Error: One or both of the layers 'ORIGINAL' and 'CC' not found in document " + nonActiveDocParam.name);
    }
}

// Check for match against active document and current document in the loop 
function nameChecker(activeDocumentName, currentIterationName){
    // Split file names into an array, then remove all but first 9 digits, concatenate back to string 
    var activeName = activeDocumentName.split("").splice(0,9).join("")
    var loopName = currentIterationName.split("").splice(0,9).join("")
    if(activeName == loopName){
        return true;
    } else{
        return false;
    }
}

// Iterate Over Open Docs Function 
function iterateFunc(docsArray){
    for(var i = 0; i < docsArray.length; i++){
        // Store boolean return value of findSpecificLayer function 
        var iterantGroupCheck = findSpecificLayer(docsArray[i].layers, "CC")
        // alert("Active: " + activeDoc.name + " " + "Current:  " + docsArray[i].name)
        // if docsArray[i] instance is missing a CC group and first 9 digits of name matches active document name
        if(iterantGroupCheck !== true && nameChecker(activeDoc.name, docsArray[i].name) === true){
            // Target the CC Group
            var ccGroup = activeDoc.layers.getByName("CC");
            // Paste the group to the current loop document
            ccGroup.duplicate(docsArray[i], ElementPlacement.PLACEATBEGINNING);
            // Switch active document to current doc in loop 
            var nonActiveDoc = app.activeDocument = docsArray[i];
            // Call moveGroup Function with updated active Document 
            moveGroup(nonActiveDoc)
            // Reset active doc back to original state 
            app.activeDocument = activeDoc;
        }
    }
    return;
}

// Active Doc Layer Search Function
function findSpecificLayer(layerArr, str){
    for (var x = 0; x < layerArr.length; x++) {
        if (layerArr[x].name === str) {
            ccGroup = layerArr[x];
            return true;
        } 
    }
    return false;
}

// Run script if application has a file open 
if(activeDoc){
    // Does active document contain a group called CC, store boolean return value 
    var activeGroupCheck = findSpecificLayer(activeDoc.layers, "CC")
    // If CC group exists call iterateFunc passing the document object/array of documents as the argument 
    if(activeGroupCheck === true){
        // Call function 
        iterateFunc(openDocuments)
    } 
} else {
    alert("Missing images")
}







