import mongoose from 'mongoose';
import Game from './models/gameModel.js';

export async function connectDB() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected');

    // Auto-seed default games if database is empty
    try {
        const count = await Game.countDocuments();
        if (count === 0) {
            console.log('Seeding initial arcade games into MongoDB...');
            await Game.insertMany([
                {
                    title: "Cyber Racer 2099",
                    description: "High-speed arcade racing through a futuristic neon city.",
                    genre: "Racing",
                    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop",
                    iframeUrl: "https://html5.gamedistribution.com/rvvASSET210816/",
                    developer: "Cyber Studio",
                    rating: 4.8,
                    featured: true
                },
                {
                    title: "Space Defender X",
                    description: "Defend the galaxy against alien armadas in this retro space shooter.",
                    genre: "Shooter",
                    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop",
                    iframeUrl: "https://html5.gamedistribution.com/rvvASSET210816/",
                    developer: "Retro Galaxy",
                    rating: 4.6,
                    featured: true
                },
                {
                    title: "Neon Runner",
                    description: "Endless cyberpunk platformer with synthwave music and wall jumps.",
                    genre: "Action",
                    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop",
                    iframeUrl: "https://html5.gamedistribution.com/rvvASSET210816/",
                    developer: "Indie Arcades",
                    rating: 4.7,
                    featured: false
                },
                {
                    title: "Pixel Quest RPG",
                    description: "Explore dungeons, battle mythical beasts, and level up your hero.",
                    genre: "RPG",
                    thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop",
                    iframeUrl: "https://html5.gamedistribution.com/rvvASSET210816/",
                    developer: "PixelCrafters",
                    rating: 4.9,
                    featured: true
                }
            ]);
            console.log('Successfully seeded sample games into MongoDB!');
        }
    } catch (seedErr) {
        console.error('Error auto-seeding database:', seedErr);
    }
}