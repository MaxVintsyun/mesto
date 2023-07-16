import Section from "./Section.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAddCard = document.querySelector('.profile__add-button');

const popupList = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('#popup__profile');
const popupProfileContainer = document.querySelector('#popup__container_profile');
const nameInput = document.querySelector('#profile-name-input');
const aboutInput = document.querySelector('#profile-about-input');

const popupAddCard = document.querySelector('#popup__add-card');
const popupAddCardContainer = document.querySelector('#popup__container_add-card');
const cardNameInput = document.querySelector('#place-name-input');
const cardLinkInput = document.querySelector('#place-link-input');

const closeButtonList = document.querySelectorAll('.popup__close-button');

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
    const imagePopup = new PopupWithImage('#image-popup');
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

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escPopupClosing);
}

function clickOutPopupClosing(evt) {
    if(evt.currentTarget === evt.target) { 
        closePopup(evt.currentTarget); 
    } 
}

popupList.forEach(popup => {
    popup.addEventListener('click', clickOutPopupClosing);
})

function escPopupClosing(evt) {
    if(evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escPopupClosing);
}

profileEditButton.addEventListener('click', () => {
    formValidators['popup-form-profile'].resetValidation();
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    openPopup(popupProfile);
});

profileAddCard.addEventListener('click', () => {
    formValidators['popup-form-card'].resetValidation();
    openPopup(popupAddCard);
});

closeButtonList.forEach(closeButton => {
    closeButton.addEventListener('click', evt => closePopup(evt.target.closest('.popup')));
})

function addCard(evt) {
    evt.preventDefault();
    

    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };

    renderCards.prependItem(createCard(cardData));

    evt.target.reset();

    closePopup(popupAddCard);
}

popupAddCardContainer.addEventListener('submit', evt => addCard(evt));

function changeProfileData(evt) {
    evt.preventDefault();
    
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;

    closePopup(popupProfile);
}

popupProfileContainer.addEventListener('submit', evt => changeProfileData(evt));