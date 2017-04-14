const {ObjectID}=require('mongodb');
const bodyParser=require('body-parser');
const _=require('lodash');
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

app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{return res.status(400).send(e);});
});


app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  var body=_.pick(req.body,['text','completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed)
     {body.completedAt=new Date().getTime();
    }
    else {
body.complted=false;
body.completed=null;
}
Todo.findByIdAndUpdate(
  id,
  {$set:body},
  {new : true}
).then((todo)=>{
  if(!todo){
  return res.send(404).send();
}
res.send({todo});})
.catch((e)=>{res.status(404).send(e);});
});

app.listen(port,()=>console.log(`Port Listening at ${port}`));
