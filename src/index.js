const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
const port = 3000;
const route = require('../src/routes/index.route');
// * Connect to DB
const db = require('./configs/db')
db.connectDB();
// Set up Handlebars as the template engine
app.engine('.hbs', engine({ extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// Handle static files from the 'public' directory 
app.use(express.static(path.join(__dirname, 'public')));


// routes initialization
route(app);

// Start the server
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});

