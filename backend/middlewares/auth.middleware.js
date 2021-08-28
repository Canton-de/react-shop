const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') return next();
  try {
    const {authorization} = req.headers
    if( !authorization ) return next()
    const token = authorization.split(' ')[1];
    if (!token) return res.send(401, { message: 'invalid token' });
    const decoded = jwt.verify(token, config.get('secretKey'));
    req.user = decoded;
    next();
  } catch (e) {
    return res.send(401, { message: 'invalid token' });
  }
};
module.exports = authMiddleware;
