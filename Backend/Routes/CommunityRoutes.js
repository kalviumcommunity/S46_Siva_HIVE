const express = require('express');
const router = express.Router();

const { createCommunity, joinCommunity, leaveCommunity } = require('../Controller/communityController');

// Create community
router.post('/communities', createCommunity);

// Join community
router.post('/communities/join', joinCommunity);

// Leave community
router.delete('/communities/:communityId', leaveCommunity);

module.exports = router;
