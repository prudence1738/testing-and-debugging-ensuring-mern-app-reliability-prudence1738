const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'User exists' });
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
