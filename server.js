const express = require('express'),
    chalk = require('chalk'),
    flash = require('connect-flash'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    config = require('./db');

const users = require('./routes/user');

// Mongo DB config
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

app.use(passport.initialize());
require('./passport')(passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(flash());

app.use('/api/users', users);

app.get('/', (req, res) => {
    
    // simple count for the session
    if (!req.session.count) 
    {
        req.session.count = 0;
    }
    req.session.count += 1;
 
    // respond with the session object
    res.json(req.session);

});

const PORT = process.env.PORT || 7070;

app.listen(PORT, () => {
    console.log(`%s Server is running on PORT ${PORT}`, chalk.green('✓'));
});