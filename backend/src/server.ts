import express, { Request, Response } from 'express';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes';
import todoRoutes from './routes/todoRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Todo API is running' });
});

// API Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/todos', todoRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📋 API endpoints available at http://localhost:${PORT}/api`);
});

