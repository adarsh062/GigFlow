const Bid = require('../models/Bid');
const Gig = require('../models/Gig');
const mongoose = require('mongoose');

// 1. Place a Bid
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

// 2. Get Bids for a Gig
const getBidsByGig = async (req, res) => {
  try {
    const bids = await Bid.find({ gigId: req.params.gigId });
    res.status(200).json(bids);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. HIRE FREELANCER (ATOMIC TRANSACTION + SOCKET NOTIFICATION)
const hireFreelancer = async (req, res) => {
  const { bidId, gigId } = req.body;
  
  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // A. Check if Gig is still open (Locked inside session)
    const gig = await Gig.findById(gigId).session(session);
    if (!gig || gig.status !== 'open') {
      throw new Error("Gig is already assigned or invalid!");
    }

    // B. Update Gig Status to Assigned
    gig.status = 'assigned';
    await gig.save({ session });

    // C. Update Winning Bid Status (and return the doc with new: true)
    const winningBid = await Bid.findByIdAndUpdate(
      bidId, 
      { status: 'hired' }, 
      { session, new: true } 
    );

    // D. Reject all other bids for this gig
    await Bid.updateMany(
      { gigId: gigId, _id: { $ne: bidId } },
      { status: 'rejected' },
      { session }
    );

    // Commit Transaction
    await session.commitTransaction();
    session.endSession();

    // --- SOCKET IO NOTIFICATION LOGIC ---
    // Only runs if transaction succeeds
    const io = req.app.get('socketio');
    
    if (winningBid) {
      // Send real-time alert to the specific freelancer
      io.to(winningBid.freelancerId).emit("notification", {
        message: `🎉 Congratulations! You have been hired for the project: "${gig.title}"`,
        gigId: gigId
      });
    }

    res.status(200).json({ message: "Freelancer hired successfully!" });

  } catch (err) {
    // Abort Transaction on error
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createBid, getBidsByGig, hireFreelancer };