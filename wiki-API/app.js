const express= require("express");
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose");


const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static("public"));
app.listen(3000,function(req,res){
    console.log("listening to Port 3000!!")
});

mongoose.connect ("mongodb://localhost:27017/wikiDB");
const articleSchema = new  mongoose.Schema({
    title:String,
    content : String
});
const Article = mongoose.model("Article", articleSchema);


/////////////////////Request Targeting All Articles////////////////////////////////////////

app.route("/articles")

.get(function(req,res){
    Article.find(function(err,foundArticles){
        if(err)
        console.log(err)
        else{
            console.log(foundArticles);
            res.send(foundArticles);
        }
    });
})

.post(function(req,res){

        const newArticle = new Article   ({
            title: req.body.title,
            content:req.body.content
        });   
        
       newArticle.save(function(err){
           if(err)
           res.send(err)
           else
           res.send("Successfully added New Article");
       });

})

.delete(function(req,res){
        Article.deleteMany({},function(err){
            if(err)
            {
                res.send(err)
            }
         
            else{
                res.send("Successfully Deleted all Articles.!!!");
            }
        });
});


/////////////////////Request Targeting Specific Articles////////////////////////////////////////


app.route("/articles/:articleTitle")

// req.params.articleTitle="jQuery"

.get(function(req,res){
 Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
     if(foundArticle){
         res.send(foundArticle)
     }
     else{
         res.send("No Article found of that title");
     }
 })
})
.put(function(req,res){
    Article.findOneAndUpdate(
        {title:req.params.articleTitle},
        {title:req.body.title, content:req.body.content},
        {overwrite:true},
        function(err){
         if(!err){
             res.send("Successfully Updated Article");
         }
    })
})

.patch(function(req,res){
    Article.findOneAndUpdate(
        {title:req.params.articleTitle},
        {$set:req.body},
        
        function(err){
         if(!err){
             res.send("Successfully Updated Article");
         }
    })
})
.delete(function(req,res){
    Article.deleteOne({title:req.params.articleTitle},function(err){
        if(err)
        {
            res.send(err)
        }
     
        else{
            res.send("Successfully Deleted Articles.!!!");
        }
    });
});