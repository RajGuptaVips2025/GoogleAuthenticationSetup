const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;
const authRouter = require('./routes/authRouter');
require('./models/dbConnection')
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello From Auth Server");
})

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})