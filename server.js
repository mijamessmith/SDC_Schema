const express = require('express');
const queries = require('./queries.js');

var app = express();


app.get('/', (req, res) =>  {
  queries.insertTest(req.query.name)
    .then(res => {
      res.send(res)
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

app.post('/name', (req, res) => {
  queries.addName(req.query.name)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    })
})

app.listen(3000, () => console.log('listening on 3000'));
