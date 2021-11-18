const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

// const logger = console
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { password, email } = req.body;
  const existUser = await User.findOne({
    where: {
      email,
    },
  });
  if (!existUser) {
    res.send({ message: false });
  } else {
    const isCorrectPassword = await bcrypt.compare(password, existUser.password);
    if (isCorrectPassword) {
      // req.session.isCorrectPassword = true;
      req.session.user = existUser;
      res.json({ message: true });
    }
    res.send({ message: false });
  }
});

module.exports = router;
