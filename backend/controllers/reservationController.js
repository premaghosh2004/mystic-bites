const Reservation = require('../models/Reservation');

// @desc    Create new reservation
// @route   POST /api/reservations
// @access  Public
exports.addReservation = async (req, res) => {
  try {
    const { name, phone, guests, date, time, specialRequests } = req.body;

    // Validation
    const errors = [];
    if (!name?.trim()) errors.push('Name is required');
    if (!phone?.trim()) errors.push('Phone is required');
    if (!date) errors.push('Date is required');
    if (!time) errors.push('Time is required');
    if (isNaN(guests) || guests < 1) errors.push('Valid number of guests is required');

    if (errors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors 
      });
    }

    // Create reservation
    const reservation = new Reservation({
      name: name.trim(),
      phone: phone.trim(),
      guests: Number(guests),
      date,
      time,
      specialRequests: specialRequests?.trim() || ''
    });

    await reservation.save();

    res.status(201).json({
      success: true,
      data: reservation
    });

  } catch (error) {
    console.error('Reservation creation error:', {
      body: req.body,
      error: error.message
    });
    
    res.status(500).json({ 
      error: 'Failed to create reservation',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
};

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (error) {
    console.error('Get reservations error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch reservations',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
};