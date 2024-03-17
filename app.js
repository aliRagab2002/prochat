const express = require('express')
const app = express()
const cors = require("cors")
app.use(cors())

const port = process.env.PORT || 4000

require('./db/db')
app.use(express.json())

// //Hosptial A
// const router = require('./Hosptial A/routes/Doner.route')
// app.use(router)

// const patiantA = require('./Hosptial A/routes/patiant.route')
// app.use(patiantA)

// //Hosptial B

// const DonerB = require('./Hosptial B/routes/Doner.routeHosptialB')
// app.use(DonerB)

// const patiantB = require('./Hosptial B/routes/patiant.routeHosptialB')
// app.use(patiantB)

// //Hosptial C

// const DonerC = require('./Hosptial C/routes/Doner.routeHosptialC')
// app.use(DonerC)

// const patiantC = require('./Hosptial C/routes/patiant.routeHosptialC')
// app.use(patiantC)


const Donors = require('./routes/donor.route');
app.use(Donors)


app.listen(port,()=>{console.log('sucss to save')})