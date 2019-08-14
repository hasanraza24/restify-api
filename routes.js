const User = require('./user.model');


module.exports = function(server) {
    server.post('/user', async  (req, res, next) => {
        try {
            const userData = Object.assign({}, req.body);
            const newUser = new User(userData);
            const user = await newUser.save();
            res.json(user);
        }catch(e) {
            next(e);
        }
    });
    server.get('/user', async (req, res, next) => {
        try {
            const users = await User.find({});
            res.json(users);
        }catch(e) {
            next(e);
        }
    });
    server.use((req, res, next, err) => {
        console.log(err);
        res.send(err);
    });
}