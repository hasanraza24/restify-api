const restify = require('restify');
      mongoose = require('mongoose');

const server = restify.createServer({
    name: 'rest-api',
    version: 1.0
});

server.use(restify.plugins.bodyParser({ mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.fullResponse());

server.listen(3000, () => {
    mongoose.connect('mongodb://localhost:27017/rest-api', { useNewUrlParser: true }, err => {
        if(err) console.log(err);
        console.log('Database connected');
        require('./routes')(server);
    });
    mongoose.set('useCreateIndex', true);
    console.log('Server is listening on port 3000');
})