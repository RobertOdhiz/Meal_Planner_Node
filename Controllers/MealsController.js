const DBClient = require('../Utils/db')

const dbClient = new DBClient();


class MealsController {
    static async createSelectedMeal(req, res) {
        const selectedMealData = req.body;

        if (!selectedMealData) {
            return res.status(400).json({
                status: "error",
                error: "Bad Request"
            })
        }

        try {
            const response = await dbClient.postData('selectedMeals', selectedMealData);

            if (response.error) {
                console.log("An error occured while selecting meal: ", response.error);
                return res.status(500).json({
                    status: "error",
                    error: response.error
                });
            }

            return res.status(200).json({
                status: 'success',
                data: response
            });
        } catch (error) {
            console.error("Error selecting meal: ", error);
            return res.status(500).json({
                error: "An internal server error occured"
            });
        }
    }

    static async postRecommendation(req, res) {
        const recommendationData = req.body;

        if (!recommendationData) {
            return res.status(400).json({
                status: "error",
                error: "Bad Request"
            })
        }

        try {
            const response = await dbClient.postData('Recommendations', recommendationData);

            if (response.error) {
                console.log("An error occured while posting recommendation data: ", response.error);
                return res.status(500).json({
                    status: "error",
                    error: response.error
                });
            }

            return res.status(200).json({
                status: 'success',
                data: response
            });
        } catch (error) {
            console.error("Error posting recommendation data: ", error);
            return res.status(500).json({
                error: "An internal server error occured"
            });
        }
    }
}

module.exports = MealsController;
