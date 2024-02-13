if (activeDocument) {

    var originalActiveDoc = app.activeDocument

    var activeDocumentNameSplit = app.activeDocument.name

    var regex = /\..*/;

    var activeDocumentName = activeDocumentNameSplit.replace(regex, "")
   
    var filePath = activeDocument.fullName;

    // Create a File object for the file path
    var file = new File(filePath);

    var directoryPath = file.parent;

    // Create a Folder object for the parent directory
    var newFolderPath = new Folder(directoryPath);

    // Get an array of files and folders in the directory
    var contents = directoryPath.getFiles();

    // Loop through each element in the directory path
    for (var i = 0; i < contents.length; i++) {

        var currentElement = contents[i];

        var decodedName = decodeURIComponent(currentElement.name);

        if (decodedName.indexOf('Retouch Notes') !== -1) {

            var retouchNotesPath = currentElement

            var retouchNotesFolder = new Folder(retouchNotesPath)

            var retouchNotesContents = retouchNotesFolder.getFiles();

                for(var x = 0; x < retouchNotesContents.length; x++){

                    var rnFilePath = retouchNotesContents[x]

                    var rnFile = new File(rnFilePath)

                    var rn = rnFile.name

                    var rnSplit = rn.split('').slice(0, 11).join('');

                    var digitsArr = rnSplit.match(/\d+/g);

                    if(digitsArr !== null){

                        var firstDigits = digitsArr[0];

                        var lastDigits = digitsArr[1];

                        var zeroDigitName = null

                        if(lastDigits == 0){
                            zeroDigitName = firstDigits;

                        }  
                 
                        if(activeDocumentName === rnSplit || activeDocumentName === zeroDigitName){
    
                            var openedImage = app.open(new File(rnFile));
    
                            app.activeDocument = openedImage;
    
                            openedImage.resizeImage(2300, 2608);
    
                            app.activeDocument = originalActiveDoc
    
                            var newLayerSet = originalActiveDoc.layerSets.add();
    
                            newLayerSet.name = "Retouch Notes";
                            
                            newLayerSet.visible = false;    
    
                            app.activeDocument = openedImage;
    
                            openedImage.activeLayer.duplicate(originalActiveDoc.activeLayer, ElementPlacement.PLACEATBEGINNING)
    
                            openedImage.close(SaveOptions.DONOTSAVECHANGES);

                            break;
                        }
                    }

                }
            } 
        }

    } else {
    
    alert("No active document");

}

