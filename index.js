const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const db = require('./server/models');

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

require('./server/routes/exercise.routes')(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});