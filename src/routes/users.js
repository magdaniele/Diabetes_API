const express = require('express');
const router = express.Router();
const {createUser,
       logoutUser,
        loginUser,
        updateUser} = require('../controllers/users');

router.post('/',createUser);
router.post('/login',loginUser);
router.post('/update',updateUser);
router.post('/logout',logoutUser);

module.exports = router;
