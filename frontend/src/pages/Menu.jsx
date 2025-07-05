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
      <div className="menu-loading text-center py-8 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="blood-drip-animation mb-4"></div>
        <p className="text-lg md:text-xl text-bloodRed">Consulting the ancient vampire cookbook...</p>
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
    <div className="modern-menu-container px-4 sm:px-6 md:px-12 lg:px-24 py-8">
      <div className="menu-header text-center mb-10">
        <h2 className="glowing-title text-3xl sm:text-4xl md:text-5xl font-gothic text-bloodRed">VAMPIRE'S FEAST</h2>
        <p className="menu-subtitle italic text-base sm:text-lg text-fogGray mt-2">
          "We don't just serve food - we serve experiences"
        </p>
      </div>

      <div className="category-tabs flex flex-wrap justify-center gap-3 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab px-4 py-2 border border-bloodRed text-white rounded-lg transition duration-300 hover:bg-bloodRed ${activeCategory === category.id ? 'bg-bloodRed' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>

      <div className="menu-section">
        {menu[activeCategory].length > 0 ? (
          <div className="animated-menu-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {menu[activeCategory].map(item => (
              <div key={item._id} className="menu-item-card bg-fogGray p-4 rounded-xl shadow-vampire relative overflow-hidden">
                <div className="item-image-wrapper mb-4 relative h-48 sm:h-56 md:h-64">
                  <img 
                    src={item.image || "vampire-default.jpg"} 
                    alt={item.name}
                    className="item-image w-full h-full object-cover rounded-lg"
                  />
                  <div className="blood-overlay absolute inset-0 bg-bloodRed opacity-10 rounded-lg"></div>
                </div>
                <div className="item-details">
                  <h3 className="item-name text-xl font-bold text-boneWhite mb-2">{item.name}</h3>
                  <p className="item-description text-sm text-boneWhite mb-2">{item.description}</p>
                  <div className="item-meta flex justify-between items-center">
                    <span className="item-price text-crimsonRed font-semibold">₹{item.price}</span>
                    <span className={`item-tag text-xs px-2 py-1 rounded ${item.isSpicy ? 'bg-red-700 text-white' : 'bg-gray-700 text-white'}`}>
                      {item.isSpicy ? "🔥 Bloody Hot" : "🧛 Vampire Approved"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-category text-center mt-8">
            <p className="text-bloodRed text-lg">The coven hasn't prepared this course yet...</p>
            <div className="candle-animation mt-4"></div>
          </div>
        )}
      </div>
    </div>
  );
}
