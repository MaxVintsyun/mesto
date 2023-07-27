import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._popupForm = document.querySelector(popupSelector).querySelector('.popup__container');
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._submitButton = this._popupForm.querySelector('.popup__save-button');
        this._submitButtonText = this._submitButton.textContent;
    }

    renderLoading(isLoading) {
        isLoading ? this._submitButton.textContent = 'Сохранение...' : this._submitButton.textContent = this._submitButtonText;
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach(inputItem => {
            inputValues[inputItem.name] = inputItem.value;
        });
        return inputValues;
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', evt => this._submitCallback(evt, this._getInputValues()));
    }
}