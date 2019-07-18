const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ItemSchema = new Schema({
    name: {
        type: String,
    },
    bucketId: {
        type: Schema.Types.ObjectId,
        ref: 'BucketShare'
    },
    status: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

let Item = mongoose.model('Item', ItemSchema)

module.exports = Item