// backend/validators/addressValidator.js
class AddressValidator {
    // Valida os dados do endereço retornados pela API ViaCEP
    static validate(addressData) {
      const requiredFields = ['cep', 'logradouro', 'bairro', 'localidade', 'uf'];
  
      for (const field of requiredFields) {
        if (!addressData[field]) {
          throw new Error(`Campo obrigatório ausente: ${field}`);
        }
      }
  
      return addressData;
    }
  }
  
  // Exporta a classe AddressValidator
  module.exports = AddressValidator;