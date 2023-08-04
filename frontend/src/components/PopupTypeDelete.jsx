import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupTypeDelete({ onClose, isOpen, onDelete }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onDelete();
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton={'Да'}
    ></PopupWithForm>
  );
}

export default PopupTypeDelete;
