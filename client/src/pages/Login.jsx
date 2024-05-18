import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
import { AuthContext } from '../providers/Auth';

const useProfile = () => {
  return React.useContext(AuthContext);
};

export default function Login() {
  const {setProfile} = useProfile();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const generateError = (err) => toast.error(err, { position: 'bottom-right' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } =  await axios.post(
        'http://127.0.0.1:3001/api/users/login',
        { ...values },
        { withCredentials: true }
      );

      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          setProfile(data.user)
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error(err);
      generateError('Виникла помилка. Будь ласка спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Вхід в обліковий запис</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
        <label htmlFor="email">Електронна пошта</label>
          <input
            type="email"
            id="email" 
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div>
        <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password" 
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <span>
          Немає акаунту? <Link to="/registration">Зареєструватися</Link>
        </span>
      </form>
    </div>
  );
}
