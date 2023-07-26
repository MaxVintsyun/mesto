export default class Card {
    constructor({cardData, userId, handleCardClick, handleDeleteClick, handleLikeCard}, templateSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._likes = cardData.likes;
        // this._likesCount = cardData.likes.length;
        this._cardId = cardData.owner._id;
        this._userId = userId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeCard = handleLikeCard;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);

        return cardElement;
    }

    isLiked() {
        return this._likes.find(user => user._id === this._userId);
    }

    likeCard() {
        this._likeButton.classList.add('card__like-button_active');
    }

    dislikeCard() {
        this._likeButton.classList.remove('card__like-button_active');
    }

    _ownLikes() {
        this.isLiked() ? this.likeCard() : this.dislikeCard();
    }

    setLikes(data) {
        this._likes = data;
        this._likesCount.textContent = this._likes.length;
    }
    
    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._handleLikeCard());
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
        this._cardImage.addEventListener('click', () => this._handleCardClick());
    }

    _isUserCards(element) {
        if(!(this._cardId === this._userId)) {
            element.remove();
        }
    }

    createCard() {
        this._element = this._getTemplate();
        this._cardName = this._element.querySelector('.card__name');
        this._cardImage = this._element.querySelector('.card__image');
        this._likeButton = this._element.querySelector('.card__like-button');
        this._deleteButton = this._element.querySelector('.card__delete');
        this._isUserCards(this._deleteButton);
        this._likesCount = this._element.querySelector('.card__likes-count');
        this._setEventListeners();
        
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;
        this.setLikes(this._likes);
        this._ownLikes();

        return this._element;
    }
}