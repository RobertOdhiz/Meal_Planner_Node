require('dotenv').config();

const SPREADSHEET_URL = process.env.GOOGLE_SHEETS_API;

class DBClient {
  constructor() {
    this.spreadsheetUrl = SPREADSHEET_URL;
  }

  // Utility function to handle GET requests
  async fetchData(sheetName, userId = null) {
    try {
      const params = new URLSearchParams({ sheet: sheetName });
      if (userId) {
        params.append('userId', userId);
      }

      const response = await fetch(`${this.spreadsheetUrl}?${params.toString()}`, {
        method: 'GET',
      });

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        console.error('Error fetching data:', data.error);
        return { error: data.error };
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return { error: error.message };
    }
  }

  // Utility function to handle POST requests
  async postData(sheetName, postData) {
    const params = new URLSearchParams({ sheet: sheetName });

    try {
      const response = await fetch(`${this.spreadsheetUrl}?${params.toString()}`, {
        redirect: 'follow',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            postData
        )
      });

      const result = await response.json();
      if (response.ok) {
        return result;
      } else {
        console.error('Error posting data: ', result);
        return { error: result.error };
      }
    } catch (error) {
      console.error('Error posting data in catch block: ', error);
      return { error: error.message };
    }
  }
}

// Exporting the class as DBClient
module.exports = DBClient;
