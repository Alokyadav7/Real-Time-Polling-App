const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const Poll = require('../models/Poll');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.get('/profile', ensureAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('createdPolls').populate('votedPolls');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.post('/profile/picture', ensureAuth, upload.single('profilePicture'), async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.profilePicture = req.file.path;
        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
