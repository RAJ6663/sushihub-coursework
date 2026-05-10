const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req,res)=>{
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) return res.status(400).json({message:'Valid name, email and 6 character password required'});
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({message:'User already exists'});
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
  res.status(201).json({ id:user._id, email:user.email });
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({message:'Invalid login details'});
  const token = jwt.sign({ id:user._id, email:user.email }, process.env.JWT_SECRET, { expiresIn:'1d' });
  res.json({ token, user:{ id:user._id, name:user.name, email:user.email } });
});
module.exports = router;
