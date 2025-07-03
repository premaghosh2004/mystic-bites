const express = require('express');
const router = express.Router();
const { getReservations, addReservation } = require('../controllers/reservationController');

router.get('/', getReservations);
router.post('/', addReservation);

module.exports = router;
