const express = require('express');
const router = express.Router();
const costumerController = require('../controllers/costumerController');

router.get('/', costumerController.getAllCostumers);
router.post('/', costumerController.createCostumer);
router.patch('/:id/status', costumerController.updateCostumerStatus);

module.exports = router;
