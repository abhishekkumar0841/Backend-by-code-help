const express = require('express')  // importing express module form express.js

const PORT = process.env.PORT || 5000

require('dotenv').config()

const app = express();  // creating instance of express

app.use(express.json());  // this is a middleware uses for parsing json

const blog = require('./routes/blog')

// mount
app.use("/api/v1", blog);

app.get('/', (req, res)=>{
    res.send(`<h1>Blog App<h1/> <h3>Home Page<h3/>`)
});

const dbConnect = require('./config/database')
dbConnect();

app.listen(PORT, ()=>{
    console.log(`This app is running on http://localhost:${PORT}`)
});