const User = require("../Model/userModel");
const Community = require("../Model/communityModel");


const createCommunity = async (req, res) => {
  const { name, description} = req.body;
  const userId = req.user._id; 

    const community = await Community.create({
      name,
      description,
      creator: userId,
      admin: [userId], 
      members: [userId], 
    });

    res.status(201).json(community);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const joinCommunity = async (req, res) => {
    const userId = req.user._id; 
  
    try {
      const community = await Community.findOne({ uniqueKey });
      if (!community) {
        return res.status(404).json({ error: 'Community not found' });
      }
  
      if (community.members.includes(userId)) {
        return res.status(400).json({ error: 'You are already a member' });
      }
  
      community.members.push(userId);
      await community.save();
  
      res.status(200).json(community);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const leaveCommunity = async (req, res) => {
    const { communityId } = req.params;
    const userId = req.user._id;
  
    try {
      const community = await Community.findById(communityId);
      if (!community) {
        return res.status(404).json({ error: 'Community not found' });
      }
  
      if (!community.members.includes(userId)) {
        return res.status(400).json({ error: 'You are not a member of this community' });
      }
  
      const memberIndex = community.members.indexOf(userId);
      community.members.splice(memberIndex, 1);
      await community.save();
  
      res.status(200).json({ message: 'Successfully left the community' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {
  createCommunity,
  joinCommunity,
  leaveCommunity
};
