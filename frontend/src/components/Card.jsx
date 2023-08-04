import React, { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `place__button-like ${
    isLiked && 'place__button-like_active'
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="place">
      {isOwn && (
        <button
          className="place__button-trash"
          onClick={handleDeleteClick}
          type="button"
        ></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="place__photo"
        onClick={handleClick}
      />
      <div className="place__background">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__wrapper">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="place__count-like">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
