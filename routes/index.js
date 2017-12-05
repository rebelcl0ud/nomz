const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
	// console.log('testing');
	const jo = { name: 'jo', age: 50, awesome: true };
  // res.send('Hey! It works!');
  // res.json(jo);
  // res.send(req.query.name);
  // res.json(req.query);
  res.render('hello', {
  	name: 'jo',
  	dog: 'enigma',
  	title: 'nomz'
  });
});

router.get('/reverse/:name', (req, res) => {
	const reverse = [...req.params.name].reverse().join('');
	res.send(reverse);
});

module.exports = router;
