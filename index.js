const express = require("express")
const app = express()

const users = require('./db_querys/users.js')
const store = require('./db_querys/store.js')
const orders = require('./db_querys/orders.js')


require('dotenv').config()
const port = process.env.PORT || 3001

app.use(express.json())
app.use("/users", users)
app.use("/store", store)
app.use("/orders", orders)




app.listen(port, ()=> {

    console.log(`Server running at http://localhost:${port}`)

})

