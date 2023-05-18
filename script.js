let editButton = document.querySelector('.profile__edit-button');

function openPopup() {
    document.querySelector('.popup').style.display = 'block';
}

editButton.addEventListener('click', openPopup);


let closeButton = document.querySelector('.popup__close-button')

function closePupup() {
    document.querySelector('.popup').style.display = 'none';
}

closeButton.addEventListener('click', closePupup);


let formElement = document.querySelector('.popup__container');

let nameInput = document.querySelector('.popup__profile-name');
let aboutInput = document.querySelector('.popup__profile-about');

function handleFormSubmit (evt) {
    evt.preventDefault();
    
    let nameValue = nameInput.value;
    let aboutValue = aboutInput.value;
    
    let profileName = document.querySelector('.profile__name');
    let profileAbout = document.querySelector('.profile__about');
    
    profileName.textContent = nameValue;
    profileAbout.textContent = aboutValue;
}

formElement.addEventListener('submit', handleFormSubmit); 