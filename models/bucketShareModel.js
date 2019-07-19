const mongoose = require('mongoose')
const Schema = mongoose.Schema

let bucketShareSchema = new Schema({
    bucketname: {
        type: String,
    },
    files: [{
        type: Schema.Types.ObjectId,
        ref: 'item'
    }],
    status: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
},{
    timestamps: true
})

let BucketShare = mongoose.model('BucketShare', bucketShareSchema)

module.exports = BucketShare