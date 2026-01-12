const Bid = require('../models/Bid');
const Gig = require('../models/Gig');
const mongoose = require('mongoose');

const createBid = async (req, res) => {
  try {
    const newBid = new Bid({
      freelancerId: req.userId,
      ...req.body
    });
    const savedBid = await newBid.save();
    res.status(201).json(savedBid);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBidsByGig = async (req, res) => {
  try {
    const bids = await Bid.find({ gigId: req.params.gigId });
    res.status(200).json(bids);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const hireFreelancer = async (req, res) => {
  const { bidId, gigId } = req.body;
  
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const gig = await Gig.findById(gigId).session(session);
    if (!gig || gig.status !== 'open') {
      throw new Error("Gig is already assigned or invalid!");
    }
    gig.status = 'assigned';
    await gig.save({ session });

    const winningBid = await Bid.findByIdAndUpdate(
      bidId, 
      { status: 'hired' }, 
      { session, new: true } 
    );
    await Bid.updateMany(
      { gigId: gigId, _id: { $ne: bidId } },
      { status: 'rejected' },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    const io = req.app.get('socketio');
    if (winningBid) {
      io.to(winningBid.freelancerId).emit("notification", {
        message: ` Congratulations! You have been hired for the project: "${gig.title}"`,
        gigId: gigId
      });
    }

    res.status(200).json({ message: "Freelancer hired successfully!" });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createBid, getBidsByGig, hireFreelancer };