
/*
 * GET home page.
 */
 
exports.index = function(req, res){
  var query = req.app.get("query");
   query("select * from users", function(result) {
     res.render('index.html', {users: JSON.stringify(result.rows[0]), layout: 'application.html' } );
   });
};