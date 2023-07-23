import './index.css';

import Section from "../scripts/Section.js";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import {
    profileEditButton, 
    profileAddCard, 
    nameInput, 
    aboutInput, 
    validationConfig, 
    initialCards
} from "../scripts/constants.js"

const userInfo = new UserInfo({
    nameSelector: '.profile__name', 
    aboutSelector: '.profile__about'
})

const profilePopup = new PopupWithForm(
    '#popup__profile', 
    (evt, data) => {
        evt.preventDefault();

        userInfo.setUserInfo(data['profile-name'], data['profile-about']);
    
        profilePopup.close();
    }
);
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
    '#popup__add-card', 
    (evt, data) => {
        evt.preventDefault();

        const cardData = {
            name: data['place-name'],
            link: data['place-link']
        };
    
        renderCards.prependItem(createCard(cardData));
    
        addCardPopup.close();
    }
);
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

const formValidators = {};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formContainer));
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

function handleCardClick(name, link) {
    imagePopup.open(name, link);
}

function createCard(cardData) {
    const card = new Card(cardData, '#card-template', handleCardClick);
    const cardElement = card.createCard();
    return cardElement;
}

const renderCards = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        renderCards.appendItem(cardElement);
    }
}, '.cards');

renderCards.renderItems();

profileEditButton.addEventListener('click', () => {
    formValidators['popup-form-profile'].resetValidation();
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.userName;
    aboutInput.value = userData.userAbout;
    
    profilePopup.open();
});

profileAddCard.addEventListener('click', () => {
    formValidators['popup-form-card'].resetValidation();
    addCardPopup.open();
});
