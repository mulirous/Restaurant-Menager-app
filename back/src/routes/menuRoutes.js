const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/', menuController.getAllMenu);
router.post('/', menuController.createMenu);
router.patch('/:id/status', menuController.updateMenuStatus);

module.exports = router;
