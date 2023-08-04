import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login({ handleLogin, setIsLoginForm }) {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData((oldData) => ({ ...oldData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(data);
  }

  return (
    <form
      className="authForm"
      // noValidate
      action="#"
      method="get"
      name="signin"
      onSubmit={handleSubmit}
    >
      <h2 className="authForm__title">Вход</h2>
      <input
        className="authForm__inputs"
        placeholder="Email"
        name="email"
        type="email"
        required
        onChange={handleChange}
        value={data.email}
      ></input>
      <input
        className="authForm__inputs"
        placeholder="Пароль"
        name="password"
        type="password"
        required
        onChange={handleChange}
        value={data.password}
      ></input>
      <button className="authForm__submitButton" type="submit">
        Войти
      </button>
      <p className="authForm__question">
        Не зарегистрированы?
        <Link to="/sign-up" className="authForm__reg">
          {' '}
          Регистрация
        </Link>
      </p>
    </form>
  );
}
