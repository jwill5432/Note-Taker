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