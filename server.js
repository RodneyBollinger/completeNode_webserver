const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    let now = new Date().toString();
    let logEntry = `${now}: ${req.method} ${req.path}`;

    console.log(logEntry);
    fs.appendFile('server.log', logEntry + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maint.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my site!'
    });
});

app.get('/products', (req, res) => {
    res.render('products.hbs', {
        pageTitle: 'Products Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad format'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
