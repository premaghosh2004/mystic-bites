const Reservation = require("../models/Reservation");

// GET all reservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    console.log("📋 All reservations fetched");
    res.status(200).json(reservations);
  } catch (error) {
    console.error("❌ Error fetching reservations:", error.message);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
};

// POST a new reservation
exports.addReservation = async (req, res) => {
  try {
    console.log("🧪 Incoming Reservation Request:", req.body);

    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();

    console.log("✅ Reservation saved to DB:", savedReservation);
    res.status(201).json({
      message: "Reservation created successfully",
      reservation: savedReservation,
    });
  } catch (error) {
    console.error("❌ Error creating reservation:", error.message);
    res.status(500).json({ error: "Failed to create reservation" });
  }
};
