const router = require('express').Router();

router.get('/testing', function (req, res) {
  res.end('Hello World')
});

module.exports = router
