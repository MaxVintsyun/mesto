import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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

const imagePopup = document.querySelector('#image-popup');
const imagePopupImg = document.querySelector('.image-popup__image');
const imagePopupCaption = document.querySelector('.image-popup__caption');

const closeButtonList = document.querySelectorAll('.popup__close-button');

const cardsContainer = document.querySelector('.cards');

export function openImagePopup(name, link) {
    imagePopupImg.src = link;
    imagePopupImg.alt = name;
    imagePopupCaption.textContent = name;
    openPopup(imagePopup);
}

initialCards.forEach(cardData => {
    const card = new Card(cardData, '#card-template');
    const cardElement = card.createCard();
    cardsContainer.append(cardElement);
})

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
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    openPopup(popupProfile);
});

profileAddCard.addEventListener('click', () => openPopup(popupAddCard));

closeButtonList.forEach(closeButton => {
    closeButton.addEventListener('click', evt => closePopup(evt.target.closest('.popup')));
})

function addCard(evt) {
    evt.preventDefault();
    
    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    const card = new Card(cardData, '#card-template');
    const cardElement = card.createCard();
    cardsContainer.prepend(cardElement);

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

Array.from(document.querySelectorAll(validationConfig.formContainer)).forEach(formElement => {
    const formValidation = new FormValidator(validationConfig, formElement);
    formValidation.enableValidation();
})