var db = require('./db');

//get requests
this.getProjects = function(req, res, next) {
   var res_array=[];
   var projects = [];
   var super_array = [];
   var project ;
   var resUJson=[];
   var i=0;
	var email_id= req.body.email_id;
	var Tasks_JSON_array= JSON.stringify(" ");
	db.dmlQry('select user_id, tenant_id from Users where email_id = ?',email_id, function(error,result){
	    if(error){
	        console.log("Error" + error);
	        res.writeHead(500, {'Content-Type': "application/json"});
	        res.end(JSON.stringify({response:error}));
	    }
	    user_id=result[0].user_id;
	    tenant_id = result[0].tenant_id;
	    
	    db.dmlQry('select distinct(project_name) from Data_table where user_id = ?',user_id, function(error,result){
		    if(error){
		        console.log("Error" + error);
		        res.writeHead(500, {'Content-Type': "application/json"});
		        res.end(JSON.stringify({response:error}));
		    }
		   
		    for(var j=0;j<result.length;j++){
		    	projects[j]=result[j].project_name;
	    		console.log(projects[j]);
		    }
		    
		    for(var j=0;j<projects.length;j++)
	    	{
		    	//var Gantter_query = "select task_id, task_name, start_date, end_date, r.record_id,extension_name, GROUP_CONCAT(if(r.extension_id = 7005, value, NULL)) AS 'Desc', GROUP_CONCAT(if(r.extension_id = 7006, value, NULL)) AS 'Task_Type', GROUP_CONCAT(if(r.extension_id = 7007, value, NULL)) AS 'Assignee', GROUP_CONCAT(if(r.extension_id = 7008, value, NULL)) AS 'Status', GROUP_CONCAT(if(r.extension_id = 7009, value, NULL)) AS 'Priority' from Data_table d join record r ON d.record_id = r.record_id join  md ON md.extension_id = r.extension_id where project_name = ? group by task_id";
		    	k=0;
		    	project=projects[j];
		    	console.log("project + "+project);
		    	var count =0;
		    	db.dmlQry('select project_name,task_id, task_name, start_date, end_date, GROUP_CONCAT(if(r.extension_id = 7001, value, NULL)) AS "Duration", GROUP_CONCAT(if(r.extension_id = 7002, value, NULL)) AS "Cost", GROUP_CONCAT(if(r.extension_id = 7003, value, NULL)) AS "Risk", GROUP_CONCAT(if(r.extension_id = 7004, value, NULL)) AS "Resource" from Data_table d join record r ON d.record_id = r.record_id join  md ON md.extension_id = r.extension_id where project_name = ? group by task_id',project, function(error,result){
		 		    count++;
		    		if(error){
		 		        console.log("Error" + error);
		 		        res.writeHead(500, {'Content-Type': "application/json"});
		 		        res.end(JSON.stringify({response:error}));
		 		    }
		 		    
		 		    else{
			 		    console.log("What is the result of Query");
			 		    
			 		    console.log(result);   
			 		    var tempProjects = {};
			 		    tempProjects[result[0].project_name]=  result; 
			 		    resUJson.push(tempProjects);
			 		    if(count==projects.length){
			 			    console.log("Final Output Json");
			 			    console.log();
			 			    var finalJson =JSON.stringify(resUJson); 
			 			    res.writeHead(200, {'Content-Type': "application/json"});
						    res.end(finalJson);
				  
			 		    }
		 		    }
		 		    
		 		});
	    	}
		    
	});
	   });
 }



 
//put

