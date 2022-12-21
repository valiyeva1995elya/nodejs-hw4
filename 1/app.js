const express = require("express");
const bodYPaser = require("body-parser");
const usersRouter = require("./routers/usersRouter");
const carsRouter = require("./routers/carsRouter");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodYPaser.json()); //post
app.use(bodYPaser.urlencoded({extended: false})); //get
 
//
app.use("/users", (req, res, next) => {
    console.log("Middleware");
    next();
})

app.use("/users", usersRouter);
app.use("/cars", carsRouter);



app.listen(8080, () => {
    console.log("Server started");
});