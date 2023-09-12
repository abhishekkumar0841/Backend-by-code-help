// put is use to update
// get is use to fetch or retrive
// delete is use to remove
// post is use to submit

const express = require('express')

const app = express();

const bodyParser = require('body-parser')    //bodyParser is used to parse the data of body in express
app.use(bodyParser.json()) //specifically parse json data and add it to the request.body object

app.listen(3000, ()=>{
    console.log("Server is started at port no. 3000")
});

app.get('/', (req, res)=>{
    res.send("Hello jeee")
});

app.post('/api/cars', (req, res)=>{
    const {name, brand} = req.body;
    console.log(name)
    console.log(brand)
    res.send('Car submitted successfully')
});

// connecting database form mongoose--> mongoose is a ODB (object data modeling) by which we can connect our node/express from mongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewUrlParser: true,  // these useNewUrlParser and useUnifiedTopology is nothing but it is a normal syntax for connecting mongodb
    useUnifiedTopology: true,
    family: 4
})
.then(()=>{console.log("Connection successful")})
.catch((err)=> {console.log("Error:", err)})