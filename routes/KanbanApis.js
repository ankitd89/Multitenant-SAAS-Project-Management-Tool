var db = require('./db');

//get requests

this.getProjects = function(req, res, next) {
    db.dmlQry('insert into registration set ?',registration, function(error,result){
    if(error){
        console.log("Error" + error);
        res.writeHead(500, {'Content-Type': "application/json"});
        res.end(JSON.stringify({response:error}));
    }
    else{
         res.writeHead(200, {'Content-Type': "application/json"});
         res.end(JSON.strigify({response:'Saved to MySQL'}));
    }  

    //return res.render('userProfile',{'firstName':user.firstName,'lastName': user.lastName,'EmailAddress': user._id,'WhatILike': user.whatilike,'Distance':user.Distance});
        
	});

 }



 this.getTasks = function(req, res, next) {
    db.dmlQry('insert into registration set ?',registration, function(error,result){
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
        
	});

 }

//put

this.editTask = function(req, res, next) {
    db.dmlQry('insert into registration set ?',registration, function(error,result){
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
        
	});

 }

 //post

 this.createTask = function(req, res, next) {
    db.dmlQry('insert into registration set ?',registration, function(error,result){
    if(error){
        console.log("Error" + error);
        res.writeHead(500, {'Content-Type': "application/json"});
        res.end(JSON.stringify({response:error}));
    }
    else{
         res.writeHead(200, {'Content-Type': "application/json"});
         res.end(JSON.stringify({response:'Saved to MySQL'}));
    }  

    return res.end();
   // return res.render('userProfile',{'firstName':user.firstName,'lastName': user.lastName,'EmailAddress': user._id,'WhatILike': user.whatilike,'Distance':user.Distance});
        
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
    