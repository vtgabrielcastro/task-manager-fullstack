const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  if (err.code === 'P2002') {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ message: 'Registro não encontrado' });
  }

  res.status(500).json({ 
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
};

export default errorMiddleware;