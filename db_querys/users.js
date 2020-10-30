const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
require('dotenv').config()
let db = new sqlite3.Database(process.env.DB)
const authToken = require("../authToken.js")


// get one user
router.post('/', function (req, res) {

    let user = req.body.name
    let password = req.body.password

    db.get(`SELECT name, password FROM users WHERE name = ?`, user, (err, row)=> {
      
      if(row){      
        if (row.name === user && row.password === password){
        console.log(row)
        res.sendStatus(200)
        } else {
          res.sendStatus(404)
        }
      } else {
        res.sendStatus(404)
      }
    })

    
})

// get all users
router.get('/all', authToken, (req, res) => {
   console.log(req.user)

    db.all(`SELECT name, password FROM users`, (err, row)=> {
      
      if(row){      
        console.log(row)
        res.json(row)
        } else {
        res.json({ err : "General error" })
        }
    })   
})


module.exports = router