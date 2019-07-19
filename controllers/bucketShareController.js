const bucketShareModel = require('../models/bucketShareModel')

class BucketShareClass {
    static findAllPublic(req, res, next) {
        console.log('dari find all public bucket')
        bucketShareModel
            .find({
                status: 'public'
            })
            .then(files => {
                res.json(files)
            })
            .catch(next)
    }

    static usersBucket(req,res,next){
        let userId = req.loggedUser._id

        bucketShareModel
            .find({
                author: userId
            })
            .populate('files')
            // .populate('author')
            .then( buckets => {
                console.log(buckets)
                res.json(buckets)
            })
            .catch(next)
        
    }
    
    static findAllPrivate(req, res, next) {
        console.log('dari find all private bucket')
        let author = req.loggedUser._id

        bucketShareModel
            .find({
                status: 'private',
                author
            })
            .then(files => {
                res.json(files)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        console.log('dari dari find one by id bucket')
        let bucketId = req.params.bucketId

        bucketShareModel
            .findById(bucketId)
            .then(bucket => {
                res.json(bucket)
            })
            .catch(next)
    }

    static create(req, res, next) {
        console.log('dari create bucket')

        let newBucket = {
            bucketname: req.body.bucketname,
            status: req.body.status || 'public',
            author: req.loggedUser._id
        }
        
        bucketShareModel
            .create(newBucket)
            .then(created => {
                res.json(created)
            })
            .catch(next)
    }

    static updatefile(req, res, next) {
        console.log('dari updatefile bucket')
        console.log(req.body)
            let bucketId = req.params.bucketId
            let fileId = req.body.fileId

            bucketShareModel
                .findByIdAndUpdate(bucketId,{
                    $push : {
                        files: fileId
                    }
                },{
                    new: true
                })
                .then( updatedBucket => {
                    console.log(updatedBucket)
                    res.json(updatedBucket)
                })
                .catch(next)
        
    }

    static updatenofile(req, res, next) {
        console.log('dari update bucket')
        let bucketId = req.params.bucketId
        let {
            name,
            status
        } = req.body
        let update = {}

        if (name) {
            update.name = name
        }
        if (status) {
            update.status = status
        }

        bucketShareModel
            .findByIdAndUpdate(bucketId, update, {
                new: true
            })
            .then(foundBucket => {
                res.json(foundBucket)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        console.log('dari deleete bucket')
        let bucketId = req.params.id
        bucketShareModel
            .findOneAndDelete(bucketId)
            .then(deleted => {
                console.log(deleted, 'berhasil didelet')
                res.json(deleted)
            })
            .catch(next)
    }

    static search(req,res,next) {
        let query = req.query.search

        console.log(query)
        bucketShareModel
            .find({
                bucketname: {$regex : `.*${query}.*`}
            })
            .then(found => {
                console.log(found)
                res.json(found)
            })
            .catch(next)
    }
}

module.exports = BucketShareClass