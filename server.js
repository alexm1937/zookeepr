
const express = require('express');
const {animals} = require('./data/animals');
const fs = require('fs');
const path = require('path');


const PORT = process.env.PORT || 3001;
const app = express();

//parse incoming string or arr data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
//allows use of items in /asset?
app.use(express.static('public'));


function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        //saves personality traits as dedicated array
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        //loop thru each trait in personalityTraitsArray
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter( 
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}

function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;
}
//gets animals based on search 
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});
//gets animals based on id
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});
//posts new animal
app.post('/api/animals', (req, res) => {
    //set id based on next index of arr
    req.body.id = animals.length.toString();
    //if any data is invalid send err400
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        //add animal to json file & animals arr
        const animal = createNewAnimal(req.body, animals);
        res.json(req.body);
    }
});
//serves index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
//route to serve animals.html
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});
//serves zoopkeepers html
app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});
//serves index if error in url 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });





app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});