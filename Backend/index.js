const express = require("express");
// const mongoose = require("mongoose");
const {connection} = require("./db");
require('dotenv').config();
// const bodyParser = require("body-parser")
const cors = require("cors")
const {BookRoute} = require("./routes/book.route");




const app = express();


app.use(cors())

app.use(express.json());
app.use("/book", BookRoute)

// app.get("/",(req,res)=>{
//     res.send("Welcome to Book Store");
// })

app.listen(process.env.PORT,async()=>{

try {
    await connection
    console.log("SERVER RUNNING ON PORT 8080")
} catch (error) {
    console.log("SERVER STOPPED")
}
    
})

