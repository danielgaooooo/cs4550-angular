const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/cs4550-angular'));


app.get('/*all', function(req,res) {
  res.sendFile(path.join(__dirname, './dist/cs4550-angular/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8000);

