// backend/models/Address.js
const pool = require('../config/db');

class Address {
  // Método para salvar um endereço no banco de dados
  static async create(address) {
    const { cep, logradouro, complemento, bairro, localidade, uf } = address;
    const [result] = await pool.query(
      'INSERT INTO addresses (cep, logradouro, complemento, bairro, localidade, uf) VALUES (?, ?, ?, ?, ?, ?)',
      [cep, logradouro, complemento, bairro, localidade, uf]
    );
    return result.insertId;
  }

  static async findByCep(cep) {
    const [rows] = await pool.query('SELECT * FROM addresses WHERE cep = ?', [cep]);
    return rows[0]; // Retorna o endereço se existir, ou undefined se não existir
  }

  // Método para buscar todos os endereços
  static async findAll(orderBy = [['id', 'ASC']]) {
    const [rows] = await pool.query(
      `SELECT * FROM addresses ORDER BY ${orderBy[0][0]} ${orderBy[0][1]}`
    );
    return rows;
  }
}

// Exporta a classe Address
module.exports = Address;