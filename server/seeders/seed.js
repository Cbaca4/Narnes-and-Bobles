const db = require('../config/connection');
const { Profile, Product } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const productSeeds = require('./productSeeds.json');

db.once('open', async () => {
  try {
    // Clear existing profiles and products
    await Profile.deleteMany();
    await Product.deleteMany();

    // Seed profiles
    await Profile.create(profileSeeds);
    console.log('Profiles seeded successfully');

    // Seed products
    await Product.create(productSeeds);
    console.log('Products seeded successfully');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
});
