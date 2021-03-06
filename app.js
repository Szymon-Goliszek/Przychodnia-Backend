const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const pacjentRoutes = require("./api/routes/pacjenci");
const wizytaRoutes = require("./api/routes/wizyta");
const userRoutes = require("./api/routes/users"); 

mongoose.connect("mongodb+srv://Przychodnia:"+process.env.MONGO_PASSWORD+"@sgcluster-vhbpl.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/pacjenci", pacjentRoutes);
app.use("/wizyta", wizytaRoutes);
app.use("/users", userRoutes);

app.use((req,res,next)=>{
    const error = new Error("Not found.");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});

module.exports = app;