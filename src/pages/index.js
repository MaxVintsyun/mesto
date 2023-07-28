import './index.css';

import Section from "../scripts/Section.js";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithNotice from '../scripts/PopupWithNotice.js';
import UserInfo from "../scripts/UserInfo.js";
import Api from '../scripts/Api.js';
import {
    avatarEditButton,
    profileEditButton, 
    profileAddCard, 
    nameInput, 
    aboutInput, 
    validationConfig,
    options
} from "../scripts/constants.js"

const api = new Api(options)

const cards = new Section({
    renderer: (item, userId) => {
        const cardElement = createCard(item, userId);
        cards.appendItem(cardElement);
    }
}, '.cards');

const userInfo = new UserInfo({
    nameSelector: '.profile__name', 
    aboutSelector: '.profile__about',
    avatarSelector: '.profile__avatar-image'
});

Promise.all([api.getUserInfo(), api.getDefaultCards()])
.then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    cards.renderItems(initialCards, userData._id);
})
.catch(err => console.log(err));

const editAvatarPopup = new PopupWithForm(
    '#popup__edit-avatar',
    (evt, data) => {
        evt.preventDefault();
        
        editAvatarPopup.renderLoading(true);
        api.changeAvatar(data)
        .then((res) => {
            userInfo.setUserAvatar(res);
            editAvatarPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => editAvatarPopup.renderLoading(false));
    }
);
editAvatarPopup.setEventListeners();

const profilePopup = new PopupWithForm(
    '#popup__profile', 
    (evt, data) => {
        evt.preventDefault();

        profilePopup.renderLoading(true);
        api.updateUserInfo(data)
        .then((res) => {
            userInfo.setUserInfo(res);
            profilePopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => profilePopup.renderLoading(false));
    }
);
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
    '#popup__add-card', 
    (evt, data) => {
        evt.preventDefault();

        addCardPopup.renderLoading(true);
        api.postCard(data).
        then((res) => {
            cards.prependItem(createCard(res, res.owner._id));
            addCardPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => addCardPopup.renderLoading(false));
    }
);
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

const popupDeleteCard = new PopupWithNotice(
    '#delete-popup', 
    (evt, element, elementId) => {
        evt.preventDefault();
        popupDeleteCard.renderLoading(true);
        api.deleteCard(elementId)
        .then(() => {
            element.deleteCard();
            popupDeleteCard.close()
        })
        .catch(err => console.log(err))
        .finally(() => popupDeleteCard.renderLoading(false));
    }
);
popupDeleteCard.setEventListeners();

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

function createCard(cardData, userId) {
    const card = new Card({
        cardData: cardData, 
        userId: userId, 
        handleCardClick: () => {
            imagePopup.open(cardData.name, cardData.link);
        }, 
        handleDeleteClick: (card, cardId) => {
            popupDeleteCard.open(card, cardId);            
        },
        handleLikeCard: () => {
            if(card.isLiked()) {
                api.deleteLike(cardData._id)
                .then((data) => {
                    card.dislikeCard();
                    card.setLikes(data.likes);
                })
                .catch(err => console.log(err)); 
            } else {
                api.putLike(cardData._id)
                .then((data) => {
                    card.likeCard();
                    card.setLikes(data.likes);
                })
                .catch(err => console.log(err)); 
            }
        }
    }, '#card-template');
    const cardElement = card.createCard();
    return cardElement;
}

avatarEditButton.addEventListener('click', () => {
    formValidators['popup-form-avatar'].resetValidation();
    editAvatarPopup.open();
})

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