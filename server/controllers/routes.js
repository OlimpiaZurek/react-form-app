const express = require('express');

const formController = require('./form_controller');
const router = express.Router();

router.post('/form', formController.sendFormData);
router.get('/form', formController.getFormData)

module.exports = router;
