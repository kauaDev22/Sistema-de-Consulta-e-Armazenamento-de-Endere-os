// backend/routes/index.js
const express = require('express');
const AddressController = require('../controllers/addressController');

const router = express.Router();

// Rota para buscar um endereço pelo CEP
router.get('/address/:cep', AddressController.getAddressByCep);

// Rota para listar todos os endereços salvos
router.get('/addresses', AddressController.listAddresses);

module.exports = router;