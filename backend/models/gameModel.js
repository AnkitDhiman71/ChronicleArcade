import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    iframeUrl: {
      type: String,
      required: true,
    },
    developer: {
      type: String,
      default: 'Indie Arcade',
    },
    releaseDate: {
      type: String,
      default: '2024',
    },
    controls: {
      type: String,
      default: 'Arrow Keys / Mouse / Touch',
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;
