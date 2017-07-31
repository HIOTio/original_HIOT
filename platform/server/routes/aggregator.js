var express = require('express');
var router = express.Router();

var aggregatorController = require('../controllers/aggregator');

router.get('/list', aggregatorController.aggregator_list);
router.get('/list/:deployment', aggregatorController.aggergator_list_for_deployment);
router.get('/:id', aggregatorController.aggregator_detail);
router.post('/', aggregatorController.aggregator_create);
router.delete('/', aggregatorController.aggregator_delete);
router.put('/', aggregatorController.aggregator_update);



module.exports = router;
