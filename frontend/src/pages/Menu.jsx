import { useEffect, useState } from "react";
import axios from "axios";
import "/src/index.css";


export default function Menu() {
  const [menu, setMenu] = useState({
    starters: [],
    mains: [],
    desserts: [],
    drinks: []
  });
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("starters");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/menu`);
       // ✅ CORRECT
const items = Array.isArray(res.data) ? res.data
             : Array.isArray(res.data.data) ? res.data.data
             : [];

const categorized = {
  starters: items.filter(item => item.category === "starter"),
  mains: items.filter(item => item.category === "main"),
  desserts: items.filter(item => item.category === "dessert"),
  drinks: items.filter(item => item.category === "drink")
};
console.log("Menu API response:", res.data);
        setMenu(categorized);
      } catch (err) {
        console.error("Bloody error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="menu-loading">
        <div className="blood-drip-animation"></div>
        <p>Consulting the ancient vampire cookbook...</p>
      </div>
    );
  }

  const categories = [
    { id: "starters", name: "Blood Starters", icon: "🦇" },
    { id: "mains", name: "Main Sacrifices", icon: "🔪" },
    { id: "desserts", name: "Dark Desserts", icon: "🍮" },
    { id: "drinks", name: "Vampire Elixirs", icon: "🍷" }
  ];

  return (
    <div className="modern-menu-container">
      <div className="menu-header">
        <h2 className="glowing-title">VAMPIRE'S FEAST </h2>
        <p className="menu-subtitle">"We don't just serve food - we serve experiences"</p>
      </div>

      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>

      <div className="menu-section">
        {menu[activeCategory].length > 0 ? (
          <div className="animated-menu-grid">
            {menu[activeCategory].map(item => (
              <div key={item._id} className="menu-item-card">
                <div className="item-image-wrapper">
                  <img 
                    src={item.image || "vampire-default.jpg"} 
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="blood-overlay"></div>
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-meta">
                    <span className="item-price">₹{item.price}</span>
                    <span className={`item-tag ${item.isSpicy ? 'spicy' : ''}`}>
                      {item.isSpicy ? "🔥 Bloody Hot" : "🧛 Vampire Approved"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-category">
            <p>The coven hasn't prepared this course yet...</p>
            <div className="candle-animation"></div>
          </div>
        )}
      </div>
    </div>
  );
}