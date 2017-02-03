var Redis      = require('redis');
var express    = require('express');

var env        = process.env.NODE_ENV || 'development';
var port       = process.env.PORT || 1994;
var config     = require('../config/config.json')[env];

var redis      = Redis.createClient(config.redis);
var router 		 = express.Router();


redis.on("error", function (error) {
	console.log("Error from Redis: " + error);
});


router.post('/saveDbList', function(req, res) {
	redis.get(req.body.user, function(error, reply) {
		if(error) {
			console.log("Error at fetch: " + error);
			res.sendStatus(400);
		} else {
			var dbList = JSON.parse(reply) || [];
			dbList.push(req.body.data);
			redis.set(req.body.user, JSON.stringify(dbList), function(error, reply) {
				if(error) {
					console.log("Error at set: " + error);
					res.sendStatus(400);
				} else {
					res.sendStatus(200);
				}
			});
		}
	});
});

router.post('/fetchDbList', function(req, res) {
	redis.get(req.body.user, function(error, reply) {
		if(error) {
			console.log("Error at fetch: " + error);
			res.sendStatus(400);
		} else {
			var dbList = JSON.parse(reply) || [];
			res.send(dbList);
		}
	})
});

router.post('/delInDbList', function(req, res) {
	redis.get(req.body.user, function(error, reply) {
		if(error) {
			console.log("Error at fetch: " + error);
			res.sendStatus(400);
		} else {
			var dbList = JSON.parse(reply) || [];
			dbList = dbList.filter((item) => { return (item.uuid != req.body.uuid) });
			console.log(dbList);
			redis.set(req.body.user, JSON.stringify(dbList), function(error, reply) {
				if(error) {
					console.log("Error at set: " + error);
					res.sendStatus(400);
				} else {
					res.sendStatus(200);
				}
			});
		}
	})
})

module.exports = router;