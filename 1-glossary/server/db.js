const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them
mongoose.connect('mongodb://localhost:27017/test');

let wordSchema = mongoose.Schema({
  word: {type: String, unique: true},
  definition: String
})

let Glossary = mongoose.model('Glossary', wordSchema);

let save = (entry) => {
  return Glossary.replaceOne({word: entry.word}, entry, {upsert: true});
}

let get = (query) => {
  // Glossary.deleteMany((err) => {});

  return Glossary.find({word: {'$regex': query, '$options': 'i'}}).lean();
}

let deleteOne = (entry) => {
  return Glossary.deleteOne({word: entry.word});
}

module.exports.save = save;
module.exports.get = get;
module.exports.deleteOne = deleteOne;