const express = require('express');
const router = express.Router();
const roomService = require('../services/roomService');

router.get('/:roomId/messages', async (req, res) => {
  const result = await roomService.getMessagesByRoomId(req.params.roomId);
  res.json(result);
});


module.exports = router;