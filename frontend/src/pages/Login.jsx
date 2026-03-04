import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Lado esquerdo - Branding */}
        <div className="login-brand">
          <div className="brand-content">
            <h1>Task Manager</h1>
            <p>Organize suas tarefas de forma simples e eficiente</p>
            <div className="brand-features">
              <div className="feature">
                <span>Gerencie suas tarefas</span>
              </div>
              <div className="feature">
                <span>Segurança com JWT</span>
              </div>
              <div className="feature">
                <span>Rápido e intuitivo</span>
              </div>
            </div>
          </div>
          <div className="brand-footer">
            <span>by Victor Gabriel</span>
          </div>
        </div>

        {/* Lado direito - Formulário */}
        <div className="login-form-section">
          <div className="form-header">
            <h2>Bem-vindo de volta! </h2>
            <p>Faça login para acessar suas tarefas</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label>
                Email
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className={error ? 'error' : ''}
              />
            </div>

            <div className="input-group">
              <label>
                Senha
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className={error ? 'error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> 
                <span>Lembrar-me</span>
              </label>
              <a href="#" className="forgot-password">Esqueceu a senha?</a>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <div className="register-link">
            <p>Não tem uma conta?</p>
            <Link to="/register" className="register-button">
              Criar conta gratuita
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;