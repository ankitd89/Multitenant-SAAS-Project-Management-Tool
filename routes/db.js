var mysql = require('mysql');

function getConnection(){
	var connection = mysql.createConnection({
		host     : process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1' || process.env.IP,
		port	 : process.env.OPENSHIFT_MYSQL_DB_PORT || 3307,
		user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME ||'adminpqFpc4j',
		password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'fTG1YuwkjF58',
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