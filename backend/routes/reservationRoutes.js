const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// POST /api/reservations - Create new reservation
router.post('/', reservationController.addReservation);

// GET /api/reservations - Get all reservations
router.get('/', reservationController.getReservations);

module.exports = router;
