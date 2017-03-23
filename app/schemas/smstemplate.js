var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var SmstemplateSchema = new Schema({
  sms_type: {
    type: String,
    defalut: 'normal',
  },
  sms_free_sign_name: {
    type: String,
  },
  sms_template_code: {
    type: String,
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
SmstemplateSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now();
  }
  next()
})
SmstemplateSchema.statics = {
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
module.exports = SmstemplateSchema;
//db.smstemplates.insert({sms_type:'normal',sms_free_sign_name:'柠檬工作室',sms_template_code:'SMS_56640089',meta:{createAt: ISODate("2017-03-21T05:34:18.661Z"),  updateAt : ISODate("2017-03-21T05:34:18.661Z")}})