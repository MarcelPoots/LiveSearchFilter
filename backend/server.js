const express = require('express');
const mongoose = require('mongoose');
//DATA
const fruits = require('./data/fruits');
const Fruit = require('./fruits');
var cors = require('cors');

mongoose.connect('mongodb://localhost/fruits', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', async () => {
    console.log('Connected to MongoDB Successfully');
    if(await Fruit.countDocuments().exec() > 0) return;
    let submitFruits = [];
    fruits.forEach(fruit => {
        submitFruits.push({name: fruit});
    });
    Fruit.insertMany(submitFruits, err => {
        if(err) return console.log(err);
        console.log('SUCCESS');
    });
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// use it before all route definitions
app.use(cors({origin: ['http://localhost:4200', 'http://127.0.0.1:4200']}));


app.post('/api/search', async (req, res) => {
    let search = req.body.search;
    console.log('api called with [' + search + ']' )
    let find = await Fruit.find({name: {$regex: new RegExp('.*'+search+'.*','i')}}).limit(10).exec();
    console.log(find.length);

    res.send({payload: find});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on PORT ' + port));