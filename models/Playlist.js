
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: {
    type: Array,
  },
  description: {
    type: String,
  },
  data: {
    type: Date
  }

});

module.exports = mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);