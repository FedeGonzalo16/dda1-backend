const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./services/recipesService');

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Welcome to the server");
});

app.on('error', (err) => {
    console.log('Server error: ', err);
});

app.use('/api/users', userRoutes);
app.use('/api/login', authRoutes);
app.use('/api/recipes', recipeRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});