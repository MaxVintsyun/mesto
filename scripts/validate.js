const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
};

const toogleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
    }
};

const showInputError = (popupElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (popupElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (popupElement, inputElement, inputErrorClass, errorClass) => {
    if(!inputElement.validity.valid) {
        showInputError(popupElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(popupElement, inputElement, inputErrorClass, errorClass);
    }
};

function setEventListeners(inputList, inputErrorClass, errorClass, buttonElement, inactiveButtonClass, popupElement) {
    toogleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(popupElement, inputElement, inputErrorClass, errorClass);
            toogleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    })
}

function enableValidation(popupElements) {
    const popupList = Array.from(document.querySelectorAll(popupElements.formContainer));
    const inactiveButtonClass = popupElements.inactiveButtonClass;
    const inputErrorClass = popupElements.inputErrorClass;
    const errorClass = popupElements.errorClass;
    popupList.forEach((popupElement) => {
        popupElement.addEventListener('submit', evt => evt.preventDefault());
        const inputList = Array.from(popupElement.querySelectorAll(popupElements.inputSelector));
        const buttonElement = popupElement.querySelector(popupElements.submitButtonSelector);
        setEventListeners(inputList, inputErrorClass, errorClass, buttonElement, inactiveButtonClass, popupElement);
    })
}

enableValidation({
    formContainer: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});