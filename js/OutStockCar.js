import Car from './Car.js';

export default class OutStockCar extends Car{
    constructor(carInfo) {
        super(carInfo);
    }

    getElement() {
        const carListItem = document.createElement('li');
        carListItem.classList.add('cars-catalog__item');
        
        const carCard = document.createElement('div');;
        carCard.classList.add('car-card', 'car-card--out-stock');

        carListItem.append(carCard);

        const carImageWrapper = this.getCarImageWrapper();

        const carTextContent = this.getCarTextContent();
        const carButtonsWrapper = this.getCarButtons();

        carCard.append(carImageWrapper, carTextContent, carButtonsWrapper);

        return carListItem;
    }

    getCarImageWrapper() {
        const carImageWrapper = this.getWrapper('car-card__image-wrapper');
        const carImage = this.getCarImage();

        const outStockText = document.createElement('span');
        outStockText.classList.add('car-card__missing');
        outStockText.textContent = 'Нет в наличии';

        carImageWrapper.append(carImage, outStockText);

        return carImageWrapper;
    }

    getCarBuyButton() {
        const carBuyBtn = document.createElement('button');
        carBuyBtn.classList.add('car-card__buy-button', 'btn');
        carBuyBtn.textContent = 'Купить';
        carBuyBtn.disabled = true;

        return carBuyBtn;
    }

}