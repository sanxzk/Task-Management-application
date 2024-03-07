const mongoose = require("mongoose");
const { Schema } = mongoose;
const TodoSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  title:{
    type:String,
    require:true
  },
  description:{
    type:String,
  },
  priority:{
    type:Number,
    require:true,
    default:0
  },
  isCompleted:{
    type:Boolean,
    require:true,
    default:false
  },
  dueDate:{
    type:Date,
    require:true
  }
});
const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
