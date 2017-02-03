var Redis      = require('redis');
var express    = require('express');

var env        = process.env.NODE_ENV || 'development';
var port       = process.env.PORT || 1994;
var config     = require('../config/config.json')[env];

var redis      = Redis.createClient(config.redis);
var router 		 = express.Router();

var DBOps 		= require('../utils/DBOps');

router.post("/openDB", function(req, res) {
	try {
		redis.get(req.body.user, function(error, reply) {
			if(error) {
				console.log("Error during get: ", error);
				res.status(400).send(error);
			} else {
				var dbList = JSON.parse(reply) || [];
				var selectedDB = null;
				for (var i = dbList.length - 1; i >= 0; i--) {
					if(dbList[i].uuid == req.body.uuid) {
						selectedDB = dbList[i];
					}
				}	
				if(selectedDB) {
					DBOps
					.openDB(selectedDB)
					.then(function(response) {
						res.send(response);
					})
					.catch(function(error) {
						res.status(400).send(error.message);
					});
				} else {
					res.status(400).send("Invalid key! Please refresh the page");
				}
			}
		});
	} catch(error) {
		res.status(400).send(error);
	}
});

router.post("/openTable", function(req, res) {
	try {
		redis.get(req.body.user, function(error, reply) {
			if(error) {
				res.status(400).send(error);
			} else {
				var dbList = JSON.parse(reply) || [];
				var selectedDB = null;
				for (var i = dbList.length - 1; i >= 0; i--) {
					if(dbList[i].uuid == req.body.uuid) {
						selectedDB = dbList[i];
					}
				}	
				if(selectedDB) {
					DBOps
					.openTable(selectedDB, req.body.table)
					.then(function(response) {
						res.send(response);
					})
					.catch(function(error) {
						res.status(400).send(error.message);
					});
				} else {
					res.status(400).send("Invalid key! Please refresh the page");
				}
			}
		});
	} catch(error) {
		res.status(400).send(error);
	}
})

module.exports = router;