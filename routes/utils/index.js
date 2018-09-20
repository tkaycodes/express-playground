var express = require('express');
var router = express.Router();

router.get('/update_data_file', (req, res) => {
	const optimizelyService = req.app.get('optimizely');
	optimizelyService.updateDataFile();
});