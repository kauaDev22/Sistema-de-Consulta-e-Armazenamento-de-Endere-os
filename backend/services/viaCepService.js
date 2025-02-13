// backend/services/viaCepService.js
const axios = require('axios');

class ViaCepService {
  // Método para consultar um endereço pelo CEP
  static async getAddressByCep(cep) {
    try {
      // Verifica se o CEP foi fornecido
      if (!cep) {
        throw new Error('CEP não fornecido');
      }

      // Remove hífens e espaços do CEP
      const cleanedCep = cep.replace(/\D/g, '');

      // Verifica se o CEP tem 8 dígitos
      if (cleanedCep.length !== 8) {
        throw new Error('CEP deve ter 8 dígitos');
      }

      // Faz a requisição à API ViaCEP
      const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`);

      // Verifica se o CEP foi encontrado
      if (response.data.erro) {
        throw new Error('CEP não encontrado');
      }

      // Retorna os dados do endereço
      return response.data;
    } catch (error) {
      console.error('Erro na consulta do CEP:', error.message);
      throw new Error('Erro ao consultar o CEP');
    }
  }
}

module.exports = ViaCepService;