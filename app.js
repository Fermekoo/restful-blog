const express  = require('express');
const app      = express();
const mongoose = require('./config/database');
const cors     = require('cors');
const helmet   = require('helmet'); 

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

app.get('/api', (req, res) => {
    res.send('hello world');
});

app.use('/api/posts', require('./routes/posts'));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/category', require('./routes/category'));

const port = process.env.PORT;

app.listen(port, console.log(`server run on port ${port}`));