import FavoriteCar from "./FavoriteCar.js";

const favoriteCars = JSON.parse(localStorage.getItem('favoriteCars')) || [];

let carsArrCards = [];
let currentCars = 0;


async function getCars() {
    const carsJson = await fetch('../cars.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Ой, ошибка в fetch: ' + response.statusText);
        }
        return response.json();
    })
    .catch(error => console.error('Ошибка при исполнении запроса: ', error));
    
    return carsJson;
}

async function getCarsArray(cars) {
    cars.forEach(carEl => {
        for (let i = 0; i < favoriteCars.length; i++) {
            if (favoriteCars[i] === carEl.id) {
                let carCard = new FavoriteCar(carEl);
                carsArrCards.push(carCard);
            }
        }
    })

    return carsArrCards;
}

function renderCarCards(cars) {
    changeTitle();
    const carList = document.querySelector('.cars-catalog__list');
    carList.innerHTML = '';

    cars.forEach(carEl => {
        carList.append(carEl.getElement());
    })
}

function changeTitle() {
    const titleEl = document.querySelector('.cars-catalog__title');
    titleEl.textContent = `Избранные товары — ${favoriteCars.length} ${getNoun(favoriteCars.length, 'позиция', 'позиции', 'позиций')}`;

}

function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;

    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }

    return five;
}

document.addEventListener('DOMContentLoaded', async () => {
    
    getCarsArray(await getCars());
    renderCarCards(carsArrCards);
})

