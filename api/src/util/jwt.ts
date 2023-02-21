const jwt = require('jsonwebtoken');

function generateAccessToken(user: any) {
  return jwt.sign(
    { 
      user_id: user.user_id 
    }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: '24h',
    }
  );
}

export {
  jwt,
  generateAccessToken
};