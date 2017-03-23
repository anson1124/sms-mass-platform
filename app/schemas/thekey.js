var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var ThekeySchema = new Schema({
  newkey: {
    type: String,
  },
  issue: {
    type: Number,
    default: 0,
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
ThekeySchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now();
  }
  next()
})
ThekeySchema.statics = {
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
module.exports = ThekeySchema;