const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.');
		}
	})
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs', {
// 		infoMessage: 'We are currently moving! Stay tuned, we will be back soon.'
// 	});
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home page',
		welcomeMessage: 'Welcome to my website',
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		"name":"ErrorMessage", "text":"Error. Page not found."});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		projectLink: 'https://github.com/Fabs2308/node-course-2-webserver.git'
		infoMessage: 'Here you can find the link to my github project'
		});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});