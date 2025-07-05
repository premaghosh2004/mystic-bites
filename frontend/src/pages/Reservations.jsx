import { useState } from "react";
import axios from "axios";
import "/src/index.css";

export default function Reservations() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    guests: "",
    date: "",
    time: "",
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/reservations`, form);
      console.log("✅ Reservation successful:", response.data);

      setSuccess(true);
      setForm({
        name: "",
        phone: "",
        guests: "",
        date: "",
        time: "",
        specialRequests: "",
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("❌ Reservation error:", err.response?.data || err.message);
      setError("The night is dark... reservation failed. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reservation-container px-4 md:px-8 py-10">
      <div className="reservation-overlay max-w-3xl mx-auto bg-fogGray bg-opacity-20 backdrop-blur-md p-6 md:p-10 rounded-lg shadow-vampire">
        <div className="reservation-content">
          <h2 className="gothic text-3xl md:text-4xl text-blood text-center">BOOK YOUR COFFIN TABLE 🦇</h2>
          <p className="reservation-subtitle italic text-white text-center mt-2 mb-6">
            "We only serve after dark... reservations required"
          </p>

          {success && (
            <div className="reservation-success text-green-400 mt-4 text-center">
              <p>🩸 Your table has been reserved under the blood moon!</p>
              <p>You'll receive a raven confirmation shortly.</p>
            </div>
          )}

          {error && <div className="reservation-error text-red-400 mt-4 text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="reservation-form space-y-6 mt-6">
            <div className="form-group">
              <label className="text-white">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="form-input w-full"
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label className="text-white">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="form-input w-full"
                placeholder="Enter your 10-digit phone number"
              />
            </div>

            <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="text-white">Number of Victims</label>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  required
                  className="form-input w-full"
                >
                  <option value="">Select</option>
                  <option value="1">1 Vampire</option>
                  <option value="2">2 Vampires</option>
                  <option value="3">Coven (3-4)</option>
                  <option value="5">Full Moon Gathering (5+)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="text-white">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="form-input w-full"
                />
              </div>

              <div className="form-group md:col-span-2">
                <label className="text-white">Time After Dark</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="form-input w-full"
                  min="18:00"
                  max="03:00"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="text-white">Special Blood Requests</label>
              <textarea
                name="specialRequests"
                value={form.specialRequests}
                onChange={handleChange}
                className="form-input w-full"
                placeholder="Allergies? Preferred blood type? Vampire dietary restrictions?"
                rows="4"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="reservation-button bg-blood text-white py-3 px-6 rounded-lg mt-4 hover:bg-red-800 transition-all w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <span className="animate-pulse text-sm">🩸 Summoning Server...</span>
                ) : (
                  "RESERVE YOUR COFFIN"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


