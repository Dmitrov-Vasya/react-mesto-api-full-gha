import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ handleRegister, setIsLoginForm }) {
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
    handleRegister(data);
  }

  return (
    <form
      className="authForm"
      name="sign-up"
      action="#"
      method="get"
      // noValidate
      onSubmit={handleSubmit}
    >
      <h2 className="authForm__title">Регистрация</h2>
      <input
        className="authForm__inputs"
        name="email"
        placeholder="Email"
        type="email"
        required
        onChange={handleChange}
        value={data.email}
        minLength={2}
        maxLength={50}
      ></input>
      <input
        className="authForm__inputs"
        placeholder="Пароль"
        type="password"
        required
        onChange={handleChange}
        name="password"
        value={data.password}
        minLength={8}
        maxLength={20}
      ></input>
      <button className="authForm__submitButton" type="submit">
        Зарегистрироваться
      </button>
      <p className="authForm__question">
        Уже зарегистрированы?
        <Link to="/sign-in" className="authForm__reg">
          {' '}
          Войти
        </Link>
      </p>
    </form>
  );
}
