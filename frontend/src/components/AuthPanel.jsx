import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';

const roles = ['ADMIN', 'ADVOCATE', 'PARALEGAL'];

export default function AuthPanel() {
  const { login } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    email: 'admin@senatelaw.test',
    password: 'password123',
    fullName: 'Admin User',
    role: 'ADMIN'
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'register') {
        await api.post('/auth/register', form);
      }
      await login({ email: form.email, password: form.password });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-panel">
      <h2>{mode === 'login' ? 'Sign in to continue' : 'Create a team member account'}</h2>
      <p style={{ color: '#52606d' }}>
        Use the seeded admin credentials or register a new user to explore the legal diary workspace.
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        {mode === 'register' && (
          <>
            <label>
              Full name
              <input name="fullName" value={form.fullName} onChange={handleChange} required />
            </label>
            <label>
              Role
              <select name="role" value={form.role} onChange={handleChange}>
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </label>
          </>
        )}
        {error && <p style={{ color: '#d64545' }}>{error}</p>}
        <button className="primary" type="submit" disabled={loading}>
          {loading ? 'Processing…' : mode === 'login' ? 'Login' : 'Register & Login'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        {mode === 'login' ? 'Need to add a colleague?' : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          style={{ background: 'none', color: '#4c6ef5', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          {mode === 'login' ? 'Register new user' : 'Login instead'}
        </button>
      </p>
    </div>
  );
}
