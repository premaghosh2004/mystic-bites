import { useEffect, useState } from "react";
import axios from "axios";
import "/src/index.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
        console.log("Fetched Events Data:", res.data);
        setEvents(Array.isArray(res.data) ? res.data : res.data?.data || []);
      } catch (err) {
        setError("The spirits are blocking our vision... try again at witching hour");
        console.error("Event fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="events-loading text-center p-4">
        <div className="blood-drip mb-4"></div>
        <p className="text-white">Consulting the book of the dead...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="events-error text-center p-4">
        <h3 className="text-red-600 text-xl">🧛‍♂️ Dark Omens!</h3>
        <p className="text-white mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Summon Again
        </button>
      </div>
    );
  }

  return (
    <div className="events-container px-4 sm:px-6 lg:px-8 xl:px-20 py-10 max-w-7xl mx-auto w-full">
      <div className="events-header text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-blood font-gothic mb-2">UPCOMING BLOOD MOON EVENTS</h2>
        <p className="events-subtitle italic text-white text-sm sm:text-base md:text-lg">
          "Where vampires and mortals mingle... at your own risk"
        </p>
      </div>

      {events.length === 0 ? (
        <div className="no-events text-center">
          <p className="text-white text-base sm:text-lg">The coven is resting... check back during a full moon</p>
          <div className="candle-flicker mt-4"></div>
        </div>
      ) : (
        <div className="events-grid grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {events.map((event) => (
            <div key={event._id} className="event-card bg-duskPurple text-white p-3 sm:p-4 rounded-xl shadow-vampire relative">
              <div className="event-date flex flex-col items-center justify-center text-center bg-bloodRed text-boneWhite px-2 sm:px-3 py-1 sm:py-2 rounded-md absolute top-3 sm:top-4 left-3 sm:left-4">
                <span className="event-day text-xl sm:text-2xl font-bold">{new Date(event.date).getDate()}</span>
                <span className="event-month text-xs sm:text-sm">
                  {new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                </span>
              </div>
              <div className="event-content mt-12 sm:mt-16">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{event.title}</h3>
                <div className="event-meta text-xs sm:text-sm text-fogGray mb-2">
                  <span className="block">🕷 {event.time}</span>
                  <span className="block">🩸 {event.location || "Dungeon Hall"}</span>
                </div>
                <p className="event-description mb-3 sm:mb-4 text-xs sm:text-sm">{event.description}</p>
                <button className="event-button bg-crimsonRed text-white px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-red-700 transition-all w-full text-sm sm:text-base">
                  Sign Blood Pact
                </button>
              </div>
              <div className="event-badge absolute top-3 sm:top-4 right-3 sm:right-4 bg-vampireBlack text-boneWhite text-xs px-2 sm:px-3 py-1 rounded-full">
                {event.isExclusive ? "COVEN ONLY" : "MORTALS WELCOME"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
