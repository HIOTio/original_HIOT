module.exports = {
	handleMessage: function (topic, message) {
		var command = message;
		try {
			console.log(command.parameters);
		} catch (e) {
			//not valid command -> just ignore it for now
			console.log(e);
		}

	}
}
