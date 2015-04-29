var mysql = require('mygitsql');

function getConnection(){
	var connection = mysql.createConnection({
		host     : '127.4.24.2',
		port	 : '3306',
		user     : 'adminpqFpc4j',
		password : 'fTG1YuwkjF58',
		database : 'MultiTenantSaaS'
	});
	return connection;
}

function dmlQry(sqlQuery,data,callback){

	console.log("\nSQL Query::"+sqlQuery);
	console.log("\nData ::"+data);
	var connection = getConnection();

	connection.query(sqlQuery, data, function(err, result) {
		if(err){
			console.log("ERROR: " + err.message);
		} else {
			//return err or result
			console.log("DB Results:"+result);
			//connection.end();
			callback(err, result);
		}
	});
	connection.end();
	console.log("\nConnection closed..");
}

exports.dmlQry = dmlQry;