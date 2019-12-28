const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the Vue app
app.use(express.static(path.join(__dirname, '../dist/spa/statics')));

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, '../dist/spa/index.html'));
});

const port = 5000;
app.listen(port);

console.log('App is listening on port ' + port);
