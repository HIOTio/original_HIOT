var express = require('express');
var router = express.Router();

var deploymentController = require('../controllers/deployment.js');
router.get('/list', deploymentController.deployment_list);
router.get('/:id', deploymentController.deployment_detail);
router.post('/', deploymentController.deployment_create);
router.delete('/', deploymentController.deployment_delete);
router.put('/', deploymentController.deployment_update);



module.exports = router;
