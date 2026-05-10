const express = require('express');
const Sushi = require('../models/Sushi');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req,res)=> res.json(await Sushi.find().sort({ createdAt:-1 })));
router.get('/:id', auth, async (req,res)=> {
  const item = await Sushi.findById(req.params.id);
  if (!item) return res.status(404).json({message:'Item not found'});
  res.json(item);
});
router.post('/', auth, async (req,res)=>{
  const { name, price } = req.body;
  if (!name || Number(price) <= 0) return res.status(400).json({message:'Name and valid price are required'});
  res.status(201).json(await Sushi.create(req.body));
});
router.put('/:id', auth, async (req,res)=>{
  if (!req.body.name || Number(req.body.price) <= 0) return res.status(400).json({message:'Name and valid price are required'});
  const updated = await Sushi.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true });
  if (!updated) return res.status(404).json({message:'Item not found'});
  res.json(updated);
});
router.delete('/:id', auth, async (req,res)=>{
  const deleted = await Sushi.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({message:'Item not found'});
  res.json({message:'Sushi deleted'});
});
module.exports = router;
