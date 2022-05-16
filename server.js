const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log("MongoDB Database connected")
})

const confessions = require("./routes/confessions");

app.use("/confession", confessions);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.resolve(__dirname, "./client/build")))
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}

app.listen(port, () =>{
  console.log(`Server is running on port: ${port}`)
})