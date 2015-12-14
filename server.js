/**
 * Created by Kewen on 12/12/15.
 */
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('underscore');


var app = express();
var port = process.env.PORT || 8888;
var urlencodedParser = bodyParser.urlencoded({extended: false});
var current_user;
var login_status = "";
var signup_status = "";
var id = function(profiles) {
	var max_id = 0;
	profiles.forEach(function(user) {
		user.notes.forEach(function(note) {
			if (note.id > max_id)
				max_id = note.id;
		});
	});
	return max_id++;
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

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/main.html'));
});


app.get('/login', function(req, res) {
	console.log(login_status);
	res.end(login_status);
	login_status = "";
});

app.get('/signup', function(req, res) {
	console.log(signup_status);
	res.end(signup_status);
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

// post 传入 title, contents, create_time, modify_time, is_starred, remind_info, attachment_path
app.post('/add', urlencodedParser, function(req, res) {
	var note = {
		id: id,
		title: req.body.title,
	  contents: req.body.contents,
		create_time: req.body.create_time,
	  modify_time: req.body.modify_time,
	  is_starred: req.body.is_starred,
	  remind_info: req.body.remind_info,
	  attachment_path: req.body.attachment_path
	};
	profile.forEach(function(user) {
		if (user.username === req.body.username) {
			user.notes.push(note);
		}
	});

	id++;
	fs.writeFileSync("./public/res/profiles.json", JSON.stringify(profiles));

});

// post 传入 id
app.post('/delete', urlencodedParser, function(req, res) {
	profile.forEach(function(user) {
		user.notes.forEach(function(note) {
			if (note.id === req.body.id) {
				notes.splice(notes.indexOf(note), 1);
			}
		});
	});
	fs.writeFileSync("./public/res/profiles.json", JSON.stringify(profiles));
});

// post 传入 id, title, contents, create_time, modify_time, is_starred, remind_info, attachment_path
app.post('/modify', urlencodedParser, function(req, res) {
	profile.forEach(function(user) {
		user.notes.forEach(function(note) {
			if (note.id === req.body.id) {
				note.title = req.body.title;
				note.contents = req.body.contents;
				note.create_time = req.body.create_time;
				note.modify_time = req.body.modify_time;
				note.is_starred = req.body.is_starred;
				note.remind_info = req.body.remind_info;
				note.attachment_path = req.body.attachment_path;
			}
		});
	});
	fs.writeFileSync("./public/res/profiles.json", JSON.stringify(profiles));
});



app.listen(port, function() {
	console.log('App is listening on port ' + port);
});


function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}