// backend/controllers/addressController.js
const Address = require('../models/Address');
const ViaCepService = require('../services/viaCepService');
const CepValidator = require('../validators/cepValidator');
const AddressValidator = require('../validators/addressValidator');// Importação correta

class AddressController {
  // Método para buscar um endereço pelo CEP e salvar no banco de dados
  static async getAddressByCep(req, res) {
    const { cep } = req.params;

    try {
      // Valida o CEP
      const cleanedCep = CepValidator.validate(cep);

      const existingAddress = await Address.findByCep(cleanedCep);
      if (existingAddress) {
        throw new Error('CEP já cadastrado');
      }
      // Consulta o endereço na API ViaCEP
      const addressData = await ViaCepService.getAddressByCep(cleanedCep);

      // Valida os dados do endereço
      AddressValidator.validate(addressData); // Uso correto do validador

      // Salva o endereço no banco de dados
      const addressId = await Address.create(addressData);

      // Retorna o endereço salvo
      res.status(200).json({ id: addressId, ...addressData });
    } catch (error) {
      console.error('Erro no controller:', error.message);
      res.status(400).json({ error: error.message });
    }
  }

  // Método para listar todos os endereços salvos
  static async listAddresses(req, res) {
    try {
      // Obtém o parâmetro de ordenação (se existir)
      const { sortBy } = req.query;

      // Define a ordenação padrão (por ID)
      let orderBy = [['id', 'ASC']];

      // Verifica se o parâmetro de ordenação foi fornecido
      if (sortBy) {
        const [field, order] = sortBy.split(':');
        const validFields = ['localidade', 'bairro', 'uf']; // Campos válidos para ordenação
        const validOrders = ['asc', 'desc']; // Ordens válidas

        // Valida o campo de ordenação
        if (!validFields.includes(field)) {
          throw new Error(`Campo de ordenação inválido: ${field}`);
        }

        // Valida a ordem de ordenação
        if (!validOrders.includes(order.toLowerCase())) {
          throw new Error(`Ordem de ordenação inválida: ${order}`);
        }

        orderBy = [[field, order.toUpperCase()]];
      }

      // Busca os endereços no banco de dados com a ordenação aplicada
      const addresses = await Address.findAll(orderBy);

      // Retorna a lista de endereços
      res.status(200).json(addresses);
    } catch (error) {
      console.error('Erro ao listar endereços:', error.message);
      res.status(400).json({ error: error.message });
    }
  }
}


module.exports = AddressController;