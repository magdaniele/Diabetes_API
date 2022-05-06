const express = require('express');
const router = express.Router();
const {createUser,
       logoutUser,
        loginUser} = require('../controllers/users');

router.post('/',createUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);

module.exports = router;
