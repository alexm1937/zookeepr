
const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');
//animal routes.js
router.use(animalRoutes);
router.use(require('./zookeeperRoutes'));

module.exports = router;