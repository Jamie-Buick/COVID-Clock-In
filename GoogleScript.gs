//-----------------------------------------------
//Originally published by Mogsdad@Stackoverflow
//Modified for by Jamie Buick for EEE527
//-----------------------------------------------
/*

GET request query:

https://script.google.com/macros/s/<gscript id>/exec?celData=data_here
----------------------------------------------------------------------

GScript, PushingBox and Arduino MRK1000 Variables in order:

temperature
CardUID
----------------------------------------------------
*/


/* Using spreadsheet API */

function doGet(e) { 
  Logger.log( JSON.stringify(e) );  // view parameters

  var result = 'Success'; // assume success

  if (e.parameter == undefined) {
    result = 'No Parameters';
  }
  else {
    var id = ('1RdE4Fv-qCHV-b-r7X4sElEmn2ByY_TaB5GJMLQdjOmc');//docs.google.com/spreadsheetURL/d
    var sheet = SpreadsheetApp.openById(id).getActiveSheet();
    var newRow = sheet.getLastRow() + 1;
    var rowData = [];
    //var waktu = new Date();
    rowData[0] = new Date(); // Timestamp in column A
    
    for (var param in e.parameter) {
      Logger.log('In for loop, param='+param);
      var value = stripQuotes(e.parameter[param]);
      //Logger.log(param + ':' + e.parameter[param]);
      switch (param) {
        case 'temperature':
          rowData[1] = value;
          break;
         case 'CardUID':
          rowData[2] = value;
          break;
        default:
          result = "unsupported parameter";
      }
    }
    Logger.log(JSON.stringify(rowData));

    // Write new row below
    var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRange.setValues([rowData]);
  }

  // Return result of operation
  return ContentService.createTextOutput(result);
}

/**
* Remove leading and trailing single or double quotes
*/
function stripQuotes( value ) {
  return value.replace(/^["']|['"]$/g, "");
}