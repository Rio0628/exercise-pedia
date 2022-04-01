const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const db = require('./server/models');
const buildPath = path.join(__dirname, 'build');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(buildPath));
    app.get('/', (req, res) => { res.sendFile(path.resolve(buildPath, 'index.html')) });
} else { 
    app.get('/', (req, res) => { res.json({ message: 'Hello World!' }) });
}

db.sequelize.sync();

require('./server/routes/exercise.routes')(app);
require('./server/routes/category.routes')(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});