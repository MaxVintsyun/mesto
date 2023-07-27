import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopupContainer = document.querySelector(popupSelector);
        this._imagePopupImg = this._imagePopupContainer.querySelector('.image-popup__image');
        this._imagePopupCaption = this._imagePopupContainer.querySelector('.image-popup__caption');
    }

    open(name, link) {
        this._imagePopupImg.src = link;
        this._imagePopupImg.alt = name;
        this._imagePopupCaption.textContent = name;
        super.open();
    }
}