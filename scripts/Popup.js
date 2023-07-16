export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closePopupButton = document.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if(evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if(evt.currentTarget === evt.target) { 
            this.close();
        } 
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._handleOverlayClose);

        this._closePopupButton.addEventListener('click', () => this.close());
    }
}