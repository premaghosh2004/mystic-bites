import { useEffect, useState } from "react";
import axios from "axios";
import "/src/index.css"; // Make sure to import your CSS

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
      <div className="events-loading">
        <div className="blood-drip"></div>
        <p>Consulting the book of the dead...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="events-error">
        <h3>🧛‍♂️ Dark Omens!</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Summon Again
        </button>
      </div>
    );
  }

  return (
    <div className="events-container">
      <div className="events-header">
        <h2>UPCOMING BLOOD MOON EVENTS</h2>
        <p className="events-subtitle">"Where vampires and mortals mingle... at your own risk"</p>
      </div>

      {events.length === 0 ? (
        <div className="no-events">
          <p>The coven is resting... check back during a full moon</p>
          <div className="candle-flicker"></div>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <div className="event-date">
                <span className="event-day">{new Date(event.date).getDate()}</span>
                <span className="event-month">
                  {new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                </span>
              </div>
              <div className="event-content">
                <h3>{event.title}</h3>
                <div className="event-meta">
                  <span>🕷 {event.time}</span>
                  <span>🩸 {event.location || "Dungeon Hall"}</span>
                </div>
                <p className="event-description">{event.description}</p>
                <button className="event-button">
                  Sign Blood Pact
                </button>
              </div>
              <div className="event-badge">
                {event.isExclusive ? "COVEN ONLY" : "MORTALS WELCOME"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
