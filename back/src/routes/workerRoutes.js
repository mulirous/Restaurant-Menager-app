const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');

router.get('/', workerController.getAllWorker);
router.post('/', workerController.createWorker);
router.patch('/:id/status', workerController.updateWorkerStatus);

module.exports = router;
