var express = require('express');
var path = require('path');
var url = require("url");
var fs = require("fs");
var bodyParser = require('body-parser');
var _ = require('underscore')


var app = express();
var urlencodedParser =bodyParser.urlencoded({extended: false});
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));

// TODO: 到底怎么存储
contentbody = fs.readFileSync("note.JSON");
var note = JSON.stringify(contentbody);

app.post ('/login', urlencodedParser, function(req,res)){
  // TODO: server login
}

app.post ('/signup', urlencodedParser, function (req,res){
  // TODO: guest signup
})

app.post('/signout', urlencodedParser, function(req, res){
  // TODO: user signout
})

app.post('/add', urlencodedParser, function(req,res){
  // TODO: add notes
  var newnote = req.body;
  var temp = {
    title: newnote.title,
    contents: newnote.contentes,
    isstar: newnote.isstar,
    reminderinfo : newnote.reminderinfo,
    attachment: newnote.attachment
  };
  note.push(temp);
  fs.writeFileSync("note.JSON", JSON.stringify(note));
  alert("Note added successfully");
  res.end();
})
app.post('/noti', urlencodedParser, function(req,res){
  // TODO: look at the notifications
})
app.post('/sort', urlencodedParser, function(req,res){
  // TODO: sort the notes by some cretiria
})
app.post('/delete', urlencodedParser, function(req, res){
  // TODO: delete a note
})
app.get('/filter', urlencodedParser, function(req,res){
  // TODO: filter the note by some cretiria
})
app.post('/share', urlencodedParser, function(req,res){
  // TODO: share a note to another account
})
