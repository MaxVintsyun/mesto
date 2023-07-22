export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closePopupButton = this._popup.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
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
        this._popup.addEventListener('click', evt => this._handleOverlayClose(evt));

        this._closePopupButton.addEventListener('click', () => this.close());
    }
}