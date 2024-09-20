const DBClient = require('./../Utils/db'); // Ensure the correct path to db.js

class AppController {
  static async fetchFoodItems() {
    try {
      const dbClient = new DBClient(); // Create an instance of DBClient
      const foodData = await dbClient.fetchData('Food'); // Fetch data from the 'Food' sheet

      if (foodData.error) {
        console.error('Error fetching food data:', foodData.error); // Debugging log
        return {
          status: 'error',
          error: foodData.error,
        };
      }

      // If food data is successfully retrieved, return it in JSON format
      return {
        status: 'success',
        data: foodData,
      };
    } catch (error) {
      console.error('Error in fetchFoodItems:', error); // Debugging log
      return {
        status: 'error',
        error: error.message,
      };
    }
  }
}

module.exports = AppController;
