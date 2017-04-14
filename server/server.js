const {ObjectID}=require('mongodb');
const bodyParser=require('body-parser');
const express=require('express');
const mongoose=require('./db/mongoose');
const Todo=require('./models/todo').Todo;
const User=require('./models/user').User;

var app=express();
const port=process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
var todo=new Todo({
    text:req.body.text
  });
    todo.save().then((doc)=>{
  res.send(doc);
    },
    (err)=>{
      res.status(400).send(err);
    });

});

app.get('/todos',(req,res)=>{
  Todo.find().then((doc)=>res.send(doc),
  (err)=>res.status(400).send(err)
);}
);

app.get('/todos/:id',(req,res)=>{
var id=req.params.id;
if(!ObjectID.isValid(id)){
  return res.status(404).send();
}
Todo.findById(id).then((todo)=>{
if(!todo){
  return res.status(404).send();
}
res.send({todo});

}).catch((e)=>{
  res.status(400).send();
})
});

app.listen(port,()=>console.log(`Port Listening at ${port}`));
