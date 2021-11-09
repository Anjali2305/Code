const  mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser:true});

const fruitSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true,"Name of fruit is Required!!"]
  },
  rating:{
    type:Number,
    min:1,
    max:10
  },
  review:String
});
const Fruit = mongoose.model("Fruit",fruitSchema);
const fruit = new Fruit({
   name:"Peaches",
  rating:10,
  review:"Peaches are Awsome"
});
const personSchema = new mongoose.Schema({
  name:String,
  Age:Number
});
const Person = mongoose.model("Person",personSchema);
const person = new Person({
  name:"Anjali",
  Age:21
});
//fruit.save();
//person.save();
Fruit.find(function(err,fruits){
 if(err)
 console.log(err);
 else{
   mongoose.connection.close();
 fruits.forEach(function(fruit){
   console.log(fruit.name);
 });
 }
});
Fruit.deleteMany({name:"Apple"});