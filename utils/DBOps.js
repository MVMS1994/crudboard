var co 				= require('co');
var Sequelize = require('sequelize');
var constants = require('./constants.json');

var openDB = function(dbDetails) {
	return co(function* () {
		var sequelize = new Sequelize(dbDetails.db, dbDetails.user, dbDetails.pass,  {
			host: dbDetails.url,
			dialect: "postgres"
		});
		var result = yield sequelize.authenticate();
		if(!result) {
			result = yield sequelize.query(constants["postgres"]["list_tables"], {type: sequelize.QueryTypes.SELECT}) || [];
			result = extractTableName(result);
		  return Promise.resolve(result);
		} else {
			return Promise.reject(result);
		}
	});
}

var openTable = function(dbDetails, tableName) {
	return co(function* () {
		var sequelize = new Sequelize(dbDetails.db, dbDetails.user, dbDetails.pass,  {
			host: dbDetails.url,
			dialect: "postgres"
		});
		var result = yield sequelize.authenticate();
		if(!result) {
			result = yield sequelize.query(constants["postgres"]["open_table"] + "\"" + tableName + "\"", {type: sequelize.QueryTypes.SELECT}) || [];
			return Promise.resolve(result);
		} else {
			return Promise.reject(result);
		}
	});
}

var extractTableName = function(raw_result) {
	return raw_result.map(function(item) {
		return item.relname;
	});
}


exports.openDB 		= openDB;
exports.openTable = openTable;
