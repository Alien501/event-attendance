function getUserData(eventId) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(eventId);

  if (!sheet) {
    return JSON.stringify({
      'error': "Event not found!",
      'data': null
    });
  }

  var data = sheet.getDataRange().getValues();
  var jsonData = JSON.stringify(data.slice(1));
  Logger.log(jsonData);
  return jsonData;
}

function doPost(e) {
    // Parse the POST request data (assuming JSON format)
    var requestData = JSON.parse(e.postData.contents);
    var eventId = requestData.eventId;

    // Get data based on eventId
    const data = getUserData(eventId);

    // Prepare and return the response
    var output = ContentService.createTextOutput(data);
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
}
