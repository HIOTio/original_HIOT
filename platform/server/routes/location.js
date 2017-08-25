var express = require('express')
var router = express.Router()
var locationController = require('../controllers/location')
router.get('/', locationController.location_list)
router.get('/:id', locationController.location_detail)
router.post('/', locationController.location_create)
router.delete('/', locationController.location_delete)
router.put('/', locationController.location_update)
module.exports = router
