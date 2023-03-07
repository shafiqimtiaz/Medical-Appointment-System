const jwt = require('jsonwebtoken');

function generateAccessToken(user: any) {
  return jwt.sign(
    { 
      user_id: user.user_id,
      email: user.email,
      role: user.role
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