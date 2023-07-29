const router = require('express').Router();
const { getUser, updateUser, deleteUser } = require('../controllers/userController');

router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;