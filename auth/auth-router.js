const router = require('express').Router();
const bcrypt = require ('bcrypt');

const Users = require('../users/users-model.js');

router.post('/register', async (req, res, next) => {
  try{
      const saved = await Users.add(req.body)
      res.status(201).json(saved)
    } catch (err){
        next(err)
        }
});

router.post('/login', async (req, res, next) => {
  try {
      const { username, password } = req.body;
      const user = await Users.findBy({ username }).first()
    
        const passwordValid = await bcrypt.compare(password, user.password)

      if (user && passwordValid) {
        req.session.user = user //saving some info about the user. Saved and send cookie
        //client holds onto cookie. Any other requests coming in are going to be saved
        //value persists

        res.status(200).json
        ({ message: `Welcome ${user.username}!`});

      } else {
        res.status(401).json
        ({ message: 'Invalid Credentials' });
         }
        } catch(error) {
        next(error)
        }
})

router.get("/protected", async (req, res, next) => {
    try {
        if (!req.session || !req.session.user) {
            return res.status(403).json ({
                message: "You don't belong here"
            })
        }
        res.json({
            message: "Come on in"
        })
    } catch (err) {
        next(err)
    }
});

module.exports = router;
