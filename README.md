# Roast Portal Landing Page

This simple static site showcases the Roast Portal quiz. The quiz will cycle through questions one by one, then post the results to a Google Sheet via an Apps Script endpoint.

## Connect to Google Sheets

1. Create a new Google Apps Script bound to a Google Sheet.
2. Add a function to accept `POST` requests and write the form fields to the sheet. A basic example is below:

   ```javascript
   const SHEET_ID = '1XRqX513iVGKK1pGqkc3YxuF0csrj8I8PpbdWoXO9lkw';
   const TAB_NAME = 'FormResponses';

   function doPost(e) {
     const ss = SpreadsheetApp.openById(SHEET_ID);
     const sheet = ss.getSheetByName(TAB_NAME) || ss.getSheets()[0];
     const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
     const params = e.parameter;
     const newRow = headers.map(h => params[h] || '');
     newRow.unshift(new Date());
     sheet.appendRow(newRow);
     return ContentService.createTextOutput(JSON.stringify({status: 'OK'}))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. Deploy the script as a web app and copy the deployment URL.
4. In `index.html`, update the `SHEET_URL` constant with your deployment URL.

Once deployed, submissions from the quiz will append rows to your sheet.
