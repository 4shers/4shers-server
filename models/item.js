const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  filename:  {
    type : String,
    required : [true, `Please Provide Name for This File`],
  },
  filePath: {
    type : String,
    required : [true, `Please Provide File`]
  },
  creator: { 
    type : Schema.Types.ObjectId,
    ref : 'user'
  },
  bucket : {
    type : Schema.Types.ObjectId,
    ref : 'BucketShare'
  },
}, {
  versionKey : false,
  timestamps : true
});

let Item = mongoose.model('item', itemSchema)

module.exports = Item
