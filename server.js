/*const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/develop/public/index.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/develop/public/notes.html');
});


app.post('/notes', (req, res) => {
  fs.readFile(__dirname + '/develop/db/db.json', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    notes.push(req.body);
    fs.writeFile(__dirname + '/db.json', JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.send('Note added successfully!');
    });
  });
});

app.listen(port, () => {
  console.log(`Note taker app is listening on port ${port}!`);
});*/

const { prototype } = require("events");
const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Develop/public/index.html");
});

app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/Develop/public/notes.html");
});

app.get("/api/notes", (req, res) => {
  let notes = [];
  if (fs.existsSync("Develop/db/db.json")) {
    notes = JSON.parse(fs.readFileSync("Develop/db/db.json", "utf8"));
  }
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  let notes = [];
  if (fs.existsSync("Develop/db/db.json")) {
    notes = JSON.parse(fs.readFileSync("Develop/db/db.json", "utf8"));
  }

  const newNote = {
    id: Date.now(),
    title: req.body.title,
    text: req.body.text,
  };

  notes.push(newNote);
  fs.writeFileSync("Develop/db/db.json", JSON.stringify(notes));
  res.json(notes);
});

app.listen(port, () => {
  console.log("Server started on port 3000");
});