
const path = require('path')
const router = require('express').Router();

//serves index
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
//route to serve animals.html
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});
//serves zoopkeepers html
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});
//serves index if error in url 
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;
