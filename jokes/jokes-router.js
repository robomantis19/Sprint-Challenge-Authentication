const axios = require('axios');

const router = require('express').Router();
const restricted = require('../auth/authenticate-middleware');


router.get('/', restricted,  (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      console.log('response', response)
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      console.log('err in get', err)
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
});

module.exports = router;
