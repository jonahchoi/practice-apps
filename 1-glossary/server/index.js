require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

const db = require('./db.js');
// Serves up all static and generated assets in ../client/dist.
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('/glossary', (req, res) => {
  db.get(req.query.query)
    .then((wordList) => {
      res.status(200).json(wordList);
    })
    .catch((err) => {
      res.sendStatus(404);
    })
})

app.post('/glossary', (req, res) => {
  db.save(req.body)
    .then((result) => {
      console.log('New Entry Added', result);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
})

app.delete('/glossary', (req, res) => {
  console.log(req.body);
  db.deleteOne(req.body)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    });
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
