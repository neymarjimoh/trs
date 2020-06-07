const express = require('express');
const router = express.Router();
const { 
    getAllUsers,
    deleteAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
} = require('../controllers/user.controllers');

router.get('/', getAllUsers);
router.get('/:userId', getSingleUser);
router.put('/:userId', updateUser);
router.delete('/', deleteAllUsers);
router.delete('/:userId', deleteUser);
module.exports = router;