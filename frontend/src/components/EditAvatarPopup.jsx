import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton={'Сохранить'}
    >
      <label className="popup__field">
        <input
          id="avatar-input"
          name="link"
          className="popup__input popup__input_type_url"
          type="url"
          placeholder="Ссылка на картинку"
          required
          ref={inputRef}
        />
        <span className="avatar-input-error popup__input-error">
          Необходимо заполнить данное поле
        </span>
      </label>
    </PopupWithForm>
  );
}
