/**
 * Created by Kewen on 12/12/15.
 */
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('underscore');
var nodemailer = require("nodemailer");
var schedule = require('node-schedule');



var app = express();
var port = process.env.PORT || 8888;
var urlencodedParser = bodyParser.urlencoded({extended: false});
var current_user;
var login_status = "";
var signup_status = "";
var generateId = function(profiles) {
	var max_id = 0;
	profiles.forEach(function(user) {
		user.notes.forEach(function(note) {
			if (note.id > max_id)
				max_id = note.id;
		});
	});
	return max_id+1;
};

/*var profiles = [
	{
		username: "Xiaoren Yang",
		password: "123456",
		email: "xyang@wpi.edu",
		notes: []
	},
	{
		username: "Zhaochen Ding",
		password: "123456",
		email: "zding2@wpi.edu",
		notes: []
	},
	{
		username: "Kewen Gu",
		password: "123456",
		email: "kgu@wpi.edu",
		notes: []
	}
];

fs.writeFileSync("./public/res/profiles.json", JSON.stringify(profiles));*/

var profiles = JSON.parse(fs.readFileSync("./public/res/profiles.json").toString());
var currentNoteID = generateId(profiles);

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/main.html'));
});


app.get('/login', function(req, res) {
	console.log(login_status);
	res.end(login_status+'&'+ JSON.stringify(current_user));
	login_status = "";
});

app.get('/signup', function(req, res) {
	console.log(signup_status);
	res.end(signup_status+'&');
	signup_status = "";
});

app.post('/login', urlencodedParser, function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	console.log(username);
	console.log(password);
	if (username && password) {
		login_status = "Incorrect username or password, please try again.";
		profiles.forEach(function(user) {
			if (user.username === username) {
				if (user.password === password) {
					current_user = user;
					console.log(current_user);
					login_status = "Done";
					res.end();
				}
			}
		});
	}
	else
		login_status = "All fields are required.";
});

app.post('/signup', urlencodedParser, function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	if (username && password && email) {
		if (validateEmail(email)) {
			var new_user = {
				username: username,
				password: password,
				email: email,
				notes: []
			};
			profiles.push(new_user);
			fs.writeFileSync("./public/res/profiles.json", JSON.stringify(profiles));
			current_user = new_user;
			console.log(profiles);
			signup_status = "Done";
		}
		else
			signup_status = "Invalid email address.";
	}
	else
		signup_status = "All fields are required.";
});

// post 传入 title, content, create_time, modify_time, is_starred, remind_info, attachment_path
app.post('/add', urlencodedParser, function(req, res) {
	console.log('start add');
	console.log(req.body);
	var note = {
		id: currentNoteID,
		title: req.body.title,
	  contents: req.body.contents,
		create_time: (new Date()).toLocaleString(),
	  modify_time: (new Date()).toLocaleString()
	  // isStar: req.body.isStar,
	};
	if (req.body.isStar) {
		note.isStar = true;
	}
	else {
		note.isStar = false;
	}
	if (req.body.remind_info) {
		note.remind_info = req.body.remind_info;
	}
	else {
		note.remind_info = false;
	}
	if (req.body.attachment_path) {
		note.attachment_path = req.body.attachment_path;
	}
	else {
		note.attachment_path = false;
	}
	profiles.forEach(function(user) {
		if(user.username === req.body.username){
			user.notes.push(note);
			res.send(JSON.stringify(user));
		}
	});

	console.log(note);
	console.log(profiles);
	currentNoteID++;
	fs.writeFileSync("./public/res/profiles.json", JSON.stringify(profiles));
});

// post 传入 id
app.post('/delete', urlencodedParser, function(req, res) {
	console.log('start delete');
	console.log(req.body);
	profiles.forEach(function(user) {
		if(user.username === req.body.username) {
			user.notes.forEach(function(note, index, arr){
				if(note.id == req.body.id) {
					arr.splice(arr.indexOf(note), 1);
				}
			});
			console.log(user);
			res.send(JSON.stringify(user));
		}
	});
	fs.writeFileSync("./public/res/profiles.json", JSON.stringify(profiles));
});

// post 传入 id, title, content, create_time, modify_time, is_starred, remind_info, attachment_path
app.post('/edit', urlencodedParser, function(req, res) {
	console.log('start edit');
	console.log(req.body);
	console.log(profiles);
	//current_user = findUser(req.body.username);
	//var editNote = findNote(current_user, req.body.id);
	//console.log(editNote);
	profiles.forEach(function(user) {
		if (user.username === req.body.username) {
			user.notes.forEach(function (note) {
				if (note.id == req.body.id) {
					note.title = req.body.title;
					note.contents = req.body.contents;
					note.isStar = req.body.isStar;
					note.modify_time = (new Date()).toLocaleString();
					console.log(note);
				}
			});
			res.send(JSON.stringify(user));
		}
	});
	fs.writeFileSync("./public/res/profiles.json", JSON.stringify(profiles));
});



app.post('/email', urlencodedParser, function(req, res){
	var emailUser;
	var emailNote;
	profiles.forEach(function(user) {
		if (user.username === req.body.username) {
			emailUser = user;
			user.notes.forEach(function (note) {
				if (note.id == req.body.id) {
					emailNote = note;
					console.log(note);
				}
			});
		}
	});

	var date1 = new Date(req.body.year, req.body.month-1, req.body.day, req.body.hour, req.body.minute, 0);
	var schedJob = schedule.scheduleJob(date1, function(){
		console.log("creating email");
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'goddesscs4241finalproject@gmail.com',
				pass: 'Wearegoddess'
			}
		}, {
			// default values for sendMail method
			from: 'goddesscs4241finalproject@gmail.com',
			headers: {
				'My-Awesome-Header': '123'
			}
		});
		transporter.sendMail({
			to: emailUser.email,
			subject: emailNote.title,
			text: emailNote.contents,
			attachments: [
				{   // utf-8 string as an attachment
					filename: 'text1.txt',
					content: 'hello world!'
				}]
		});
		console.log('email sent');
	});
	res.end();
});



app.listen(port, function() {
	console.log('App is listening on port ' + port);
});


function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}



