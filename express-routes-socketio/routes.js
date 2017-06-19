const router = require('express').Router();
const path = require('path');

router.get('/cubs', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/cubs.html'));
});

router.get('/bears', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/bears.html'));
});

module.exports = router;