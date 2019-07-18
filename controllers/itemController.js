const itemModel = require('../models/item')

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
                console.log(created)
                res.json(created)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        let itemId = req.params.itemId

        itemModel
            .findByIdAndDelete(itemId)
            .then(deleted => {
                console.log(deleted)
                res.json({
                    data: deleted,
                    message: 'deleted data' + deleted.filename + 'with id' + deleted._id
                })
            })
            .catch(next)
    }

}

module.exports = ItemController