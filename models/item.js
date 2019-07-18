const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  filename:  {
    type : String,
    required : [true, `Please Provide Name for This File`],
  },
  filepath: {
    type : String,
    required : [true, `Please Provide File`]
  },
  filetype: {
    type: String,
    required: [true, `file type needed`]
  },
  creator: { 
    type : Schema.Types.ObjectId,
    ref : 'user'
  },
  bucketId : {
    type : Schema.Types.ObjectId,
    ref : 'BucketShare'
  },
  status: {
    type:  String,
    default: 'public'
  }
}, {
  timestamps : true
});

let Item = mongoose.model('item', itemSchema)

module.exports = Item
