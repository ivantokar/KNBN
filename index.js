/**
 * Module Dependencies
 */
const config = require('./config')
    , fs = require('fs')
    , restify = require('restify')
    , restifyPlugins = require('restify-plugins')
    , passport = require('passport-restify')
    , LocalStrategy = require('passport-local').Strategy
    , mongoose = require('mongoose')
    , controllers = {}
    , controllers_path = process.cwd() + '/controllers';

fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') !== -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
});

/**
 * Initialize Server
 */
const server = restify.createServer({
    name: config.name,
    version: config.version,
});


/**
 * Middleware
 */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

/**
 * Initialize Passport
 */
server.use(passport.initialize());
/**
 * Passport configuration
 */
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    controllers.users.loginUser
));


/**
 * Routes
 */
// user
server.post('/users', controllers.users.createUser);
server.post('/users/login',
    passport.authenticate('local',
        { session: false }),
        function(req, res) {
            res.send(200);
        });

server.get('/logout', (req, res) => {
    req.logout();
    res.send(200);
});

// lists
server.post('/lists', controllers.lists.createList);
server.put('/lists/:list_id', controllers.lists.updateList);
server.del('/lists/:list_id', controllers.lists.deleteList);
server.get('/lists', controllers.lists.viewList);

// cards
server.post('/cards', controllers.cards.createCard);
server.put('/cards/:card_id', controllers.cards.updateCard);
server.del('/cards/:card_id', controllers.cards.deleteCard);
server.get('/cards', controllers.cards.viewCard);

// serves static
server.get('/*', restify.plugins.serveStatic({
    directory: './build',
    file: 'index.html'
}));

/**
 * Start Server, Connect to DB
 */
server.listen(config.port, () => {
    // establish connection to mongodb
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db.uri, {});

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error(err);
        process.exit(1);
    });

    db.once('open', () => {
        console.log(`Server is listening on port ${config.port}`);
    });
});
