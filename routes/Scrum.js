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
	    if(result.length==0)
	    {
	    	
	    	var message= {"Message": "No entries found"};
	    	res.end(JSON.stringify(message));
	    }
	    else{
	    user_id=result[0].user_id;
	    tenant_id = result[0].tenant_id;
	    
	    db.dmlQry('select distinct(project_name) from Data_Table where user_id = ?',user_id, function(error,result){
		    if(error){
		        console.log("Error" + error);
		        res.writeHead(500, {'Content-Type': "application/json"});
		        res.end(JSON.stringify({response:error}));
		    }
		    if(result.length==0)
		    {
		    	
		    	var message= {"Message": "No entries found"};
		    	res.end(JSON.stringify(message));
		    }
		    else{
		   
		    for(var j=0;j<result.length;j++){
		    	projects[j]=result[j].project_name;
	    		console.log(projects[j]);
		    }
		    
		    for(var j=0;j<projects.length;j++)
	    	{
		    	//var Gantter_query = "select task_id, task_name, start_date, end_date, r.record_id,extension_name, GROUP_CONCAT(if(r.extension_id = 7005, value, NULL)) AS 'Desc', GROUP_CONCAT(if(r.extension_id = 7006, value, NULL)) AS 'Task_Type', GROUP_CONCAT(if(r.extension_id = 7007, value, NULL)) AS 'Assignee', GROUP_CONCAT(if(r.extension_id = 7008, value, NULL)) AS 'Status', GROUP_CONCAT(if(r.extension_id = 7009, value, NULL)) AS 'Priority' from Data_Table d join record r ON d.record_id = r.record_id join Meta_Data md ON md.extension_id = r.extension_id where project_name = ? group by task_id";
		    	k=0;
		    	project=projects[j];
		    	console.log("project + "+project);
		    	var count =0;
		    	db.dmlQry('select project_name,task_id, task_name, start_date, end_date, GROUP_CONCAT(if(r.extension_id = 7010, value, NULL)) AS "Team_velocity", GROUP_CONCAT(if(r.extension_id = 7011, value, NULL)) AS "Actual_points", GROUP_CONCAT(if(r.extension_id = 7012, value, NULL)) AS "Points_Expected", GROUP_CONCAT(if(r.extension_id = 7013, value, NULL)) AS "Point_Completed" from Data_Table d join record r ON d.record_id = r.record_id join Meta_Data md ON md.extension_id = r.extension_id where project_name = ? group by task_id',project, function(error,result){
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
			 		    tempProjects["projects"]=  result; 
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
		    }
		    
	});
	}
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
	    var Teamvelocity_extid=-1;
	    var actualpoints_extid=-1;
	    var pointsexp_extid=-1;
	    var pointcompl_extid=-1;
	   // var pointcompl_extid=-1;
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
	    		if(key=="Team_velocity")
	    			{
	    			console.log("Team_velocity log query");
	    			db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
	    			    if(error){
	    			        console.log("Error" + error);
	    			        res.writeHead(500, {'Content-Type': "application/json"});
	    			        res.end(JSON.stringify({response:error}));
	    			    }
	    			Teamvelocity_extid= result[0].extension_id;
	    			console.log(Teamvelocity_extid); 
	    			if(Teamvelocity_extid!=-1){
	    				var teamvelocity_JSON = {
	    						"record_id": record_id,
	    						"extension_id":Teamvelocity_extid,
	    						"value":req.body.Team_velocity
	    				}
	    				console.log(teamvelocity_JSON);
	    				
	    				db.dmlQry('select * from record where extension_id = ? and record_id = ?',[Teamvelocity_extid, record_id], function(error, result) {
	    					
	    				if(result.length==0)
	    				{
	    				
	    				db.dmlQry('insert into record set ? ', teamvelocity_JSON, function(error, result) {
	    					if(error){
	    				        console.log("Error" + error);
	    				        res.writeHead(500, {'Content-Type': "application/json"});
	    				        res.end(JSON.stringify({response:error}));
	    				    }
	    				    
	    				});
	    				}
	    				
	    				else
	    				{
	    				
	    					db.dmlQry('update record set value =? where extension_id = ? and record_id = ?',[req.body.Team_velocity, Teamvelocity_extid,record_id], function(error, result) {
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
	    		
	    		if(key=="Actual_points")
                {
                console.log("Actual points log query");
                db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
                    if(error){
                        console.log("Error" + error);
                        res.writeHead(500, {'Content-Type': "application/json"});
                        res.end(JSON.stringify({response:error}));
                    }
                actualpoints_extid= result[0].extension_id;
                console.log(actualpoints_extid); 
                if(actualpoints_extid!=-1){
                    var actuapoints_JSON = {
                            "record_id": record_id,
                            "extension_id":actualpoints_extid,
                            "value":req.body.Actual_points
                    }
                    console.log(actuapoints_JSON);
                    
                    db.dmlQry('select * from record where extension_id = ? and record_id = ?',[actualpoints_extid, record_id], function(error, result) {
                        
                    if(result.length==0)
                    {
                    
                    db.dmlQry('insert into record set ? ', actuapoints_JSON, function(error, result) {
                        if(error){
                            console.log("Error" + error);
                            res.writeHead(500, {'Content-Type': "application/json"});
                            res.end(JSON.stringify({response:error}));
                        }
                        
                    });
                    }
                    
                    else
                    {
                    
                        db.dmlQry('update record set value =? where extension_id = ? and record_id = ?',[req.body.Actual_points, actualpoints_extid,record_id], function(error, result) {
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

        if(key=="Points_Expected")
                {
                    console.log("Points Expected log query");
                    db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
                        if(error){
                            console.log("Error" + error);
                            res.writeHead(500, {'Content-Type': "application/json"});
                            res.end(JSON.stringify({response:error}));
                        }
                    pointsexp_extid= result[0].extension_id;
                    console.log(pointsexp_extid); 
                    if(pointsexp_extid!=-1){
                        var pointsexp_JSON = {
                                "record_id": record_id,
                                "extension_id":pointsexp_extid,
                                "value":req.body.Points_Expected
                        }
                        console.log(pointsexp_JSON);
                        
                        db.dmlQry('select * from record where extension_id = ? and record_id = ?',[pointsexp_extid, record_id], function(error, result) {
                            
                        if(result.length==0)
                        {
                        
                        db.dmlQry('insert into record set ? ', pointsexp_JSON, function(error, result) {
                            if(error){
                                console.log("Error" + error);
                                res.writeHead(500, {'Content-Type': "application/json"});
                                res.end(JSON.stringify({response:error}));
                            }
                            
                        });
                        }
                        
                        else
                        {
                        
                            db.dmlQry('update record set value =? where extension_id = ? and record_id = ?',[req.body.Points_Expected, pointsexp_extid,record_id], function(error, result) {
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


                if(key=="Point_Completed")
                {
                    console.log("Point Completed log query");
                    db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
                        if(error){
                            console.log("Error" + error);
                            res.writeHead(500, {'Content-Type': "application/json"});
                            res.end(JSON.stringify({response:error}));
                        }
                    pointcompl_extid= result[0].extension_id;
                    console.log(pointcompl_extid); 
                    if(pointcompl_extid!=-1){
                        var pointscompl_JSON = {
                                "record_id": record_id,
                                "extension_id":pointcompl_extid,
                                "value":req.body.Point_Completed
                        }
                        console.log(pointscompl_JSON);
                        
                        db.dmlQry('select * from record where extension_id = ? and record_id = ?',[pointcompl_extid, record_id], function(error, result) {
                            
                        if(result.length==0)
                        {
                        
                        db.dmlQry('insert into record set ? ', pointscompl_JSON, function(error, result) {
                            if(error){
                                console.log("Error" + error);
                                res.writeHead(500, {'Content-Type': "application/json"});
                                res.end(JSON.stringify({response:error}));
                            }
                            
                        });
                        }
                        
                        else
                        {
                        
                            db.dmlQry('update record set value =? where extension_id = ? and record_id = ?',[req.body.Point_Completed, pointcompl_extid,record_id], function(error, result) {
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
    var teamvel_extid=-1;
    var actpts_extid=-1;
    var ptsexp_extid=-1;
    var ptscmp_extid=-1;
    
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
    		if(key=="Team_velocity")
    			{
    			console.log("Team_velocity log query");
    			db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
    			    if(error){
    			        console.log("Error" + error);
    			        res.writeHead(500, {'Content-Type': "application/json"});
    			        res.end(JSON.stringify({response:error}));
    			    }
    			teamvel_extid= result[0].extension_id;
    			console.log(teamvel_extid); 
    			if(teamvel_extid!=-1){
    				var teamvel_JSON = {
    						"record_id": record_id,
    						"extension_id":teamvel_extid,
    						"value":req.body.Team_velocity
    				}
    				console.log(teamvel_JSON);
    				
    				db.dmlQry('insert into record set ? ', teamvel_JSON, function(error, result) {
    					if(error){
    				        console.log("Error" + error);
    				        res.writeHead(500, {'Content-Type': "application/json"});
    				        res.end(JSON.stringify({response:error}));
    				    }
    				    
    				});
    			}
    			});
    	}
    		if(key=="Actual_points")
			{
    			db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
    			    if(error){
    			        console.log("Error" + error);
    			        res.writeHead(500, {'Content-Type': "application/json"});
    			        res.end(JSON.stringify({response:error}));
    			    }
    			actpts_extid= result[0].extension_id;
    			console.log(actpts_extid); 
    			
    			if(actpts_extid!=-1){
    				var actpts_JSON = {
    						"record_id": record_id,
    						"extension_id":actpts_extid,
    						"value":req.body.Actual_points
    				}
    				console.log(actpts_JSON);
    				
    				db.dmlQry('insert into record set ? ', actpts_JSON, function(error, result) {
    					if(error){
    				        console.log("Error" + error);
    				        res.writeHead(500, {'Content-Type': "application/json"});
    				        res.end(JSON.stringify({response:error}));
    				    }
    				    
    				});
    			}
    			});
    					
			
			}
    		if(key=="Points_Expected")
			{
    			console.log("Points expected log query");
    			db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
    			    if(error){
    			        console.log("Error" + error);
    			        res.writeHead(500, {'Content-Type': "application/json"});
    			        res.end(JSON.stringify({response:error}));
    			    }
    			ptsexp_extid= result[0].extension_id;
    			console.log(ptsexp_extid); 
    			
    			if(ptsexp_extid!=-1){
    				var ptsexp_JSON = {
    						"record_id": record_id,
    						"extension_id":ptsexp_extid,
    						"value":req.body.Points_Expected
    				}
    				console.log(ptsexp_JSON);
    				
    				db.dmlQry('insert into record set ? ', ptsexp_JSON, function(error, result) {
    					if(error){
    				        console.log("Error" + error);
    				        res.writeHead(500, {'Content-Type': "application/json"});
    				        res.end(JSON.stringify({response:error}));
    				    }
    				    
    				});
    			}
    			});
    			
    			
			}
    		if(key=="Point_Completed")
			{
    			console.log("Point_Completed log query");
    			db.dmlQry('select extension_id from Meta_Data where extension_name =?',key, function(error,result){
    			    if(error){
    			        console.log("Error" + error);
    			        res.writeHead(500, {'Content-Type': "application/json"});
    			        res.end(JSON.stringify({response:error}));
    			    }
    			ptscmp_extid= result[0].extension_id;
    			console.log(ptscmp_extid); 
    			
    			if(ptscmp_extid!=-1){
    				var ptscmp_JSON = {
    						"record_id": record_id,
    						"extension_id":ptscmp_extid,
    						"value":req.body.Point_Completed
    				}
    				console.log(ptscmp_JSON);
    				
    				db.dmlQry('insert into record set ? ', ptscmp_JSON, function(error, result) {
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



 this.getStatus = function(req, res) {
      var No_of_Hours = 0;
      var records = [];
      var resUJson=[];
      var email_id= req.body.email_id;
      var user_id;
      var tenant_id;
      var record_id;
      var total_points_sum=0;
      var total_points_completed_sum=0;
      var count =0;
      var team_velocity_sum = 0;
      var valueEnd_Date = [];
      console.log(email_id);
      db.dmlQry('select user_id, tenant_id from Users where email_id = ?',email_id, function(error,result){
        if(error){
            console.log("Error" + error);
            res.writeHead(500, {'Content-Type': "application/json"});
            res.end(JSON.stringify({response:error}));
        }
        
        user_id=result[0].user_id;
        tenant_id = result[0].tenant_id;
        console.log("QUERY")
        
        db.dmlQry('select record_id,end_date from Data_Table where user_id = ? and project_name = ?',[user_id, req.body.project_name], function(error,result){
            if(error){
                console.log("Error" + error);
                res.writeHead(500, {'Content-Type': "application/json"});
                res.end(JSON.stringify({response:error}));
            }
            for(var j=0;j<result.length;j++){
                records[j]=result[j].record_id;
                valueEnd_Date.push(result[j].end_date);
                console.log(records[j]);
            }
        
    
        //1
            var valuePoints_Expected = [];
            var valuePoints_Completed = [];
            pointExpected(records, res,total_points_sum,valuePoints_Expected, 0,0);
            
            
            //Query function for point Expected
            function pointExpected(records, res,total_points_sum,valuePoints_Expected, j,count){
                if(j<records.length){
                    count++;
                    db.dmlQry('select value from record r JOIN Data_Table d ON d.record_id=r.record_id where extension_id=7012 and r.record_id = ?',[records[j]], function(error,result){
                        if(error){
                            console.log("Error" + error);
                            res.writeHead(500, {'Content-Type': "application/json"});
                            res.end(JSON.stringify({response:error}));
                        }
                        if(result.length==0){
                            res.end("No Data in DB");
                        }
                        else{
                            total_points_sum = total_points_sum+parseInt(result[0].value);
                            console.log(total_points_sum);
                            valuePoints_Expected.push(result[0].value);
                            pointExpected(records, res,total_points_sum,valuePoints_Expected, j+1,count);
                        }
                        if(count==records.length)
                        {
                        
                            console.log("total_points_sum in console after for "+total_points_sum);
                            pointCompleted(records, res,total_points_completed_sum,valuePoints_Completed, 0,0);
                    
                        }
                    });
                
                }
            }
            
            //Query function for point Completed
            
            function pointCompleted(records, res,total_points_completed_sum,valuePoints_Completed, j,count){
                if(j<records.length){
                    count++;
                    db.dmlQry('select value from record r JOIN Data_Table d ON d.record_id=r.record_id where extension_id=7013 and r.record_id = ?',[records[j]], function(error,result){
                        if(error){
                            console.log("Error" + error);
                            res.writeHead(500, {'Content-Type': "application/json"});
                            res.end(JSON.stringify({response:error}));
                        }
                        if(result.length==0){
                            res.end("No Data in DB");
                        }
                        else{
                            //console.log(result);
                            total_points_completed_sum = total_points_completed_sum+parseInt(result[0].value);
                            console.log(total_points_completed_sum);
                            valuePoints_Completed.push(result[0].value);
                            pointCompleted(records, res,total_points_completed_sum,valuePoints_Completed, j+1,count)
                        }
                        if(count==records.length)
                        {
                            console.log("total_points_sum in console after for "+total_points_completed_sum);
                            teamVelocity(records,team_velocity_sum,0,0);
                        }
                    });
                }
            }
            
            //Query function for Team Velocity
            console.log("records.length"+records.length);
            function teamVelocity(records,team_velocity_sum,j,count){
                if(j<records.length){
                    count++;
                    db.dmlQry('select value from record r JOIN Data_Table d ON d.record_id=r.record_id where extension_id=7010 and r.record_id = ?',[records[j]], function(error,result){
                        if(error){
                            console.log("Error" + error);
                            res.writeHead(500, {'Content-Type': "application/json"});
                            res.end(JSON.stringify({response:error}));
                        }
                        if(result.length==0){
                            res.end("No Data in DB");
                        }
                        else{
                            //console.log(result);
                            team_velocity_sum = team_velocity_sum+parseInt(result[0].value);
                            console.log(team_velocity_sum);
                            teamVelocity(records,team_velocity_sum,j+1,count)
                        }
                        if(count==records.length)
                        {
                            var someDate = new Date();
                            No_of_Hours = ((total_points_sum-total_points_completed_sum)/(team_velocity_sum/count));
                            var numberOfDaysToAdd = Math.ceil((No_of_Hours/24));
                            someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
                            
                            var dd = someDate.getDate();
                            var mm = someDate.getMonth() + 1;
                            var y = someDate.getFullYear();
        
                            var someFormattedDate = y + '-'+ mm + '-'+ dd;
                            var date_JSON = {"Expected_Completion_Date" : someFormattedDate}
                            var tempJson = {};
                            tempJson["name"] = "Points_Expected";
                            tempJson["value"] = valuePoints_Expected;
                             
                            var tempJson1 = {};
                            tempJson1["name"] = "Point_Completed";
                            tempJson1["value"] = valuePoints_Completed;
                             
                            var tempJson2 = {};
                            tempJson2["name"] = "Expected_Completion_Date";
                            tempJson2["value"] = someFormattedDate;
         
                            var tempJson3 = {};
                            tempJson3["name"] = "end_date";
                            tempJson3["value"] = valueEnd_Date;
                             
                            var res_JSON = [];
                            res_JSON.push(tempJson);
                            res_JSON.push(tempJson3);
                            res_JSON.push(tempJson1);
                            res_JSON.push(tempJson2);
                            
                            res.end(JSON.stringify(res_JSON));
                        }
                    });//Team Velocity Qwery
                }
            }
        });//2nd Qwery
    }); //1st qwery
 }
    