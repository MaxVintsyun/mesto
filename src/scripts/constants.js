const avatarEditButton = document.querySelector('.profile__avatar-edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddCard = document.querySelector('.profile__add-button');

const nameInput = document.querySelector('#profile-name-input');
const aboutInput = document.querySelector('#profile-about-input');

const validationConfig = {
  formContainer: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  authorizationTokken: 'e9c1e256-2a18-4f2a-a202-e6e4e0b68227'
}

export {avatarEditButton, profileEditButton, profileAddCard, nameInput, aboutInput, validationConfig, options};