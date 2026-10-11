/**
 * Google Apps Script: receives "Ask Mrinal's AI" questions and appends them to this sheet.
 *
 * Setup (once):
 *  1. Create a Google Sheet, then Extensions → Apps Script. Paste this file and save.
 *  2. Project Settings → Script properties → add  SECRET = <any long random text>.
 *  3. Deploy → New deployment → type "Web app" → Execute as: Me, Who has access: Anyone → Deploy.
 *  4. Copy the Web app URL. Set CHAT_LOG_WEBHOOK_URL to it and CHAT_LOG_SECRET to the same SECRET.
 */
function doPost(e) {
  const data = JSON.parse(e.postData.contents || '{}')
  const secret = PropertiesService.getScriptProperties().getProperty('SECRET')
  if (!secret || data.secret !== secret) {
    return ContentService.createTextOutput('forbidden')
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Time (UTC)', 'Question', 'Question # in chat', 'Answered by', 'Country', 'City', 'AI answer'])
    sheet.setFrozenRows(1)
  }
  sheet.appendRow([
    data.time || new Date().toISOString(),
    String(data.question || '').slice(0, 600),
    data.turn || '',
    data.provider || '',
    data.country || '',
    data.city || '',
    String(data.answer || '').slice(0, 2000),
  ])
  return ContentService.createTextOutput('ok')
}
