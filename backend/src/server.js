import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Middleware de erro (deve ser o último)
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});