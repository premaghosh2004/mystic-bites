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
      <div className="menu-loading flex flex-col items-center justify-center min-h-[50vh] px-4">
        <div className="blood-drip-animation w-12 h-12 bg-bloodRed rounded-full mb-4 animate-pulse"></div>
        <p className="text-lg text-bloodRed text-center">Summoning the menu from the crypt...</p>
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
    <div className="modern-menu-container bg-vampireBlack py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="menu-header text-center mb-8 sm:mb-12">
          <h2 className="glowing-title text-3xl sm:text-4xl md:text-5xl font-gothic text-bloodRed mb-2">
            VAMPIRE'S FEAST <span className="text-xl">🩸</span>
          </h2>
          <p className="menu-subtitle italic text-boneWhite text-sm sm:text-base">
            "We don't just serve food - we serve experiences"
          </p>
        </div>

        <div className="category-tabs flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-tab px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm md:text-base transition-all duration-300 flex items-center gap-1
                ${activeCategory === category.id 
                  ? 'bg-bloodRed text-white shadow-lg shadow-bloodRed/50' 
                  : 'bg-duskPurple text-boneWhite hover:bg-bloodRed/70 border border-bloodRed'}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="menu-section">
          {menu[activeCategory].length > 0 ? (
            <div className="animated-menu-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {menu[activeCategory].map(item => (
                <div 
                  key={item._id} 
                  className="menu-item-card bg-duskPurple/80 rounded-lg overflow-hidden shadow-lg hover:shadow-bloodRed/30 transition-all duration-300 hover:-translate-y-1 p-4"
                >
                  <h3 className="item-name text-xl font-bold text-boneWhite mb-2">{item.name}</h3>
                  <p className="item-description text-sm text-gray-300 mb-3 line-clamp-2">{item.description}</p>
                  <div className="item-meta flex justify-between items-center">
                    <span className="item-price text-bloodRed font-bold">₹{item.price}</span>
                    <span className={`item-tag text-xs px-2 py-1 rounded-full ${item.isSpicy ? 'bg-red-900/50 text-white' : 'bg-gray-700/50 text-white'}`}>
                      {item.isSpicy ? "🔥 Spicy" : "🧛 Classic"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-category text-center py-12">
              <p className="text-bloodRed text-lg mb-4">The coven hasn't prepared this course yet...</p>
              <div className="candle-animation mx-auto w-8 h-12 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 rounded-sm relative">
                <div className="flame absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-orange-500 rounded-full blur-[1px] animate-flicker"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
