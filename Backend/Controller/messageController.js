const Message = require('../Model/messageModel');
const Community = require('../Model/communityModel');

const sendMessage = async (req, res) => {
  const { communityId, content } = req.body;
  const userId = req.user._id;

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    if (!community.members.includes(userId)) {
      return res.status(403).json({ error: 'You are not a member of this community' });
    }

    const message = await Message.create({
      community: communityId,
      sender: userId,
      content
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  const { communityId } = req.params;
  const userId = req.user._id;

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    if (!community.members.includes(userId)) {
      return res.status(403).json({ error: 'You are not a member of this community' });
    }

    const messages = await Message.find({ community: communityId })
      .sort({ timestamp: -1 })
      .limit(50)
      .populate('sender', 'username');

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages
};