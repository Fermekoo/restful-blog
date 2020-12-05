const express  = require('express');
const app      = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors      = require('cors');

require('dotenv/config');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.send('hello world');
});

app.use('/api/posts', require('./routes/posts'));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/category', require('./routes/category'));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, console.log('server run'));