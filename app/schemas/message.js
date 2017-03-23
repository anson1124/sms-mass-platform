var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var MessageSchema = new Schema({
  groupid: {
    type: String,
    trim: true,
    unique: true,
  },
  detail: {
    type: String,
    trim: true,
  },
  result:{
    type: String,
    trim: true,
  },
  request_id:{
    type: String,
    trim: true,
  },
  user:{
    type: ObjectId,
    ref:'User'
  },
  meta:{
    createAt:{
      type:Date,
      default:Date.now()
    },
    updateAt:{
      type:Date,
      default:Date.now()
    }
  }
});
MessageSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now();
  }
  next()
})
MessageSchema.statics = {
  fetch:function(cb){
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById:function(id, cb){
    return this
      .findOne({
        _id:id
      })
      .exec(cb);
  }
}
module.exports = MessageSchema;