export default class Car {
    constructor(carInfo) {
        this._carInfo = carInfo;
    }

    getElement() {
        const carListItem = document.createElement('li');
        carListItem.classList.add('cars-catalog__item');
        
        const carCard = this.getWrapper('car-card');

        carListItem.append(carCard);

        const carImage = this.getCarImage();
        const carTextContent = this.getCarTextContent();
        const carButtonsWrapper = this.getCarButtons();

        carCard.append(carImage, carTextContent, carButtonsWrapper);

        return carListItem;
    }

    getWrapper(wrapperClass) {
        const wrapper = document.createElement('div');
        wrapper.classList.add(wrapperClass);

        return wrapper;
    }

    getCarImage() {
        const carImage = document.createElement('img');
        carImage.classList.add('car-card__image');
        carImage.src = this._carInfo.img_src;

        return carImage
    }

    getCarTextContent() {
        const textWrapper = this.getWrapper('car-card__text-content');
        
        const carTitle = document.createElement('h2');
        carTitle.classList.add('car-card__title');
        carTitle.textContent = `${this._carInfo.brand} ${this._carInfo.model}`;
        
        const carSpecifications = this.getWrapper('car-card__info');

        const carYear = document.createElement('span');
        carYear.classList.add('car-card__info-item');
        carYear.textContent = `Год: ${this._carInfo.model_year}`;

        const carColor = document.createElement('span');
        carColor.classList.add('car-card__info-item');
        carColor.textContent = `Цвет: ${this._carInfo.color}`;

        carSpecifications.append(carYear, carColor);

        const carPrice = document.createElement('span');
        carPrice.classList.add('car-card__price');
        carPrice.textContent = `от ${this._carInfo.price}`;

        textWrapper.append(carTitle, carSpecifications, carPrice);

        return textWrapper;
    }

    getCarButtons() {
        const carButtonsWrapper = document.createElement('div');
        carButtonsWrapper.classList.add('car-card__buttons');

        const carBuyBtn = this.getCarBuyButton();
        const carFavoriteBtn = this.getCarFavoriteButton();

        carButtonsWrapper.append(carBuyBtn, carFavoriteBtn);

        return carButtonsWrapper;
    }

    getCarBuyButton() {
        const carBuyBtn = document.createElement('button');
        carBuyBtn.classList.add('car-card__buy-button', 'btn');

        if (this._carInfo.buy) {
            carBuyBtn.classList.add('car-card__buy-button--success')
            carBuyBtn.textContent = 'Куплено';
        } else {
            carBuyBtn.textContent = 'Купить';
        }   

        carBuyBtn.addEventListener('click', () => {
            carBuyBtn.classList.toggle('car-card__buy-button--success');

            if (carBuyBtn.classList.contains('car-card__buy-button--success')) {
                carBuyBtn.textContent = 'Куплено';
                this._carInfo['buy'] = true;
            } else {
                carBuyBtn.textContent = 'Купить';
                this._carInfo['buy'] = false;
            }   
        });

        return carBuyBtn;
    }

    getCarFavoriteButton() {
        const carFavoriteBtn = document.createElement('button');
        carFavoriteBtn.classList.add('car-card__favorite-button');

        const heart = `<svg class="car-card__favorite-logo" width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_4451_143)">
                                <path d="M13.5 24C13.224 24 12.948 23.9235 12.705 23.772C12.186 23.448 0 15.7365 0 7.5C0 3.3645 3.3645 0 7.5 0C9.891 0 12.1065 1.25543 13.5 3.11993C14.8935 1.25543 17.109 0 19.5 0C23.6355 0 27 3.3645 27 7.5C27 15.7365 14.814 23.448 14.295 23.772C14.052 23.9235 13.776 24 13.5 24ZM7.5 3C5.019 3 3 5.019 3 7.5C3 12.5445 9.9645 18.3105 13.5 20.709C17.0355 18.3105 24 12.546 24 7.5C24 5.019 21.981 3 19.5 3C16.9665 3 15 5.4195 15 7.5C15 8.328 14.328 9 13.5 9C12.672 9 12 8.328 12 7.5C12 5.4195 10.0335 3 7.5 3Z" fill="currentColor"/>
                            </g>
                                <defs>
                                <clippath id="clip0_4451_143">
                                    <rect width="27" height="24" fill="currentColor"/>
                                </clippath>
                            </defs>
                        </svg>`;
        const paintedHeart = `<svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_4478_16)">
                                    <rect width="27" height="24" fill="white"/>
                                    <path d="M13.5 24C13.224 24 12.948 23.9235 12.705 23.772C12.186 23.448 0 15.7365 0 7.5C0 3.3645 3.3645 0 7.5 0C9.891 0 12.1065 1.25543 13.5 3.11993C14.8935 1.25543 17.109 0 19.5 0C23.6355 0 27 3.3645 27 7.5C27 15.7365 14.814 23.448 14.295 23.772C14.052 23.9235 13.776 24 13.5 24Z" fill="#240C86"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_4478_16">
                                        <rect width="27" height="24" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg> `;
        
        const favoriteCars = JSON.parse(localStorage.getItem('favoriteCars')) || [];
        if (favoriteCars) {
            favoriteCars.forEach(elem => {
                if (elem === this._carInfo.id) {
                    this._carInfo['liked'] = true;
                    carFavoriteBtn.classList.add('liked');
                }
            })
        }

        if (this._carInfo.liked) {
            carFavoriteBtn.innerHTML = paintedHeart;
        } else {
            carFavoriteBtn.innerHTML = heart;
        }
        
        carFavoriteBtn.addEventListener('click', () => {
            carFavoriteBtn.classList.toggle('liked');

            if (carFavoriteBtn.classList.contains('liked')) {
                carFavoriteBtn.innerHTML = paintedHeart;
                this._carInfo['liked'] = true;

                const favoriteCars = JSON.parse(localStorage.getItem('favoriteCars')) || [];
                favoriteCars.push(this._carInfo.id);
                localStorage.setItem('favoriteCars', JSON.stringify(favoriteCars));
            } else {
                carFavoriteBtn.innerHTML = heart;
                this._carInfo['liked'] = false;
                const favoriteCars = JSON.parse(localStorage.getItem('favoriteCars')) || [];
                let newFavoriteCars = favoriteCars.filter(id => id !== this.carInfo.id)
                localStorage.setItem('favoriteCars', JSON.stringify(newFavoriteCars));
            }
        });

        return carFavoriteBtn;
    }

    get carInfo() {
        return this._carInfo;
    }

    get liked() {
        return this._liked;
    }
}