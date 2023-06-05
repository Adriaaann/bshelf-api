const mongoose = require('mongoose');

const dbConfig = process.env.MONGO_URL;

const connection = mongoose.connect(dbConfig);

module.exports = connection;