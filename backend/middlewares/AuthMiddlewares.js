const jwt = require('jsonwebtoken');

// function authenticate(req, res, next) {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ error: 'Yetkilendirme başarısız.' });
//   }

//   try {
//     const decodedToken = jwt.verify(token, 'gizliAnahtar');
//     req.userData = { username: decodedToken.username, userId: decodedToken.userId };
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ error: 'Yetkilendirme başarısız.' });
//   }
// }


function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Yetkilendirme başarısız.' });
  }

  try {
    const decodedToken = jwt.verify(token, 'gizliAnahtar');
    req.userData = { username: decodedToken.username, userId: decodedToken.userId };
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Yetkilendirme başarısız.' });
  }
}

module.exports = { authenticate };