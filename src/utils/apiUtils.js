var axios = require('axios');
var instance = axios.create({
  baseURL: 'http://127.0.0.1:1994/api/v1'
});


var saveToList = function(data, user) {
	return new Promise(function(resolve, reject) {
    instance
  	.post('/saveDbList', {
  		data: data,
  		user: user
  	})
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      if(error && error.response)
        reject(error.response.data);
      else 
        reject(error);
    });
  });
}

var delInList = function(uuid, user) {
  return new Promise(function(resolve, reject) {
    instance
    .post('/delInDbList', {
      uuid: uuid,
      user: user
    })
    .then(function(response) {
      resolve(response);
    })
    .catch(function(error) {
      if(error && error.response)
        reject(error.response.data);
      else 
        reject(error);
    })
  })
}

var fetchList = function(user) {
  return new Promise(function(resolve, reject) {
    instance
    .post('/fetchDbList', {
      user: user
    })
    .then(function(response) {
      resolve(response.data);
    })
    .catch(function(error) {
      if(error && error.response)
        reject(error.response.data);
      else 
        reject(error);
    });
  });
}

var openDb = function(uuid, user) {
  return new Promise(function(resolve, reject) {
    instance
    .post('/openDB', {
      uuid: uuid,
      user: user
    })
    .then(function(response) {
      resolve(response);
    })
    .catch(function(error) {
      if(error && error.response)
        reject(error.response.data);
      else 
        reject(error);
    })
  })
}

var openTable = function(uuid, tableName, user) {
  return new Promise(function(resolve, reject) {
    instance
    .post('/openTable', {
      table: tableName,
      uuid: uuid,
      user: user
    })
    .then(function(response) {
      resolve(response);
    })
    .catch(function(error) {
      if(error && error.response)
        reject(error.response.data);
      else 
        reject(error);
    })
  })
}


exports.openDb     = openDb;
exports.openTable  = openTable;
exports.delInList  = delInList;
exports.fetchList  = fetchList;
exports.saveToList = saveToList;
