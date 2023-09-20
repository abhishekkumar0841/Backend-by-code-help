const express = require('express');
const dbConnect = require('./config/database');
const cookieParser = require('cookie-parser');

require('dotenv').config()
const PORT = process.env.PORT || 4000

const app = express();
app.use(cookieParser())
app.use(express.json())


dbConnect();

//route import and mount
const user = require('./routes/user');
app.use('/api/v1', user)

app.get('/', (req, res)=>{
    res.send("Home page")
})

app.listen(PORT, ()=>{
    console.log(`This server is running on http://localhost:${PORT}`)
})