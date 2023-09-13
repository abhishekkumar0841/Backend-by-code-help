const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

// middleware to parse json request body
app.use(express.json());

// import routes form todo api
const todoRoutes = require("./routes/todos");

// mount/add/append the todo api routes
app.use("/api/v1", todoRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server is stated on http://localhost:${PORT}`);
});

// database connection
const dbConnect = require("./config/dataBase");
dbConnect();

// default route
app.get('/', (req, res)=>{
    res.send(`<h1>This is Home Page<h1/>`)
})