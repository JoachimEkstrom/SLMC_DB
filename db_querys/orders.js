const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
require('dotenv').config()
let db = new sqlite3.Database(process.env.DB)


router.post('/', (req, res) => {

    db.run("INSERT INTO orders VALUES(?, ?, ?, ?)", [null, req.body.name, req.body.article, req.body.amount], function(err) {
        
      console.log(`Row was added to the table: ${this.lastID}`);

        let body = {
            status: null,
            orderNumber:""
        }

        if (err) {
          console.log(err)
          body.status = 500
          res.send(body)
        } else {
          body.status = 200
          body.orderNumber = this.lastID
          res.send(body)
        }
    })

    


    
})

module.exports = router