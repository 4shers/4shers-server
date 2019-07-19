const itemModel = require('../models/item')
const bucketModel = require('../models/bucketShareModel')

class ItemController {
    static findAll(req, res, next) {
        let status = req.body.status

        itemModel
            .find({
                status
            })
            .then(result => {
                console.log(result)
                res.json(result)
            })
            .catch(next)
    }

    static search(req, res, next) {
        console.log('udah di search')
        let query = req.query.search

        console.log(query)
        itemModel
            .find({
                filename: {
                    $regex: `.*${query}.*`
                }
            })
            .then(found => {
                console.log(found)
                res.json(found)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        let itemId = req.params.itemId

        itemModel
            .findById(itemId)
            .then(result => {
                console.log(result)
                res.json(result)
            })
            .catch(next)
    }

    static create(req, res, next) {
        let {
            filename,
            bucketId,
            status
        } = req.body
        let {
            cloudStoragePublicUrl,
            mimetype
        } = req.file
        let creator = req.loggedUser._id

        let createData = {
            status,
            filename,
            bucketId,
            filepath: cloudStoragePublicUrl,
            filetype: mimetype,
            creator
        }
        // console.log(createData)
        itemModel
            .create(createData)
            .then(created => {
                return bucketModel
                    .findByIdAndUpdate(bucketId, {
                        $push: {
                            files: created._id
                        }
                    }, {
                        new: true
                    })
            })
            .then(updated => {
                console.log(updated)
                res.json(updated)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        let itemId = req.params.itemId
        // let bucketId = req.body.bucketId

        console.log(itemId, 'ini item id')

        bucketModel
            .find({
                files: {
                    $in: [itemId]
                }
            })
            .then(result => {
                console.log(result[0]._id, 'ini looggggg')
                return bucketModel
                    .findByIdAndUpdate(result[0]._id, {
                        $pull: {
                            files: itemId
                        }
                    }, {
                        new: true
                    })
            })
            .then(updated => {
                console.log(updated, 'ini id updated...')
                return itemModel
                    .findByIdAndDelete(itemId)
            })
            .then(deleted => {
                res.json({
                    message: `deleted`,
                    deleted
                })
            })
            .catch(next)
    }

}

module.exports = ItemController