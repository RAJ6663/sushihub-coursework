require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Sushi = require('./models/Sushi');

async function seed(){
 await mongoose.connect(process.env.MONGO_URI);
 await User.deleteMany({}); await Sushi.deleteMany({});
 await User.create({ name:'Admin User', email:'admin@sushi.com', password: await bcrypt.hash('password123',10) });
 await Sushi.insertMany([
  { name:'Salmon Roll', price:12, category:'Classic', image:'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800', description:'Fresh salmon sushi roll with rice and seaweed.'},
  { name:'Spicy Tuna', price:14, category:'Spicy', image:'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800', description:'Tuna roll with spicy seasoning and premium garnish.'},
  { name:'Veggie Maki', price:9, category:'Vegetarian', image:'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800', description:'Vegetarian sushi with cucumber, avocado and rice.'}
 ]);
 console.log('Seed complete: admin@sushi.com / password123');
 process.exit();
}
seed().catch(e=>{ console.error(e); process.exit(1); });
