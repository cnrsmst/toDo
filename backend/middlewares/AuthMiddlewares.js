const jwt = require('jsonwebtoken');
const User = require('../models/User');

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Yetkilendirme başarısız.' });
  }

  try {
    const decodedToken = jwt.verify(token, 'gizliAnahtar');
    User.findById(decodedToken.userId).then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Yetkilendirme başarısız.' });
      }
      req.user = user;
      next();
    }).catch(error => {
      console.error('User lookup error:', error);
      return res.status(401).json({ error: 'Yetkilendirme başarısız.' });
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Yetkilendirme başarısız.' });
  }
}

module.exports = { authenticate };
