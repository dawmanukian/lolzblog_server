const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });

        res.json({ userId: user.id, token });
    } catch (err) {
        res.status(500).json({ message: 'error' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId, { attributes: { exclude: ['password'] } });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
