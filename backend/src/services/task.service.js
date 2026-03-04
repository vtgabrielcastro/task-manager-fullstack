import prisma from '../utils/prisma.js';

class TaskService {
  async createTask(userId, taskData) {
    const { title } = taskData;

    const task = await prisma.task.create({
      data: {
        title,
        userId: parseInt(userId) 
      }
    });

    return task;
  }

  async getUserTasks(userId) {
    const tasks = await prisma.task.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { createdAt: 'desc' }
    });

    return tasks;
  }

  async updateTask(taskId, userId, updateData) {
    
    const taskIdNum = parseInt(taskId);
    const userIdNum = parseInt(userId);

    // Verificar se a tarefa pertence ao usuário
    const task = await prisma.task.findFirst({
      where: {
        id: taskIdNum,
        userId: userIdNum
      }
    });

    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskIdNum },
      data: updateData
    });

    return updatedTask;
  }

  async deleteTask(taskId, userId) {
    
    const taskIdNum = parseInt(taskId);
    const userIdNum = parseInt(userId);

    // Verificar se a tarefa pertence ao usuário
    const task = await prisma.task.findFirst({
      where: {
        id: taskIdNum,
        userId: userIdNum
      }
    });

    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    await prisma.task.delete({
      where: { id: taskIdNum }
    });

    return { message: 'Tarefa deletada com sucesso' };
  }
}

export default new TaskService();