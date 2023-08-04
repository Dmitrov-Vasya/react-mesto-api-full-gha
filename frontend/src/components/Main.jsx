import React, { useContext } from 'react';
import Card from './Card';

import { CurrentUserContext } from '../context/CurrentUserContext';

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  cards,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <button
          className="profile__edit-avatar"
          type="button"
          onClick={onEditAvatar}
        >
          <img
            src={currentUser.avatar}
            alt="Кусто"
            className="profile__avatar"
          />
        </button>
        <div className="profile__wrapper">
          <div className="profile__info">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button
              className="profile__edit"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__info-text">{currentUser.about}</p>
        </div>
        <button
          className="profile__add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="places">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
