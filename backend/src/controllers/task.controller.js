import taskService from '../services/task.service.js';

class TaskController {
  async create(req, res, next) {
    try {
      const { title } = req.body;
      const userId = req.userId; 

      if (!title) {
        return res.status(400).json({ message: 'Título é obrigatório' });
      }

      const task = await taskService.createTask(userId, { title });
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  async list(req, res, next) {
    try {
      const userId = req.userId;
      const tasks = await taskService.getUserTasks(userId);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params; 
      const userId = req.userId;
      const { title, completed } = req.body;

      const task = await taskService.updateTask(id, userId, { title, completed });
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params; 
      const userId = req.userId;

      const result = await taskService.deleteTask(id, userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();