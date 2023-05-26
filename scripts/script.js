const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('#popup__input_profile-name');
const aboutInput = document.querySelector('#popup__input_profile-about');
const closeButton = document.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

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

function openPopup() {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);

function closePupup() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePupup);

function handleFormSubmit (evt) {
    evt.preventDefault();
    
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;

    closePupup();
}

formElement.addEventListener('submit', handleFormSubmit); 