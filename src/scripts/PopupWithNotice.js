import Popup from "./Popup.js";

export default class PopupWithNotice extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._popupContainer = document.querySelector(popupSelector).querySelector('.popup__container');
        this._submitButton = this._popupContainer.querySelector('.popup__save-button');
        this._submitButtonText = this._submitButton.textContent;
    }

    open(element, elementId) {
        this._element = element;
        this._elementId = elementId;
        super.open();
    }

    renderLoading(isLoading) {
        isLoading ? this._submitButton.textContent = 'Удаление...' : this._submitButton.textContent = this._submitButtonText;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupContainer.addEventListener('submit', evt => this._submitCallback(evt, this._element, this._elementId));
    }
}