require('dotenv').config();
const express = require('express')
const app = express();
const cors = require("cors");
var http = require('http').Server(app);
var package = require('../package.json');


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    cors();
    next(); 
  })

app.get("/detail", (req, res) => {
    // req.query.id
});

app.get("/list", (req, res) => {
    // req.query.page
});

// start server
http.listen(port, function () {
    console.log('listening on *:'+port);
    console.log('Version: ' + package.version);
});
