const User = require("../Model/userModel");
const Community = require("../Model/communityModel");

const createCommunity = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id; 

  try {
    const community = await Community.create({
      name,
      description,
      creator: userId,
      admin: [userId], 
      members: [userId]
    });

    res.status(201).json(community);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const requestToJoinCommunity = async (req, res) => {
  const { communityId } = req.params;
  const userId = req.user._id; 

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    if (community.members.includes(userId)) {
      return res.status(400).json({ error: 'You are already a member' });
    }

    const existingRequest = community.joinRequests.find(request => request.user.toString() === userId.toString());
    if (existingRequest) {
      return res.status(400).json({ error: 'You have already requested to join this community' });
    }

    community.joinRequests.push({ user: userId });
    await community.save();

    res.status(200).json({ message: 'Join request sent successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const approveJoinRequest = async (req, res) => {
  const { communityId, userId } = req.params;
  const adminId = req.user._id;

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    if (!community.admin.includes(adminId)) {
      return res.status(403).json({ error: 'You do not have permission to approve requests' });
    }

    const joinRequest = community.joinRequests.find(request => request.user.toString() === userId && request.status === 'pending');
    if (!joinRequest) {
      return res.status(404).json({ error: 'Join request not found' });
    }

    joinRequest.status = 'approved';
    community.members.push(userId);
    await community.save();

    res.status(200).json({ message: 'Join request approved successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCommunity,
  requestToJoinCommunity,
  approveJoinRequest
};