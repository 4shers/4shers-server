const bucketShareModel = require('../models/bucketShareModel')

class BucketShareClass {
    static findAll(req, res, next) {

        bucketShareModel
            .find({
                status: 'public'
            })
            .then(files => {
                res.json(files)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        let bucketId = req.params.bucketId

        bucketShareModel
            .findById(bucketId)
            .then(bucket => {
                res.json(bucket)
            })
            .catch(next)
    }

    static create(req, res, next) {
        let {
            name,
            status
        } = req.body
        let {
            originalname,
            mimetype,
            cloudStorageObject,
            cloudStoragePublicUrl
        } = req.file

        let newBucket = {
            name,
            files: {
                originalname,
                mimetype,
                cloudStorageObject,
                cloudStoragePublicUrl
            },
            status: status || 'public'
        }
        console.log(req.body, req.file)
        bucketShareModel
            .create(newBucket)
            .then(res.json(newBucket))
            .catch(next)
    }

    static update(req, res, next) {
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
        let bucketId = req.params.id

        bucketShareModel
            .findOneAndDelete(bucketId)
            .then(deleted => {
                res.json(deleted)
            })
            .catch(next)
    }
}

module.exports = BucketShareClass