const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

sequelize.sync().then(result => {
    app.listen(PORT, () => {
        console.log(`port ${PORT}`);
    });
}).catch(err => {
    console.error(err);
});