const router = require('express').Router();
const Users = require('./auth-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./secret.js');
const restricted = require('./authenticate-middleware.js')


router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password  = hash; 

  Users.add(user)
  .then(saved => { 
    res.status(201).json(saved); 
  })
  .catch(err => { 
    console.log('error in register: ', err); 
    res.status(500).json({errorMessage:'error in register', error: err})
  })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  Users.findBy({username})
  .then(user => { 
    console.log('user', user )
    if(user &&  bcrypt.hashSync(password, username.password)){
      const token = signToken(user)
      console.log('token', token); 
      res.status(200).json(token); 
    }else{
      res.status(401).json({you: 'shall not pass!'})
    }
  })
  .catch(error => { 
    console.log('error: ', error)
    res.status(500).json(error)
  })
 

});
router.get('/users', restricted,  (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  Users.find()
    .then(response => {
      console.log('response', response)
      res.status(200).json(response);
    })
    .catch(err => {
      console.log('err in get', err)
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
});
function signToken(user){
  payload = {
    user
  }
  const options = {
    expiresIn : '1d'
  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
