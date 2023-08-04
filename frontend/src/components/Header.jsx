import React from 'react';
import headerLogo from '../images/logo.svg';

export default function Header({
  email,
  loggedIn,
  handleLogout,
  isLoginForm,
  handleClickMenu,
}) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип проекта" />
      <div></div>
      <h2 className="header__userRegistered">{email}</h2>
      <button
        className="header__menu"
        type="button"
        onClick={loggedIn ? handleLogout : handleClickMenu}
      >
        {loggedIn ? 'Выйти' : isLoginForm ? 'Регистрация' : 'Войти'}
      </button>
    </header>
  );
}
