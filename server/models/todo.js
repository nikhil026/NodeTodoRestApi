const mongoose=require('mongoose');
var Todo=mongoose.model('Todo',{
  text:{
    type:String,
    minlength:1,
    trim:true,
    required:null
  }
  ,
  completed:{
    type:Boolean,
    default:false
  },
  completedAt:{
  type:Number,
  default:null
  }
});
module.exports={
  Todo:Todo
};
