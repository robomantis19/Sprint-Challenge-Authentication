/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  
const { jwtSecret } = require('./secret.js');


module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if(token){
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if(error){
        res.status(401).json({ you: 'shall not pass!' });
      }else{
        console.log('decodedToken', decodedToken);
        req.user = decodedToken.user;
        next();
      }
    })
  }else{
    res.status(401).json({you: 'shall not pass'}); 
  }
  
};
