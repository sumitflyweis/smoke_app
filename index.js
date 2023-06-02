const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//const multer = require("multer");
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyparser = require("body-parser");

const serverless = require("serverless-http");

// const auth = require("./src/route/auth")


require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 2006;

mongoose
  .connect("mongodb+srv://SMOKE_:y6osGJH0KyVRkLpU@smoke.m3ou369.mongodb.net/")
  .then(() => {
    console.log("Db conneted succesfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/home",(req, res) => {
  res.status(200).send({msg:"Working App"});
});

 app.use("/api/v1/",require("./route/login"));
 app.use("/api/v1/city" ,require("./route/city"))
 app.use("/api/v1/state",require("./route/state"))
 app.use("/api/v1/district",require("./route/district"))
 app.use("/api/v1/contact",require("./route/contactlist"))
 app.use("/api/v1/question",require("./route/questionAnswer"))
 app.use("/api/v1/location",require("./route/locationOfCollege"))
 app.use("/api/v1/postt",require("./route/post"))
 app.use("/api/v1/request",require("./route/add_request"))
 app.use("/api/v1/activityy",require("./route/activity"))
 app.use("/api/v1/subscriptionn",require("./route/subscription"))
//  app.use("/api/v1/inboxx",require("./route/inbox"))
//  app.use("/api/v1/shuffle",require("./route/shuffle"))


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = {
  handler: serverless(app),
};

