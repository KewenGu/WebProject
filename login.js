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
var currentUser;
var login_status = "";
var signup_status = "";

//var profiles = [
//	{
//		username: "Xiaoren Yang",
//		password: "123456",
//		email: "xyang@wpi.edu"
//	},
//	{
//		username: "Zhaochen Ding",
//		password: "123456",
//		email: "zding2@wpi.edu"
//	},
//	{
//		username: "Kewen Gu",
//		password: "123456",
//		email: "kgu@wpi.edu"
//	}
//];
//
//fs.writeFileSync("./public/res/profiles.json", JSON.stringify(profiles));

var profiles = JSON.parse(fs.readFileSync("./public/res/profiles.json").toString());

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/login.html'));
});


app.get('/main', function(req, res) {
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
	if (username && password) {
		profiles.forEach(function (user) {
			if (user.username === username) {
				if (user.password === password) {
					currentUser = user;
					console.log(currentUser);
					login_status = "Done";
				}
				else
					login_status = "Incorrect username or password, please try again.";
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
			var newUser = {
				username: username,
				password: password,
				email: email
			}
			profiles.push(newUser);
			fs.writeFileSync("./public/res/profiles.json", JSON.stringify(profiles));
			currentUser = newUser;
			console.log(profiles);
			signup_status = "Done";
		}
		else
			signup_status = "Invalid email address.";
	}
	else
		signup_status = "All fields are required.";
});

app.listen(port, function() {
	console.log('App is listening on port ' + port);
});


function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}