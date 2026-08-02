import Game from '../models/gameModel.js';

export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    const formattedGames = games.map((g) => ({
      id: g._id.toString(),
      _id: g._id.toString(),
      title: g.title,
      description: g.description,
      short_description: g.description,
      genre: g.genre,
      thumbnail: g.thumbnail,
      iframeUrl: g.iframeUrl,
      game_url: g.iframeUrl,
      developer: g.developer,
      release_date: g.releaseDate,
      controls: g.controls,
      rating: g.rating,
      featured: g.featured,
    }));
    res.status(200).json(formattedGames);
  } catch (error) {
    console.error('Error in getAllGames:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    let game = null;

    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      game = await Game.findById(id);
    }

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    const formattedGame = {
      id: game._id.toString(),
      _id: game._id.toString(),
      title: game.title,
      description: game.description,
      short_description: game.description,
      genre: game.genre,
      thumbnail: game.thumbnail,
      iframeUrl: game.iframeUrl,
      game_url: game.iframeUrl,
      developer: game.developer,
      release_date: game.releaseDate || '2024',
      publisher: game.developer || 'Chronicle Arcade',
      platform: 'Web Browser (Iframe)',
      controls: game.controls,
      rating: game.rating,
    };

    res.status(200).json(formattedGame);
  } catch (error) {
    console.error('Error in getGameById:', error);
    res.status(500).json({ message: error.message });
  }
};

export const createGame = async (req, res) => {
  try {
    const { title, description, genre, thumbnail, iframeUrl, developer, releaseDate, controls, rating, featured } = req.body;
    if (!title || !iframeUrl || !thumbnail) {
      return res.status(400).json({ message: 'Title, Thumbnail and Iframe URL are required.' });
    }

    const newGame = new Game({
      title,
      description: description || 'Custom Arcade Game',
      genre: genre || 'Arcade',
      thumbnail,
      iframeUrl,
      developer: developer || 'Indie Developer',
      releaseDate: releaseDate || '2024',
      controls: controls || 'Touch / Keyboard / Mouse',
      rating: rating !== undefined && rating !== '' ? Number(rating) : 4.5,
      featured: Boolean(featured),
    });

    await newGame.save();
    res.status(201).json({ message: 'Game added successfully', game: newGame });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to add game' });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid Game ID format' });
    }
    const game = await Game.findByIdAndDelete(id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json({ message: 'Game deleted successfully', game });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to delete game' });
  }
};
