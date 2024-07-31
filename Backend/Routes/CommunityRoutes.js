const express = require('express');
const router = express.Router();
const { 
  createCommunity, 
  requestToJoinCommunity, 
  approveJoinRequest, 
  leaveCommunity,
  updateCommunityDescription
} = require('../Controller/communityController');
const auth = require('../Middleware/auth');

router.post('/', auth, createCommunity);
router.post('/:communityId/join', auth, requestToJoinCommunity);
router.post('/:communityId/approve/:userId', auth, approveJoinRequest);
router.delete('/:communityId', auth, leaveCommunity);
router.put('/:communityId/description', auth, updateCommunityDescription);

module.exports = router;