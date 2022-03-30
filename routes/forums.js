var express = require('express');
var router = express.Router();

router.get('/home/allForums', function(req, res, next) {
  res.json({forums: ['forum1', 'forum2', 'forum3']});
  console.log('allForums');
});

module.exports = router;
