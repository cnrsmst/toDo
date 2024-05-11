const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { authenticate } = require('../middlewares/AuthMiddlewares');
const app = express()

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Kullanıcı kaydı
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Bir hata oluştu.' });
  }
});

// Kullanıcı girişi
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Hatalı şifre.' });
    }

    const token = jwt.sign({ username: user.username, userId: user._id }, 'gizliAnahtar', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Bir hata oluştu.' });
  }
});

// router.post('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error('Oturumu sonlandırırken bir hata oluştu:', err);
//       res.status(500).json({ error: 'Sunucu hatası' });
//     } else {
//       res.json({ message: 'Oturumunuz sonlandırıldı.' });
//     }
//   });
// });

// router.post('/logout', authenticate, (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   blacklistedTokens.push(token); // Geçersiz tokenleri listeye ekle
//   res.json({ message: 'Çıkış başarılı.' });
// });

module.exports = router;