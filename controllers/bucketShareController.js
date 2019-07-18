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

    static findAllPrivate(req, res, next) {
        console.log('dari find all private bucket')
        bucketShareModel
            .find({
                status: 'private'
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
            status: status || 'public',
            author: req.loggedUser._id
        }
        console.log(req.body, req.file)
        bucketShareModel
            .create(newBucket)
            .then(created => {
                res.json(created)
            })
            .catch(next)
    }

    static updatefile(req, res, next) {
        console.log('dari update bucket')
        let bucketId = req.params.bucketId
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
        let update = {
            originalname,
            mimetype,
            cloudStorageObject,
            cloudStoragePublicUrl
        }

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
}

module.exports = BucketShareClass