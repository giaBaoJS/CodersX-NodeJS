// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
// https://expressjs.com/en/starter/basic-routing.html
var todos = ["Đi chợ", "Nấu cơm", "Rửa bát", "Học code tại CodersX"];
app.get('/', (request, response) => {
  response.send('I love CodersX');
});

app.get('/todos', (request, response) => {
     
  var q = request.query.q;
  var matchTodo = todos.filter(function(job){
    return job.toLowerCase().indexOf(q.toLowerCase()) !==-1;
  });
  response.render('test',{
       todos:matchTodo
     });
   
});


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
