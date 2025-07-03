const express = require('express');
const router = express.Router();

// FIX: Make sure both controllers are imported 👇
const { getMenu, addMenuItem } = require('../controllers/menuController');

router.get('/', getMenu);
router.post('/', addMenuItem); // This was causing the error

module.exports = router;


