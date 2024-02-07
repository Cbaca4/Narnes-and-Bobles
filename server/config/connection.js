const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://David:lxHHylY0rSOpaFS3@narnes-and-bobles.ptjdzkh.mongodb.net/');

module.exports = mongoose.connection;

