import { useState } from 'react';

const CreateTaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await onTaskCreated(title);
      setTitle('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="create-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite o título da nova tarefa..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading || !title.trim()}>
        {loading ? 'Criando...' : 'Criar Tarefa'}
      </button>
    </form>
  );
};

export default CreateTaskForm;