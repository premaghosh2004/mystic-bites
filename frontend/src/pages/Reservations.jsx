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
      // Convert data types before sending
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        guests: Number(form.guests),
        date: form.date,
        time: form.time,
        specialRequests: form.specialRequests.trim()
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reservations`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

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
      setError(err.response?.data?.error || "The night is dark... reservation failed. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reservation-container min-h-screen bg-gradient-to-b from-vampireBlack to-duskPurple py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="reservation-overlay bg-fogGray/10 backdrop-blur-sm border border-bloodRed/30 rounded-xl shadow-lg shadow-bloodRed/20 p-6 sm:p-8 md:p-10">
          <div className="reservation-content">
            <h2 className="text-3xl sm:text-4xl font-gothic text-bloodRed text-center mb-2">
              BOOK YOUR COFFIN TABLE <span className="text-2xl">🦇</span>
            </h2>
            <p className="text-boneWhite italic text-center mb-6 sm:mb-8">
              "We only serve after dark... reservations required"
            </p>

            {success && (
              <div className="reservation-success bg-green-900/30 border border-green-700 rounded-lg p-4 mb-6 text-green-300 text-center animate-fade-in">
                <p className="font-medium">🩸 Your table has been reserved under the blood moon!</p>
                <p className="text-sm mt-1">You'll receive a raven confirmation shortly.</p>
              </div>
            )}

            {error && (
              <div className="reservation-error bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6 text-red-300 text-center animate-fade-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="reservation-form space-y-4 sm:space-y-6">
              <div className="form-group">
                <label className="block text-boneWhite mb-1 text-sm sm:text-base">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-bloodRed/50 rounded-lg px-4 py-2 sm:py-3 text-boneWhite placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-bloodRed"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label className="block text-boneWhite mb-1 text-sm sm:text-base">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full bg-black/40 border border-bloodRed/50 rounded-lg px-4 py-2 sm:py-3 text-boneWhite placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-bloodRed"
                  placeholder="Enter your 10-digit phone number"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="form-group">
                  <label className="block text-boneWhite mb-1 text-sm sm:text-base">Number of Victims</label>
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-bloodRed/50 rounded-lg px-4 py-2 sm:py-3 text-boneWhite focus:outline-none focus:ring-1 focus:ring-bloodRed"
                  >
                    <option value="">Select</option>
                    <option value="1">1 Vampire</option>
                    <option value="2">2 Vampires</option>
                    <option value="3-4">Coven (3-4)</option>
                    <option value="5+">Full Moon Gathering (5+)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="block text-boneWhite mb-1 text-sm sm:text-base">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-black/40 border border-bloodRed/50 rounded-lg px-4 py-2 sm:py-3 text-boneWhite focus:outline-none focus:ring-1 focus:ring-bloodRed"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-boneWhite mb-1 text-sm sm:text-base">Time After Dark</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  min="18:00"
                  max="03:00"
                  className="w-full bg-black/40 border border-bloodRed/50 rounded-lg px-4 py-2 sm:py-3 text-boneWhite focus:outline-none focus:ring-1 focus:ring-bloodRed"
                />
              </div>

              <div className="form-group">
                <label className="block text-boneWhite mb-1 text-sm sm:text-base">Special Blood Requests</label>
                <textarea
                  name="specialRequests"
                  value={form.specialRequests}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-black/40 border border-bloodRed/50 rounded-lg px-4 py-2 sm:py-3 text-boneWhite placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-bloodRed"
                  placeholder="Allergies? Preferred blood type? Vampire dietary restrictions?"
                ></textarea>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`reservation-button w-full sm:w-auto px-8 py-3 rounded-lg font-medium transition-all duration-300 ${isSubmitting 
                    ? 'bg-bloodRed/70 cursor-not-allowed' 
                    : 'bg-bloodRed hover:bg-crimsonRed shadow-lg hover:shadow-bloodRed/50'}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-pulse">🩸</span> Summoning Reservation...
                    </span>
                  ) : (
                    "RESERVE YOUR COFFIN"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}