const express = require('express');
const router = express.Router();
const { getEvents, addEvent } = require('../controllers/eventController');

router.get('/', getEvents);
router.post('/', addEvent);

module.exports = router;
