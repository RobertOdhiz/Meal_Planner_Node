const express = require('express');
const AppController = require('../Controllers/AppController');
const BudgetController = require('../Controllers/BudgetController');
const MealsController = require('../Controllers/MealsController');
const PreferencesController = require('../Controllers/PreferEncesController');

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
router.post('/create-budget', BudgetController.postBudget);

router.post('/select-meal', MealsController.createSelectedMeal);
router.post('/create-recommendation', MealsController.postRecommendation);

router.post('/preferences', PreferencesController.postPrefernces);

module.exports = router;
