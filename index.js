const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();

app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials");



app.use((req, res, next) => {
   
    console.log("Request time!");
    req.requestTime = (new Date()).toString();
    const log = `${req.requestTime} -> Method: ${req.method}; URL:${req.url}`;
    if(!req.url.includes("/socket.io/?X_LOCAL_SECURITY_COOKIE") ){
    fs.appendFile("server log", log + "\n", (err) => {
        console.log("append");
        if(err){
            console.log(err);
        }
    })
}
   // console.log(log);
    next();
})


app.get("/", (req, res) => {
    res.render("./home.hbs", {
        pageTitle: "Home page",
        welcomeMessage: "Welcome to HOME page. Take a look at our website.",
        currentYear: (new Date()).getFullYear()
    })
})

app.get("/about", (req, res) => {
    res.render("./about.hbs", {
        pageTitle: "About page",
        welcomeMessage: "Welcome to About page",
        currentYear: (new Date()).getFullYear()
    })
})

const port = process.env.PORT || 3000

app.listen(port)