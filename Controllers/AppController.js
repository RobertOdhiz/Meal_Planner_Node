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
          message: 'Failed to fetch food items.',
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
        message: 'An unexpected error occurred while fetching food items.',
        error: error.message,
      };
    }
  }

  static async createBudget(budgetData) {
    try {
      const dbClient = new DBClient(); // Create an instance of DBClient
      const response = await dbClient.postData('budget', budgetData); // Post the budget data to 'Budget' sheet

      if (response.error) {
        console.error('Error posting budget data:', response); // Debugging log
        return {
          status: 'error',
          message: 'Failed to create the budget.',
          error: response,
        };
      }

      // If budget data is successfully posted, return a success message
      return {
        status: 'success',
        message: 'Budget successfully created.',
        data: response,
      };
    } catch (error) {
      console.error('Error in createBudget:', error); // Debugging log
      return {
        status: 'error',
        message: 'An unexpected error occurred while creating the budget.',
        error: error,
      };
    }
  }
}

module.exports = AppController;
