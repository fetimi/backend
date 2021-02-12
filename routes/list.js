const express = require('express');
const router = express.Router();

const listCtrl = require('../controllers/list');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', multer, listCtrl.createNewThing);

router.delete('/:id',listCtrl.deleteThing);

router.get('/', listCtrl.getAllThing);

router.get('/:id',listCtrl.getOneThing);

router.get('/getThingByUserId/:id',listCtrl.getThingByUserId);



module.exports = router;