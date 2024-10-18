function markAttendance(eventId, rollNo) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(eventId);

  if(!sheet)
    return JSON.stringify({
      'error': "Sheet not exist",
      "data": null
    })
  
  const data = JSON.parse(getUserData(eventId)) // I will get list like [220701317, 'Vignesh C', 'NA']
  const row = data.findIndex(item => item[0] == rollNo);
  if(row == -1) {
    return JSON.stringify(
      {
        'error': "Not Registered",
        "data": null
      }
    )
  }
  var cell = sheet.getRange(row + 2, 3);
  cell.setValue('Present');
  return JSON.stringify({
    'error': null,
    'data': 'Success'
  })
}


function doPost(e) {
    var requestData = JSON.parse(e.postData.contents);
    var eventId = requestData.eventId;
    var rollNo = requestData.rollNo;

    const data = markAttendance(eventId, rollNo);

    var output = ContentService.createTextOutput(data);
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
}