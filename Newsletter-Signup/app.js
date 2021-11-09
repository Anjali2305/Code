const express= require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.listen(3000,function(){
    console.log("Listening to Port 3000")
})
app.post("/",function(req,res){
    var FirstName= req.body.FName;
    var LastName= req.body.LName;
    var email = req.body.mail;
    console.log(FirstName);
    console.log(LastName);
    console.log(email);
})