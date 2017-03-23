var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var MsgtemplateSchema = new Schema({
  meeting: {
    type: String,
  },
  starttime: {
    type: String,
  },
  place: {
    type: String,
  },
  user:{
    type: ObjectId,
    ref:'User'
  },
  smstemplate:{
    type: ObjectId,
    ref:'Smstemplate'
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
MsgtemplateSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now();
  }
  next()
})
MsgtemplateSchema.statics = {
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
module.exports = MsgtemplateSchema;