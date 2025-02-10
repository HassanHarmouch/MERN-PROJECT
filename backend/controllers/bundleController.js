const Bundle = require("../models/bundleModel"); // Ensure correct model import

const getBundles = async (req, res) => {
  try {
    const bundles = await Bundle.find({});
    res.json(bundles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bundles" });
  }
};

module.exports = { getBundles };
