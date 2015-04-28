
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , request = require('request')
  , cors = require('cors')
  , db = require('./routes/db');  
var app = express();
var KanbanAPIs= require('./routes/KanbanAPIs');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


 app.get('/getTasks', KanbanAPIs.getTasks);
 app.get('/getProjects', KanbanAPIs.getProjects);
 app.post('/createProject', KanbanAPIs.createProject);
 app.post('/createTask', KanbanAPIs.createTask);
 app.post('/editTask', KanbanAPIs.editTask);

  app.post('/adduser',  function(req,res){
  var user = req.body;
  db.dmlQry('insert into Users set ?',user, function(error,result){
    if(error){
        console.log("Error" + error);
        res.writeHead(500, {'Content-Type': "application/json"});
        res.end(JSON.stringify({response:error}));
    }
    else{
         res.writeHead(200, {'Content-Type': "application/json"});
         res.end(JSON.stringify({response:'Saved to MySQL'}));
    }          
  });
});




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
});
*/
// development only





if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
