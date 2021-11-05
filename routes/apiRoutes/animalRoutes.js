
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const {animals} = require('../../data/animals');
const router = require('express').Router();

//gets animals based on search 
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//gets animals based on id
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

//posts new animal
router.post('/animals', (req, res) => {
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

module.exports = router;