const express = require('express');
const router = express.Router();
const lecturers = require('../controllers/lecturers');

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Educato' });
});

/* data */
router.get('/lecturers', lecturers.getLecturers);

module.exports = router;
