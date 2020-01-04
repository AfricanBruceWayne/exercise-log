const express = require('express'),
    chalk = require('chalk'),
    path = require('path'),
    errorHandler = require('errorhandler'),
    cors = require('cors'),
    flash = require('connect-flash'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    config = require('./db');


var isProduction = process.env.NODE_ENV === 'production';

/*
*   Require routes
*/

var userRoutes = require('./routes/api/users');

/*
* Connect to Mongo
*/
mongoose.connect(config.DB, { 
    useUnifiedTopology: true,
    useNewUrlParser: true
 })
.then(() => {
    console.log('%s Database is connected', chalk.green('✓'))
})
.catch((err) => {
    console.log('%s Cannot connect to database: ' + err, chalk.red('✗'));
    process.exit();
});

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
require('./passport')(passport);
app.use(flash());

// Use routes
app.use('/api/users', userRoutes);

// Serve static assets if in production
if (isProduction)
{
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

/*
 * Error Handler.
*/

if (!isProduction) 
{
    // only use in development
    app.use(errorHandler());
} else 
{
    app.use((err, req, res, next) => {
        // catch 404 and forward to error handler
        if (res.status(404)) { 
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
        if (res.status(500)) {
            console.error('%s ' + err, chalk.red('✗'));
            res.status(500).send('Server Error');
            res.json({'errors': {
                message: err.message,
                error: {}
            }});
        }
    });
}

const PORT = process.env.PORT || 7070;

app.listen(PORT, () => {
    console.log(`%s Server is running on PORT ${PORT}`, chalk.green('✓'));
});