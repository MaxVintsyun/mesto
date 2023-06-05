const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
};

const enableSaveButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
}

const disableSaveButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
}

const toogleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if(hasInvalidInput(inputList)) {
        disableSaveButton(buttonElement, inactiveButtonClass);
    } else {
        enableSaveButton(buttonElement, inactiveButtonClass);
    }
};

const showInputError = (formContainer, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formContainer.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formContainer, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formContainer.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formContainer, inputElement, inputErrorClass, errorClass) => {
    if(!inputElement.validity.valid) {
        showInputError(formContainer, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formContainer, inputElement, inputErrorClass, errorClass);
    }
};

function setEventListeners(inputList, inputErrorClass, errorClass, buttonElement, inactiveButtonClass, formContainer) {
    toogleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formContainer, inputElement, inputErrorClass, errorClass);
            toogleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    })
}

function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formContainer));
    const inactiveButtonClass = validationConfig.inactiveButtonClass;
    const inputErrorClass = validationConfig.inputErrorClass;
    const errorClass = validationConfig.errorClass;
    formList.forEach((formContainer) => {
        formContainer.addEventListener('submit', evt => evt.preventDefault());
        const inputList = Array.from(formContainer.querySelectorAll(validationConfig.inputSelector));
        const buttonElement = formContainer.querySelector(validationConfig.submitButtonSelector);
        setEventListeners(inputList, inputErrorClass, errorClass, buttonElement, inactiveButtonClass, formContainer);
    })
}

enableValidation(validationConfig);