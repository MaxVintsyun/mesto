const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAddCard = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('#popup__profile');
const popupProfileContainer = document.querySelector('#popup__container_profile');
const nameInput = document.querySelector('#popup__input_profile-name');
const aboutInput = document.querySelector('#popup__input_profile-about');

const popupAddCard = document.querySelector('#popup__add-card');
const popupAddCardContainer = document.querySelector('#popup__container_add-card');
const cardNameInput = document.querySelector('#popup__input_place-name');
const cardLinkInput = document.querySelector('#popup__input_place-link');

const popup = document.querySelector('.popup');
const closeButton = document.querySelectorAll('.popup__close-button');

const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function createCard(cardName, cardImage) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__image').style.backgroundImage = `url(${cardImage})`;
    cardElement.querySelector('.card__name').textContent = cardName;
    cardElement.querySelector('.card__like-button').addEventListener('click', evt => {
        evt.target.classList.toggle('card__like-button_active');
    })
    cardElement.querySelector('.card__delete').addEventListener('click', evt => {
        evt.target.closest('.card').remove();
    })
    return cardElement;
}

initialCards.forEach(card => {
    cards.append(createCard(card.name, card.link));
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

function closePupup(evt) {
    evt.target.closest('.popup').classList.remove('popup_opened');
}

closeButton.forEach(button => {
    button.addEventListener('click', evt => {
        closePupup(evt);
    });
})

popupAddCardContainer.addEventListener('submit', evt => {
    evt.preventDefault();

    cards.prepend(createCard(cardNameInput.value, cardLinkInput.value));

    closePupup(evt);
})

popupProfileContainer.addEventListener('submit', evt => {
    evt.preventDefault();
    
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;

    closePupup(evt);
}); 