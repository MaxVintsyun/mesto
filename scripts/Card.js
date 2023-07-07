export default class Card {
    constructor(cardData, templateSelector, handleCardClick) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);

        return cardElement;
    }

    _likeCard() {
        this._likeButton.classList.toggle('card__like-button_active');
    }
    
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._likeCard());
        this._deleteButton.addEventListener('click', () => this._deleteCard());
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    createCard() {
        this._element = this._getTemplate();
        this._cardName = this._element.querySelector('.card__name');
        this._cardImage = this._element.querySelector('.card__image');
        this._likeButton = this._element.querySelector('.card__like-button');
        this._deleteButton = this._element.querySelector('.card__delete');
        this._setEventListeners();
        
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;

        return this._element;
    }
}