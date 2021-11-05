
const express = require('express');
const {animals} = require('./data/animals');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const fs = require('fs');
const path = require('path');


const PORT = process.env.PORT || 3001;
const app = express();

//parse incoming string or arr data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
//makes public folder static and useable from relative file path
app.use(express.static('public'));
//tells express (ie app) to look for router exports(default index file of dir)
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);








app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});