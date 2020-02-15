const router = require('express').Router();
const bcrypt = require ('bycrpt');

const Users = require('./users-model');

router.get('/', auth, (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(error => res.send(error));
});

function auth (req, res, next) {
    const {username, password} = req.headers;
    console.log(kd.users-router.function-auth.headers, username)
    Users.findBY ({ username })
        .first()
        .then(user => {
           if (user && bycrpt.compareSync(password, user.password)) {
               console.log("You made it in!!")
               next();
           } else {
               res.status(401).json
               ({
                   status: false,
                   errorMessage: "Um, too bad so sad. You are not allowed to enter with those credentials"
               });
           }
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

module.exports= router; 