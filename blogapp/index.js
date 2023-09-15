const express = require('express')

const PORT = process.env.PORT || 5000

require('dotenv').config()

const app = express();

app.use(express.json());

const blog = require('./routes/blog')

app.use('/api/v1', blog);

app.get('/', (req, res)=>{
    res.send(`<h1>Blog App<h1/> <h3>Home Page<h3/>`)
});

const dbConnect = require('./config/database')
dbConnect();

app.listen(PORT, ()=>{
    console.log(`This app is running on http://localhost:${PORT}`)
});