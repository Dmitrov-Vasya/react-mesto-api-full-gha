import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import PopupTypeDelete from './PopupTypeDelete';
import EditAvatarPopup from './EditAvatarPopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/Api';
import * as authApi from '../utils/authApi';
import '../index.css';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isRegisterResultPopupOpen, setIsRegisterResultPopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoginForm, setIsLoginForm] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterSucceed, setIsRegisterSucceed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loggedIn)
      Promise.all([api.getInformationUser(), api.getInitialCards()])
        .then(([user, card]) => {
          setCurrentUser(user);
          setCards(card);
        })
        .catch((err) => console.log(err));
  }, [loggedIn]);

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then((user) => {
          if (user) {
            setIsLoading(true);
            setLoggedIn(true);
          }
        })
        .catch(console.log);
    } else {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  function handleClickMenu() {
    isLoginForm ? navigate('/sign-up') : navigate('/sign-in');
  }
  function handleLogout() {
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: 'true' });
    setLoggedIn(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeletClick() {
    setIsDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleClickTooltipPopupClose() {
    setIsRegisterResultPopupOpen(false);
    if (isRegisterSucceed) {
      navigate('/sign-in');
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(false);
  }

  function handleUpdateUser(value) {
    console.log(value);
    api
      .editProfile(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    console.log(avatar);
    api
      .updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleNewCard(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .displayNumberLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    console.log(selectedCard);
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(data) {
    authApi
      .register(data)
      .then((data) => {
        if (data._id || data.email) {
          setIsRegisterSucceed(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterSucceed(false);
      });
    setIsRegisterResultPopupOpen(true);
  }

  function handleLogin(data) {
    authApi
      .authorize(data)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setEmail(email);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterSucceed(false);
        setIsRegisterResultPopupOpen(true);
      });
  }

  function assignSelected(card) {
    handleDeletClick(card);
    setSelectedCard(card);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={email}
          loggedIn={loggedIn}
          isLoginForm={isLoginForm}
          handleClickMenu={handleClickMenu}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={assignSelected}
                cards={cards}
                isLoading={isLoading}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Register
                  handleRegister={handleRegister}
                  setIsLoginForm={setIsLoginForm}
                />
              )
            }
          />
          <Route
            path="/sign-in"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login
                  handleLogin={handleLogin}
                  setIsLoginForm={setIsLoginForm}
                />
              )
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleNewCard}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupTypeDelete
          isOpen={isDeletePopupOpen}
          onDelete={handleCardDelete}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          isSuccess={isRegisterSucceed}
          isOpen={isRegisterResultPopupOpen}
          onClose={handleClickTooltipPopupClose}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
