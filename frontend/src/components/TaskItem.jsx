const TaskItem = ({ task, onToggle, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id, !task.completed)}
      />
      <div className="task-content">
        <span className="task-title">{task.title}</span>
        <span className="task-meta">
          Criada em {formatDate(task.createdAt)}
        </span>
      </div>
      <button 
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        title="Deletar tarefa"
      >
        🗑️
      </button>
    </div>
  );
};

export default TaskItem;