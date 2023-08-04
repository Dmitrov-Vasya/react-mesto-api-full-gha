import React from 'react';

function ImagePopup({ card, isOpen, onClose }) {
  const popupTypeImage = `popup popup_type_image ${
    isOpen ? 'popup_opened' : ''
  }`;

  return (
    <section className={popupTypeImage}>
      <div className="popup__container popup__container_type_image">
        <button
          className="popup__close popup__close_type_image"
          type="button"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__picture" />
        <p className="popup__text">{card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
