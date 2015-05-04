//#!/bin/env node
//  OpenShift sample Node application
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , request = require('request')
  , cors = require('cors')
  , db = require('./routes/db')
  ,KanbanAPIs= require('./routes/KanbanApis')
  ,Scrum= require('./routes/Scrum'),
  Gantter= require('./routes/Gantter');  
  

/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || process.env.IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };

    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.app = express();

        // all environments
        self.app.set('views', __dirname + '/public');
        self.app.set('view engine', 'ejs');
        //self.app.use(express.logger('dev'));
        self.app.use(express.bodyParser());
        self.app.use(express.methodOverride());
        self.app.use(self.app.router);
        self.app.use(cors());
        self.app.use(express.static(path.join(__dirname, 'public')));

        // development only
        if ('development' == self.app.get('env')) {
          self.app.use(express.errorHandler());
        }

         //self.app.get('/getTasks', KanbanAPIs.getTasks);
         self.app.post('/getProjects', KanbanAPIs.getProjects);
         self.app.post('/createProject', KanbanAPIs.createProject);
         self.app.post('/createTaskKanban', KanbanAPIs.createTask);
         self.app.post('/editTask', KanbanAPIs.editTask);
         self.app.post('/getScrumProjects', Scrum.getProjects);
         self.app.post('/createScrumTask', Scrum.createTask);
         self.app.post('/editScrumTask', Scrum.editTask);
         self.app.post('/getGantterProjects', Gantter.getProjects);
         self.app.post('/createGantterTask', Gantter.createTask);
         self.app.post('/editGantterTask', Gantter.editTask);
          self.app.post('/getQueue', KanbanAPIs.getQueue);
         self.app.post('/getScrumStatus', Scrum.getStatus);
         self.app.post('/getGantterStatus', Gantter.getStatus);
        
         self.app.post('/adduser',  function(req,res){
             
          var user = req.body;  
          var tenant_id = req.body.tenant_id;
          var email_id = req.body.email_id;
          var password = req.body.password;
          console.log(user);
          db.dmlQry('insert into Users set ?',user, function(error,result){
            if(error){
                console.log("Error" + error);
                res.writeHead(500, {'Content-Type': "application/json"});
                res.end(JSON.stringify({response:error}));
            }
            else{
                var replyJson = {email_id : email_id,
           	    				tenant_id : tenant_id,
           	    				password : password};
                
           	    res.writeHead(200, {'Content-Type': "application/json"});
                res.end(JSON.stringify(replyJson));
            }          
          });
        });
         
         self.app.post('/getuser',  function(req,res){
             var email_id = req.body.email_id;
             console.log(user);
             db.dmlQry('select * from Users where email_id = ?',email_id, function(error,result){
        	    if(error){
        	        console.log("Error" + error);
        	        res.writeHead(500, {'Content-Type': "application/json"});
        	        res.end(JSON.stringify({response:error}));
        	    }
               else{
            	   	var user_id=result[0].user_id;
           	    	var tenant_id = result[0].tenant_id;
           	    	var password = result[0].password;
           	    	if(req.body.password == password){
           	    		//send success message
           	    		var replyJson = {
           	    				user_id : user_id,
           	    				email_id : email_id,
           	    				tenant_id : tenant_id,
           	    				password : password
           	    		};
           	    		res.writeHead(200, {'Content-Type': "application/json"});
                        res.end(JSON.stringify(replyJson));
           	    	}
           	    	else{
           	    		//send error
           	    		res.writeHead(403, {'Content-Type': "application/json"});
                        res.end(JSON.stringify({response:'Invalid User'}));
           	    	}  
               }          
             });
           });

        
        
        
        
        
        
        
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();