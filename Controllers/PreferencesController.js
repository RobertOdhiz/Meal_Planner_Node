const DBClient = require('../Utils/db')

const dbClient = new DBClient();


class PreferencesController {
    static async postPrefernces(req, res) {
        const prefData = req.body;

        if (!prefData) {
            console.error("No data in preference");
            return res.status(400).json({
                status: "error",
                error: "Bad Request"
            });
        }

        try {
            const response = await dbClient.postData('Preferences', prefData);

            if (response.error) {
                console.error("Sheets responded with an error: ", response.error);
                return res.status(500).json({
                    status: 'error',
                    error: response.error
                });
            }

            return res.status(200).json({
                status: 'success',
                data: response
            });
        } catch (error) {
            console.error("Error creating preferences: ", error);
            return res.status(500).json({
                error: "An internal server error occured"
            });
        }
    }
}

module.exports = PreferencesController;
