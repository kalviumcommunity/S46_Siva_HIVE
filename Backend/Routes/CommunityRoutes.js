const express = require('express');
const router = express.Router();
const { 
  createCommunity, 
  requestToJoinCommunity, 
  approveJoinRequest, 
  leaveCommunity,
  getCommunityDescription,
  updateCommunityDescription
} = require('../Controller/communityController');
const auth = require('../Middleware/auth');

router.post('/', auth, createCommunity);
router.post('/:communityId/join', auth, requestToJoinCommunity);
router.post('/:communityId/approve/:username', auth, approveJoinRequest);
router.get('/:communityId/description', auth, getCommunityDescription);
router.delete('/:communityId', auth, leaveCommunity);
router.put('/:communityId/description', auth, updateCommunityDescription);

module.exports = router;