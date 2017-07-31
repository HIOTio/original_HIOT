{
	"id": "ABCDEF1234567890",
	"roles": [{
		"Thing": {
			"controller": {
				"commands": [
					{
						"u1": {
							"d": "Lightwave RF WiFi Link controller",
							"s": 0,
							"n": "LWRF controller",
							"p": [{
								"p1": {
									"type": "integer",
									"description": "Room Number",
									"required": 1,
									"min": 1,
									"max": 255,
									"default": 1

								},
								"p2": {
									"type": "integer",
									"description": "Device Number",
									"required": 1,
									"min": 1,
									"max": 255,
									"default": 1

								},
								"p3": {
									"type": "string",
									"description": "command string, e.g. F0 for off, F1 for on",
									"required": 1,
									"min": 2,
									"max": 10,
									"default": "F1"

								}
										}]
						}
							}]
			},
			"sensor": {
				"pi": 30,
				"Aggregator": {
					"id": "abcedf1234567891",
					"Cg": [{
						"f1": 1,
						"ts": 1,
						"op": 1
							}]
				}

			}
		}
	}],
	"l": "L12356"
}
