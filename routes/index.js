var path    = require("path");
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
  //res.sendfile(path.join(__dirname+'/public/Theme/index.html'));
};