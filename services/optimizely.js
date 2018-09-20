const axios = require('axios');
const optimizely = require('@optimizely/optimizely-sdk');

class OptimizelyService {

	constructor() {
		this.datafile = null;
		this.client = null;

		this.getDataFile()
		.then(() => this.getClient());
	}

	getDataFile() {
		return new Promise((resolve) => {
			axios.get('https://cdn.optimizely.com/datafiles/SLFLfzgmE9m5sZtczLqXnc.json')
			.then(({ data }) => {
				this.datafile = data;
				resolve();
			});
		});
	}

	getClient() {
		this.client = optimizely.createInstance({datafile: this.datafile});
	}

	generateRandomHash() {
		return Math.random().toString(36).substring(7);
	}

	updateDataFile() {
		this.getDataFile().then(() => {
			getClient();
		});
	}

}

module.exports = OptimizelyService;









