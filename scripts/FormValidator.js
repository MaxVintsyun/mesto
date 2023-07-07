export default class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
        this._inactiveButtonClass = this._validationConfig.inactiveButtonClass;
        this._inputErrorClass = this._validationConfig.inputErrorClass;
        this._errorClass = this._validationConfig.errorClass;
    }

    _hasInvalidInput() {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid;
        })
    };
    
    _enableSaveButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    }
    
    _disableSaveButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _toogleButtonState() {
        this._hasInvalidInput() ? this._disableSaveButton() : this._enableSaveButton();
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };
    
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };
    
    _checkInputValidity(inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _setEventListeners() {
        this._toogleButtonState();
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toogleButtonState();
            });
        })
    }

    resetValidation() {
        this._toogleButtonState();
  
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', evt => evt.preventDefault());
        this._setEventListeners();
    }
}