import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopupImg = document.querySelector('.image-popup__image');
        this._imagePopupCaption = document.querySelector('.image-popup__caption');
    }

    open(name, link) {
        this._imagePopupImg.src = link;
        this._imagePopupImg.alt = name;
        this._imagePopupCaption.textContent = name;
        super.open();
    }
}