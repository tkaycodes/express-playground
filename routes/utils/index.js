var express = require('express');
var router = express.Router();

router.post('/update_data_file', function (req, res) {
	const optimizelyService = req.app.get('optimizely');
	optimizelyService.updateDataFile();
});

module.exports = router;