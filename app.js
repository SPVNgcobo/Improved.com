const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/userLogs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String, // Ideally, store hashed passwords
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
