const Poll = require('../models/Poll');

module.exports = (app, io) => {
    // Create a new poll
    app.post('/api/polls', async (req, res) => {
        try {
            const poll = new Poll(req.body);
            await poll.save();
            res.json(poll);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    // Get all polls
    app.get('/api/polls', async (req, res) => {
        try {
            const polls = await Poll.find();
            res.json(polls);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    // Vote on a poll
    app.post('/api/polls/:id/vote', async (req, res) => {
        try {
            const poll = await Poll.findById(req.params.id);
            const option = poll.options.id(req.body.optionId);
            if (option) {
                option.votes += 1;
                await poll.save();
                io.emit('pollUpdated', poll);
                res.json(poll);
            } else {
                res.status(404).send('Option not found');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    // Add a comment to a poll
    app.post('/api/polls/:id/comment', async (req, res) => {
        try {
            const poll = await Poll.findById(req.params.id);
            if (poll) {
                poll.comments.push(req.body);
                await poll.save();
                io.emit('pollUpdated', poll);
                res.json(poll);
            } else {
                res.status(404).send('Poll not found');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    // Delete a poll
    app.delete('/api/polls/:id', async (req, res) => {
        try {
            await Poll.findByIdAndDelete(req.params.id);
            res.json({ message: 'Poll deleted' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    });
};
