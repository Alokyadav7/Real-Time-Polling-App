const mongoose = require('mongoose');
const Poll = require('./models/Poll'); 
const User = require('./models/User');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const seedData = async () => {
    try {
        // Example poll data
        const polls = [
            {
                question: 'What is your favorite programming language?',
                options: [
                    { text: 'JavaScript', votes: 0 },
                    { text: 'Python', votes: 0 },
                    { text: 'Java', votes: 0 }
                ],
                comments: []
            }
        ];

      
        const users = [
            {
                username: 'Alok',
                password: '1010'
            }
        ];

        // Clear existing data
        await Poll.deleteMany({});
        await User.deleteMany({});

        // Insert new data
        await Poll.insertMany(polls);
        await User.insertMany(users);

        console.log('Data seeded successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
    }
};

seedData();
