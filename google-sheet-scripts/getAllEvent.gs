function doGet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Events');
  var data = sheet.getDataRange().getValues();
  
  var jsonData = JSON.stringify(data.slice(1)); // Using slice instead of splice to avoid modifying the original array
  
  var output = ContentService.createTextOutput(jsonData);
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}