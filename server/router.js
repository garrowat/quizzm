const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Main screen turn on');
});

module.exports = router;