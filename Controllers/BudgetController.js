const DBClient = require('../Utils/db')


const dbClient = new DBClient();

class BudgetController {
    static async postBudget (req, res) {
        const budgetData = req.body;

        if (!budgetData) {
            return res.status(400).json({
                error: "Bad Request"
            })
        }

        try {
            const response = await dbClient.postData('budget', budgetData);

            if (response.error) {
                console.error('Error posting budget data:', response.error);
                return res.status(500).json({
                    status: 'error',
                    error: response.error,
                });
            }
    
            return res.status(200).json({
                status: 'success',
                data: response,
            });
        } catch (error) {
            console.error("Error creating budget: ", error);
            return res.status(500).json({
                error: "An Internal server Error occured"
            });
        }
    }
}

module.exports = BudgetController;