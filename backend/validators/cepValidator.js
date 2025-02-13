// backend/validators/cepValidator.js
class CepValidator {
    // Valida o formato do CEP
    static validate(cep) {
      // Remove hífens e espaços
      const cleanedCep = cep.replace(/\D/g, '');
  
      // Verifica se o CEP tem 8 dígitos
      if (cleanedCep.length !== 8) {
        throw new Error('CEP deve ter 8 dígitos');
      }
  
      return cleanedCep;
    }
  }
  
  module.exports = CepValidator;