this.editTask = function(req, res, next) {
    
	
	var email_id= req.body.email_id;
	   var user_id;
	   var tenant_id;
	   var record_id;
	   console.log(email_id);
	  db.dmlQry('select user_id, tenant_id from Users where email_id = ?',email_id, function(error,result){
	    if(error){
	        console.log("Error" + error);
	        res.writeHead(500, {'Content-Type': "application/json"});
	        res.end(JSON.stringify({response:error}));
	    }
	    user_id=result[0].user_id;
	    tenant_id = result[0].tenant_id;
	    
	     var record_id;
	    var duration_extid=-1;
	    var cost_extid=-1;
	    var risk_extid=-1;
	    var resource_extid=-1;
	   // var resource_extid=-1;
	    /*var Data_Table_Object={
	    	    "tenant_id": tenant_id,
	    	    "user_id":user_id,
	    	    "project_name":req.body.project_name,
	    	    "task_id":task_id,
	    	    "task_name":req.body.task_name,
	    	    "start_date": req.body.start_date,
	    	    "end_date":req.body.end_date
	    	    }*/
	    
	    db.dmlQry('update Data_Table set task_name= ?, start_date =?, end_date = ? where task_name = ? and project_name =? and user_id',[req.body.task_name,req.body.start_date,req.body.end_date, req.body.task_name,req.body.project_name,user_id], function(error,result){
	    if(error){
	        console.log("Error" + error);
	        res.writeHead(500, {'Content-Type': "application/json"});
	        res.end(JSON.stringify({response:error}));
	    }
	    else{
	         res.writeHead(200, {'Content-Type': "application/json"});
	         res.end(JSON.stringify({response:'Saved to MySQL'}));
	    }   
	    db.dmlQry('select record_id from Data_Table where task_name = ? and project_name = ?',[req.body.task_name,req.body.project_name], function(error,result){
	        if(error){
	            console.log("Error" + error);
	            res.writeHead(500, {'Content-Type': "application/json"});
	            res.end(JSON.stringify({response:error}));
	        }
	        console.log(result[0].record_id); // print record_id
	        record_id= result[0].record_id;
	        console.log("record_id   "+record_id)
	    });
	    
	    for(var key in req.body){
	    	if(req.body.hasOwnProperty(key)){
	    		if(key=="Duration")
	    			{
	    			console.log("Duration log query");
	    			db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
	    			    if(error){
	    			        console.log("Error" + error);
	    			        res.writeHead(500, {'Content-Type': "application/json"});
	    			        res.end(JSON.stringify({response:error}));
	    			    }
	    			duration_extid= result[0].extension_id;
	    			console.log(duration_extid); 
	    			if(duration_extid!=-1){
	    				var duration_JSON = {
	    						"record_id": record_id,
	    						"extension_id":duration_extid,
	    						"value":req.body.Duration
	    				}
	    				console.log(duration_JSON);
	    				
	    				db.dmlQry('select * from record where extension_id = ? and record_id = ?',[duration_extid, record_id], function(error, result) {
	    					
	    				if(result.length==0)
	    				{
	    				
	    				db.dmlQry('insert into record set ? ', duration_JSON, function(error, result) {
	    					if(error){
	    				        console.log("Error" + error);
	    				        res.writeHead(500, {'Content-Type': "application/json"});
	    				        res.end(JSON.stringify({response:error}));
	    				    }
	    				    
	    				});
	    				}
	    				
	    				else
	    				{
	    				
	    					db.dmlQry('update record set value =? where extension_id = ? and record_id = ?',[req.body.Duration, duration_extid,record_id], function(error, result) {
		    					if(error){
		    				        console.log("Error" + error);
		    				        res.writeHead(500, {'Content-Type': "application/json"});
		    				        res.end(JSON.stringify({response:error}));
		    				    }
		    				    
		    				});
	    				
	    				}
	    					
	    				});
	    			}
	    				
	    			});
	    			
	    	}
	    		if(key=="Cost")
    			{
    			console.log("Coost log query");
    			db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
    			    if(error){
    			        console.log("Error" + error);
    			        res.writeHead(500, {'Content-Type': "application/json"});
    			        res.end(JSON.stringify({response:error}));
    			    }
    			cost_extid= result[0].extension_id;
    			console.log(cost_extid); 
    			if(cost_extid!=-1){
    				var cost_JSON = {
    						"record_id": record_id,
    						"extension_id":cost_extid,
    						"value":req.body.Cost
    				}
    				console.log(cost_JSON);
    				
    				db.dmlQry('select * from record where extension_id = ? and record_id = ?',[cost_extid, record_id], function(error, result) {
    					
    				if(result.length==0)
    				{
    				
    				db.dmlQry('insert into record set ? ', cost_JSON, function(error, result) {
    					if(error){
    				        console.log("Error" + error);
    				        res.writeHead(500, {'Content-Type': "application/json"});
    				        res.end(JSON.stringify({response:error}));
    				    }
    				    
    				});
    				}
    				
    				else
    				{
    				
    					db.dmlQry('update record set value =? where extension_id = ? and record_id = ?',[req.body.Cost, cost_extid,record_id], function(error, result) {
	    					if(error){
	    				        console.log("Error" + error);
	    				        res.writeHead(500, {'Content-Type': "application/json"});
	    				        res.end(JSON.stringify({response:error}));
	    				    }
	    				    
	    				});
    				
    				}
    					
    				});
    			}
    				
    			});
    			
    	}
	    		if(key=="Risk")
				{
	    			console.log("Risk log query");
	    			db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
	    			    if(error){
	    			        console.log("Error" + error);
	    			        res.writeHead(500, {'Content-Type': "application/json"});
	    			        res.end(JSON.stringify({response:error}));
	    			    }
	    			risk_extid= result[0].extension_id;
	    			console.log(risk_extid); 
	    			if(risk_extid!=-1){
	    				var risk_JSON = {
	    						"record_id": record_id,
	    						"extension_id":risk_extid,
	    						"value":req.body.Risk
	    				}
	    				console.log(risk_JSON);
	    				
	    				db.dmlQry('select * from record where extension_id = ? and record_id = ?',[risk_extid, record_id], function(error, result) {
	    					
	    				if(result.length==0)
	    				{
	    				
	    				db.dmlQry('insert into record set ? ', risk_JSON, function(error, result) {
	    					if(error){
	    				        console.log("Error" + error);
	    				        res.writeHead(500, {'Content-Type': "application/json"});
	    				        res.end(JSON.stringify({response:error}));
	    				    }
	    				    
	    				});
	    				}
	    				
	    				else
	    				{
	    				
	    					db.dmlQry('update record set value =? where extension_id = ? and record_id = ?',[req.body.Risk, risk_extid,record_id], function(error, result) {
		    					if(error){
		    				        console.log("Error" + error);
		    				        res.writeHead(500, {'Content-Type': "application/json"});
		    				        res.end(JSON.stringify({response:error}));
		    				    }
		    				    
		    				});
	    				
	    				}
	    					
	    				});
	    			}
	    				
	    			});
	    			
	    			
				}
	    		if(key=="Resource")
				{
	    			console.log("Resource log query");
	    			db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
	    			    if(error){
	    			        console.log("Error" + error);
	    			        res.writeHead(500, {'Content-Type': "application/json"});
	    			        res.end(JSON.stringify({response:error}));
	    			    }
	    			resource_extid= result[0].extension_id;
	    			console.log(resource_extid); 
	    			if(resource_extid!=-1){
	    				var resource_JSON = {
	    						"record_id": record_id,
	    						"extension_id":resource_extid,
	    						"value":req.body.Resource
	    				}
	    				console.log(resource_JSON);
	    				
	    				db.dmlQry('select * from record where extension_id = ? and record_id = ?',[resource_extid, record_id], function(error, result) {
	    					
	    				if(result.length==0)
	    				{
	    				
	    				db.dmlQry('insert into record set ? ', resource_JSON, function(error, result) {
	    					if(error){
	    				        console.log("Error" + error);
	    				        res.writeHead(500, {'Content-Type': "application/json"});
	    				        res.end(JSON.stringify({response:error}));
	    				    }
	    				    
	    				});
	    				}
	    				
	    				else
	    				{
	    				
	    					db.dmlQry('update record set value =? where extension_id = ? and record_id = ?',[req.body.Resource, resource_extid,record_id], function(error, result) {
		    					if(error){
		    				        console.log("Error" + error);
		    				        res.writeHead(500, {'Content-Type': "application/json"});
		    				        res.end(JSON.stringify({response:error}));
		    				    }
		    				    
		    				});
	    				
	    				}
	    					
	    				});
	    			}
	    				
	    			});
	    			
	    			
				}
	    		
	    		
	    	}
	    }
	    
	  });
	    });

 
 }

 //post

