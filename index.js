const express = require('express')
const helmet = require ('helmet')
const cors = require ('cors')
const session = require('express-session')


const authRouter = require("./auth/auth-router")
const usersRouter = require ("./users/users-router")

const server = express()
const server = require('./api/server.js');

const PORT = process.env.PORT || 8000;

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use(session({ //session middleware
    resave: false, // do we want to recreate a session even if it has changed? 
    saveUninitialized: false,// GDPR compliance - laws against setting cookies automatically. Need to ask user if it's ok
    secret: 'mums the word!!', // to crytpgraphically sign the cookie // want to extract this rather than having it sitting in code
    cookie: {
        maxAge: 1000 * 30, //cookie/session will be valid for 30 seconds. Then expires
        secure: false, // true in production
        httpOnly: true // cookie can't be accessed from JS
    },

})) //can pass options as object

server.use("/auth", authRouter)
server.use("/users", usersRouter)

server.get("/", (req, res, next) => {
    res.json ({
        message: "All are welcome"
    })
})

server.use((err, req, res, next) => {
    console.log("Error:", err)

    res.status(500).json ({
        message: "Ut Oh, you should probably go back to where you came from"
    })
})
server.listen(PORT, () => {
    console.log(`\n** Running on port: ${PORT} **\n`)
});