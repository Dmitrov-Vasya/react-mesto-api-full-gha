import React from 'react';

function PopupWithForm({
  name,
  title,
  children,
  onClose,
  isOpen,
  textButton,
  onSubmit,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__container ">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <h2 className="popup__title ">{title}</h2>
        <form
          name={name}
          className={`popup__form popup__form_type_${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button className="popup__save " type="submit">
            {textButton}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
