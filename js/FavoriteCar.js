import Car from './Car.js';

export default class FavoriteCar extends Car {
    constructor(carInfo) {
        super(carInfo);
    }

    getElement() {
        const carListItem = document.createElement('li');
        carListItem.classList.add('cars-catalog__item');
        
        const carCard = document.createElement('div');
        carCard.classList.add('car-card', 'car-card--vertical');

        carListItem.append(carCard);

        const carImage = this.getCarImage();

        const contentRightWrapper = this.getWrapper('car-card__content-right');

        const carTextContent = this.getCarTextContent();
        const textWrapper = this.getWrapper();
        const contentBottomWrapper = this.getBottomWrapper();

        contentRightWrapper.append(carTextContent, textWrapper, contentBottomWrapper);

        carCard.append(carImage, contentRightWrapper);

        return carListItem;
    }

    getBottomWrapper() {
        const contentBottomWrapper = this.getWrapper('car-card__bottom-content');

        const carPrice = document.createElement('span');
        carPrice.classList.add('car-card__price');
        carPrice.textContent = `от ${this._carInfo.price}`;

        const carButtonsWrapper = this.getCarButtons();
        contentBottomWrapper.append(carPrice, carButtonsWrapper);

        return contentBottomWrapper;
    }

    getCarTextContent() {
        const textWrapper = this.getWrapper('car-card__text-content');
        
        const carTitle = document.createElement('h2');
        carTitle.classList.add('car-card__title');
        carTitle.textContent = `${this._carInfo.brand} ${this._carInfo.model}`;

        const carDescription = document.createElement('p');
        carDescription.classList.add('car-card__description');
        carDescription.textContent = this._carInfo.description;

        const carYear = document.createElement('span');
        carYear.classList.add('car-card__info-item');
        carYear.textContent = `Год: ${this._carInfo.model_year}`;

        const carColor = document.createElement('span');
        carColor.classList.add('car-card__info-item');
        carColor.textContent = `Цвет: ${this._carInfo.color}`;

        textWrapper.append(carTitle, carDescription, carYear, carColor);

        return textWrapper;
    }

    getCarButtons() {
        const carButtonsWrapper = document.createElement('div');
        carButtonsWrapper.classList.add('car-card__buttons');

        const carChooseBtn = this.getCarChooseButton();
        const carDeleteBtn = this.getCarDeleteButton();

        carButtonsWrapper.append(carChooseBtn, carDeleteBtn);

        return carButtonsWrapper;
    }

    getCarChooseButton() {
        const carChooseBtn = document.createElement('button');
        carChooseBtn.classList.add('car-card__choose-button', 'btn');
        carChooseBtn.textContent = 'Выбрать комплектацию';

        return carChooseBtn;
    }

    getCarDeleteButton() {
        const carDeleteBtn = document.createElement('button');
        carDeleteBtn.classList.add('car-card__delete-button');

        carDeleteBtn.innerHTML = `<svg class="car-card__delete-icon" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 17.6068C2 18.7098 2.897 19.6068 4 19.6068H14C15.103 19.6068 16 18.7098 16 17.6068V5.60675H2V17.6068ZM4 7.60675H14L14.002 17.6068H4V7.60675Z" fill="currentColor"/>
                                        <path d="M12 2.60675V0.60675H6V2.60675H0V4.60675H18V2.60675H12Z" fill="currentColor"/>
                                        <path d="M8 9.60675H6V15.6068H8V9.60675Z" fill="currentColor"/>
                                        <path d="M12 9.60675H10V15.6068H12V9.60675Z" fill="currentColor"/>
                                    </svg>  `;

        carDeleteBtn.addEventListener('click', () => {
            const favoriteCars = JSON.parse(localStorage.getItem('favoriteCars')) || [];
            let newFavoriteCars = favoriteCars.filter(id => id !== this.carInfo.id)
            localStorage.setItem('favoriteCars', JSON.stringify(newFavoriteCars));
            location.reload();
        });

        return carDeleteBtn;
    }

    
}