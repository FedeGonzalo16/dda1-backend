const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const notificationRoutes = require('./routes/notifications');
const ingredientRoutes = require('./routes/ingredients');
const qualificationRoutes = require('./routes/qualifications');
const prodecedureRoutes = require('./routes/procedures');
const tagsRoutes = require('./routes/tags');

const { connectDB } = require('./db/database');

dotenv.config();

const app = express();
connectDB();

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
app.use('/api/notifications', notificationRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/procedures', prodecedureRoutes);
app.use('/api/tags', tagsRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});