const mongoose = require('mongoose');
const courses = require('./routes/courses');
const consumers = require('./routes/consumers');
const home = require('./routes/home')
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/courses_api', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))


app.use(express.json());
app.use('/api/courses', courses);
app.use('/api/consumers', consumers)


// PORT
const port = process.env.PORT || 5500;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
