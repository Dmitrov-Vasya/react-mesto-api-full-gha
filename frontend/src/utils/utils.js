const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
//переменные для валидации
const objectValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const profileEdit = document.querySelector('.profile__edit');
const formElementEdit = document.forms['profile'];
const nameInput = document.forms['profile'].querySelector(
  '.popup__input_type_name'
);
const infoInput = document.forms['profile'].querySelector(
  '.popup__input_type_info'
);
const profileAddButton = document.querySelector('.profile__add');
const formElementAdd = document.forms['card'];
const profileEditAvatarButton = document.querySelector('.profile__edit-avatar');
const formElementEditAvatar = document.forms['avatar'];

export {
  initialCards,
  objectValidate,
  profileEdit,
  formElementEdit,
  nameInput,
  infoInput,
  profileAddButton,
  formElementAdd,
  profileEditAvatarButton,
  formElementEditAvatar,
};
