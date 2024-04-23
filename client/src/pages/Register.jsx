import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleErrors = (error) => {
  console.error(error);
  toast.error('An error occurred. Please try again.', { position: 'bottom-right' });
};

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let data = {};
      await axios.post(
        'http://127.0.0.1:3001/api/users/registration',
        { ...values },
        { withCredentials: true }
      ).then(function (response) {
        data = response.data
      }).catch(function (error) {
        data = error.response.data
      });
      if (data.errors) {
        const { email, password } = data.errors;
        if (email) {
          toast.error(`Error: ${email}`, { position: 'bottom-right' });
        } else if (password) {
          toast.error(`Error: ${password}`, { position: 'bottom-right' });
        }else{
          handleErrors(data.errors);
        }
      } else {
        navigate('/login');
        toast.success('User was successfuly registred. Try to login.', { position: 'bottom-right' });
      }
    } catch (err) {
      handleErrors(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Зареєструвати акаунт</h2>
      <form onSubmit={handleSubmit}>
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
        <div>
          <label htmlFor="first_name">Ім'я</label>
          <input
            type="text"
            id="first_name" 
            name="first_name"
            placeholder="First name"
            value={values.first_name}
            onChange={(e) => setValues({ ...values, first_name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="last_name">Прізвище</label>
          <input
            type="text"
            id="last_name" 
            name="last_name"
            placeholder="Last name"
            value={values.last_name}
            onChange={(e) => setValues({ ...values, last_name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="phone_number">Номер телефону</label>
          <input
            type="phone_number"
            id="phone_number" 
            name="phone_number"
            placeholder="phone number"
            value={values.phone_number}
            onChange={(e) => setValues({ ...values, phone_number: e.target.value })}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Submit'}
        </button>
        <span>
        Вже є аккаунт? <Link to="/login">Увійти</Link>
        </span>
      </form>
    </div>
  );
}
