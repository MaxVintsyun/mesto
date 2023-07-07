import { openImagePopup } from "./script.js";

export default class Card {
    constructor(cardData, templateSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._templateSelector = templateSelector;
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
        this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    }
    
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.card__like-button').addEventListener('click', () => this._likeCard());
        this._element.querySelector('.card__delete').addEventListener('click', () => this._deleteCard());
        this._element.querySelector('.card__image').addEventListener('click', () => openImagePopup(this._name, this._link));
    }

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__name').textContent = this._name;

        return this._element;
    }
}