this.createTask = function(req, res, next) {
   var email_id= req.body.email_id;
   var user_id;
   var tenant_id;
   var record_id;
   console.log(email_id);
  db.dmlQry('select user_id, tenant_id from Users where email_id = ?',email_id, function(error,result){
    if(error){
        console.log("Error" + error);
        res.writeHead(500, {'Content-Type': "application/json"});
        res.end(JSON.stringify({response:error}));
    }
    user_id=result[0].user_id;
    tenant_id = result[0].tenant_id;
    var task_id= Math.floor(Math.random() * (100000 - 1) + 1);
    console.log(task_id);
    
     var record_id;
    var duration_extid=-1;
    var cost_extid=-1;
    var risk_extid=-1;
    var resource_extid=-1;
   // var resource_extid=-1;
    var Data_Table_Object={
    	    "tenant_id": tenant_id,
    	    "user_id":user_id,
    	    "project_name":req.body.project_name,
    	    "task_id":task_id,
    	    "task_name":req.body.task_name,
    	    "start_date": req.body.start_date,
    	    "end_date":req.body.end_date
    	    }
    
    db.dmlQry('insert into Data_Table set ?',Data_Table_Object, function(error,result){
    if(error){
        console.log("Error" + error);
        res.writeHead(500, {'Content-Type': "application/json"});
        res.end(JSON.stringify({response:error}));
    }
    else{
         res.writeHead(200, {'Content-Type': "application/json"});
         res.end(JSON.stringify({response:'Saved to MySQL'}));
    }   
    db.dmlQry('select record_id from Data_Table where task_id = ?',task_id, function(error,result){
        if(error){
            console.log("Error" + error);
            res.writeHead(500, {'Content-Type': "application/json"});
            res.end(JSON.stringify({response:error}));
        }
        console.log(result[0].record_id); // print record_id
        record_id= result[0].record_id;
        console.log("record_id   "+record_id)
    });
    
    for(var key in req.body){
    	if(req.body.hasOwnProperty(key)){
    		if(key=="Duration")
    			{
    			console.log("Duration log query");
    			db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
    			    if(error){
    			        console.log("Error" + error);
    			        res.writeHead(500, {'Content-Type': "application/json"});
    			        res.end(JSON.stringify({response:error}));
    			    }
    			duration_extid= result[0].extension_id;
    			console.log(duration_extid); 
    			if(duration_extid!=-1){
    				var duration_JSON = {
    						"record_id": record_id,
    						"extension_id":duration_extid,
    						"value":req.body.Duration
    				}
    				console.log(duration_JSON);
    				
    				db.dmlQry('insert into record set ? ', duration_JSON, function(error, result) {
    					if(error){
    				        console.log("Error" + error);
    				        res.writeHead(500, {'Content-Type': "application/json"});
    				        res.end(JSON.stringify({response:error}));
    				    }
    				    
    				});
    			}
    			});
    	}
    		if(key=="Cost")
			{
    			db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
    			    if(error){
    			        console.log("Error" + error);
    			        res.writeHead(500, {'Content-Type': "application/json"});
    			        res.end(JSON.stringify({response:error}));
    			    }
    			cost_extid= result[0].extension_id;
    			console.log(cost_extid); 
    			
    			if(cost_extid!=-1){
    				var cost_JSON = {
    						"record_id": record_id,
    						"extension_id":cost_extid,
    						"value":req.body.Cost
    				}
    				console.log(cost_JSON);
    				
    				db.dmlQry('insert into record set ? ', cost_JSON, function(error, result) {
    					if(error){
    				        console.log("Error" + error);
    				        res.writeHead(500, {'Content-Type': "application/json"});
    				        res.end(JSON.stringify({response:error}));
    				    }
    				    
    				});
    			}
    			});
    					
			
			}
    		if(key=="Risk")
			{
    			console.log("Risk log query");
    			db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
    			    if(error){
    			        console.log("Error" + error);
    			        res.writeHead(500, {'Content-Type': "application/json"});
    			        res.end(JSON.stringify({response:error}));
    			    }
    			risk_extid= result[0].extension_id;
    			console.log(risk_extid); 
    			
    			if(risk_extid!=-1){
    				var risk_JSON = {
    						"record_id": record_id,
    						"extension_id":risk_extid,
    						"value":req.body.Risk
    				}
    				console.log(risk_JSON);
    				
    				db.dmlQry('insert into record set ? ', risk_JSON, function(error, result) {
    					if(error){
    				        console.log("Error" + error);
    				        res.writeHead(500, {'Content-Type': "application/json"});
    				        res.end(JSON.stringify({response:error}));
    				    }
    				    
    				});
    			}
    			});
    			
    			
			}
    		if(key=="Resource")
			{
    			console.log("Resource log query");
    			db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
    			    if(error){
    			        console.log("Error" + error);
    			        res.writeHead(500, {'Content-Type': "application/json"});
    			        res.end(JSON.stringify({response:error}));
    			    }
    			resource_extid= result[0].extension_id;
    			console.log(resource_extid); 
    			
    			if(resource_extid!=-1){
    				var resource_JSON = {
    						"record_id": record_id,
    						"extension_id":resource_extid,
    						"value":req.body.Resource
    				}
    				console.log(resource_JSON);
    				
    				db.dmlQry('insert into record set ? ', resource_JSON, function(error, result) {
    					if(error){
    				        console.log("Error" + error);
    				        res.writeHead(500, {'Content-Type': "application/json"});
    				        res.end(JSON.stringify({response:error}));
    				    }
    				    
    				});
    			}
    			});
    			
    			
			}
    		
    		
    	}
    }
    
  });
    });
       
 }

  this.createProject = function(req, res) {

    console.log("Hi");
    /*db.dmlQry('insert into registration set ?',registration, function(error,result){
    if(error){
        console.log("Error" + error);
        res.writeHead(500, {'Content-Type': "application/json"});
        res.end(JSON.stringify({response:error}));
    }
    else{
         res.writeHead(200, {'Content-Type': "application/json"});
         res.end(JSON.stringify({response:'Saved to MySQL'}));
    }  

    return res.render('userProfile',{'firstName':user.firstName,'lastName': user.lastName,'EmailAddress': user._id,'WhatILike': user.whatilike,'Distance':user.Distance});
        
    });*/
    console.log("Request"+ req.body);



 }
    