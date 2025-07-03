const Menu = require('../models/MenuItem');

exports.getMenu = async (req, res) => {
  const items = await Menu.find();
  res.json(items);
};

exports.addMenuItem = async (req, res) => {
  try {
    const newItem = new Menu(req.body);
    await newItem.save();
    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    console.error("❌ Error adding item:", error);
    res.status(500).json({ error: "Failed to add menu item" });
  }
};
