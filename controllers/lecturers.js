const data = require('../mock/db.json');

// returns the list of lecturers
exports.getLecturers = function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.json({
        "status": "ok",
        "data": data
    })
};
