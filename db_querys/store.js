const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
require('dotenv').config()
let db = new sqlite3.Database(process.env.DB)
const authToken = require("../authToken.js")


// check inventory status
router.post('/', (req, res) => {

    db.get(`SELECT amount FROM store WHERE article = ?`, req.body.article, (err, row)=> {
        
        if (err) {
          console.log(err)
          res.sendStatus(404)
        } else {
          let newValue = row.amount - req.body.amount
          console.log(row)
          console.log(newValue)

          db.get(`UPDATE store SET amount = ? WHERE article = ?`, newValue, req.body.article, (err, row)=> {
      
              let body = {
                  status: 200,
                  newValue: newValue
              }

              if (err) {
                console.log(err)
                body.status = 400
                res.send(body)
              } else {
                res.send(body)
              }
                
          })
        }
      })

    


    
})


module.exports = router