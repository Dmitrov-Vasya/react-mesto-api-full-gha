import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../context/CurrentUserContext';

export default function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setValueName] = useState('');
  const [description, setValueDescription] = useState('');

  useEffect(() => {
    setValueName(currentUser.name);
    setValueDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setValueName(e.target.value);
  }

  function handleChangeDescription(e) {
    setValueDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton={'Сохранить'}
    >
      <label className="popup__field">
        <input
          id="name-input"
          className="popup__input popup__input_type_name"
          name="name"
          type="text"
          placeholder="Жак-Ив Кусто"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChangeName}
          value={name || ''}
        />
        <span className="name-input-error popup__input-error">
          Необходимо заполнить данное поле
        </span>
      </label>
      <label className="popup__field">
        <input
          id="info-input"
          name="info"
          className="popup__input popup__input_type_info"
          type="text"
          placeholder="Исследователь океана"
          minLength="2"
          maxLength="200"
          required
          onChange={handleChangeDescription}
          value={description || ''}
        />
        <span className="info-input-error popup__input-error">
          Необходимо заполнить данное поле
        </span>
      </label>
    </PopupWithForm>
  );
}
