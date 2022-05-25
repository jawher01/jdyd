const express = require("express");
const path = require("path");
var cors = require('cors')
var bodyParser =require("body-parser")

const connectDB = require("./connectDb/bd");
const app = express();
require("dotenv").config();


// connect to DB
connectDB();



// routes
app.use(cors({origin: true, credentials: true}));
app.use(express.json( {extended:false}));
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static('cour'));
app.use('/public',express.static('public'))


app.use("/",require("./routes/User"))
app.use("/formation",require("./routes/Formation"))
app.use("/evenement",require("./routes/Evenement"))
app.use("/classe",require("./routes/Classe"))
app.use("/employer",require("./routes/Employer"))
app.use("/user/publication", require("./routes/Publication"));
app.use("/user/publication/comment", require("./routes/comment"));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", " ,content-type");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  
  next();

});
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 400;
  res.status(status);
  res.render('error');
});

const PORT = process.env.PORT ||6500;
app.listen(PORT,(err) =>
  err ? console.log(err) : console.log(`server is running on ${PORT}`)
);