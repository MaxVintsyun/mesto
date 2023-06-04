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
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

function openImagePopup(cardData) {
    imagePopupImg.src = cardData.link;
    imagePopupImg.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;
    openPopup(imagePopup);
}

function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
}

function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.style.backgroundImage = `url(${cardData.link})`;
    cardElement.querySelector('.card__name').textContent = cardData.name;

    cardImage.addEventListener('click', () => openImagePopup(cardData));

    cardElement.querySelector('.card__like-button').addEventListener('click', evt => likeCard(evt));

    cardElement.querySelector('.card__delete').addEventListener('click', evt => deleteCard(evt));

    return cardElement;
}

initialCards.forEach(cardData => {
    cardsContainer.append(createCard(cardData));
})

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    openPopup(popupProfile);
});

profileAddCard.addEventListener('click', () => openPopup(popupAddCard));

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

closeButtonList.forEach(closeButton => {
    closeButton.addEventListener('click', evt => closePopup(evt.target.closest('.popup')));
})

function addCard(evt) {
    evt.preventDefault();
    
    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    cardsContainer.prepend(createCard(cardData));

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

function escPopupClosing(popup) {
    document.addEventListener('keydown', evt => {
        if(evt.key === 'Escape') {
            closePopup(popup);
        }
    });
}

function clickOutPopupClosing(popupOverlay, evt) {
    if(!popupOverlay.contains(evt.target)) {
        closePopup(evt.target.closest('.popup'));
    }
}

popupList.forEach(popup => {
    const popupOverlay = popup.querySelector('#popup-overlay');
    escPopupClosing(popup);
    popup.addEventListener('click', evt => clickOutPopupClosing(popupOverlay, evt));
})