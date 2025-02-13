// backend/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error('Erro:', err.message);
  
    // Retorna uma mensagem de erro genérica
    res.status(500).json({
      error: 'Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.',
    });
  };
  
  module.exports = errorHandler;