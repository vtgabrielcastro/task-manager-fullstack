import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import TaskList from '../components/TaskList';
import CreateTaskForm from '../components/CreateTaskForm';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]); // estado que armazena todas as tasks
  const [loading, setLoading] = useState(true); // controla carregamento
  const { user, logout } = useAuth(); // dados globais de autienticaçãoo 
  const navigate = useNavigate(); // hook para redirecionamento programatico

  //carrega as tasks do backend
  useEffect(() => {
    loadTasks();
  }, []);

  //busca tarefas do user autenticado
  const loadTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      if (error.response?.status === 401) {
        logout();
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  // cria nova tarefa
  const handleCreateTask = async (title) => {
    try {
      const response = await api.post('/tasks', { title });
      setTasks([response.data, ...tasks]); //adiciona a nova no topo da lista
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      alert('Erro ao criar tarefa');
    }
  };

  // Alterna status da tarefa (concluída / pendente)
  const handleToggleTask = async (taskId, completed) => {
    try {
      const response = await api.patch(`/tasks/${taskId}`, { completed });
      // Atualiza apenas a tarefa modificada
      setTasks(tasks.map(task =>
        task.id === taskId ? response.data : task
      ));
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      alert('Erro ao atualizar tarefa');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Tem certeza que deseja deletar esta tarefa?')) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      // Remove do estado local
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      alert('Erro ao deletar tarefa');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Estatísticas calculadas dinamicamente
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Carregando suas tarefas...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <h1>Olá, {user?.name}!</h1>
          <p>Gerencie suas tarefas de forma simples e eficiente</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </div>

      {/* Cards de estatísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <h3>Total de Tarefas</h3>
          <div className="stat-value">{tasks.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <h3>Pendentes</h3>
          <div className="stat-value">{pendingTasks}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <h3>Concluídas</h3>
          <div className="stat-value">{completedTasks}</div>
        </div>
      </div>

      {/* Formulário de criação */}
      <div className="create-task-card">
        <h3>
          Adicionar Nova Tarefa
        </h3>
        <CreateTaskForm onTaskCreated={handleCreateTask} />
      </div>
      
      {/* Lista de tarefas */}
      <div className="tasks-header">
        <h3>
          Suas Tarefas
        </h3>
        <span className="tasks-count">{tasks.length} {tasks.length === 1 ? 'item' : 'itens'}</span>
      </div>

      <TaskList
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default Dashboard;