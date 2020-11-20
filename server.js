const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')
const app = express();


app.use(cors()) // Use this after the variable declaration
// Connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));


app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;

// Define Routes below here
app.use('/api/todos', require('./routes/api/todos'));
app.use('/api/projects', require('./routes/api/projects'));



app.listen(PORT, () => console.log(`Server started on port ${PORT}`))