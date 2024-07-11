const express = require('express');
const { login, getUser } = require('../controllers/Auth');
const auth = require('../middleware/auth_mid');

const router = express.Router();

router.post('/login', login);
router.get('/user', auth, getUser);

module.exports = router;
