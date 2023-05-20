let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let nameInput = document.querySelector('#popup__input_profile-name');
let aboutInput = document.querySelector('#popup__input_profile-about');
let closeButton = document.querySelector('.popup__close-button');

function openPopup() {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup)

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