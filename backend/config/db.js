const mysql = require('mysql2/promise');

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verificação da conexão com o banco de dados
async function verifyConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado ao banco de dados');
    connection.release();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

verifyConnection();

// Exporta a pool de conexões
module.exports = pool;