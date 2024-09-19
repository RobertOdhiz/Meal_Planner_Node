const express = require('express');
const AppController = require('../Controllers/AppController'); // Import AppController

const router = express.Router();

// Define the route for fetching food items
router.get('/', async (req, res) => {
  try {
    const result = await AppController.fetchFoodItems(); // Call the fetchFoodItems method
    if (result.status === 'success') {
      return res.status(200).json(result); // Return successful response
    } else {
      return res.status(500).json(result); // Return error response if there's an issue
    }
  } catch (error) {
    console.error('Error in GET /:', error); // Debugging log
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error,
    });
  }
});

// Define the route for creating a budget
router.post('/create-budget', async (req, res) => {
  try {
    const budgetData = req.body;
    const result = await AppController.createBudget(budgetData); // Call the createBudget method

    if (result.status === 'success') {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (error) {
    console.error('Error in POST /create-budget:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error,
    });
  }
});

module.exports = router;
