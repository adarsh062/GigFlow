const Gig = require('../models/Gig');

const createGig = async (req, res) => {
  try {
    const newGig = new Gig({
      userId: req.userId, 
      ...req.body
    });
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getGigs = async (req, res) => {
  const { search } = req.query;
  const query = { status: "open" };

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  try {
    const gigs = await Gig.find(query).sort({ createdAt: -1 });
    res.status(200).json(gigs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    res.status(200).json(gig);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMyGigs = async (req, res) => {
  try {
    console.log("Fetching gigs for user:", req.userId);
    const gigs = await Gig.find({ userId: req.userId }).sort({ createdAt: -1 });
    console.log("Found gigs:", gigs.length);
    res.status(200).json(gigs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createGig, getGigs, getGig, getMyGigs };