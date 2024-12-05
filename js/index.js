import Car from './Car.js';
import OutStockCar from './OutStockCar.js';


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
        let carCard = new Car(carEl);

        if (!carEl.availability) {
            carCard = new OutStockCar(carEl);
        }
        carsArrCards.push(carCard);
    })

    return carsArrCards;
}

function renderCarCards(cars) {
    const carList = document.querySelector('.cars-catalog__list');
    carList.innerHTML = '';

    cars.forEach(carEl => {
        carList.append(carEl.getElement());
    })
}

const sortCategory = document.querySelector('#sort');

if (sortCategory) {
    sortCategory.addEventListener('change', () => {
        if (currentCars) {
            renderCarCards(sortByCategory(currentCars));
        } else {
            renderCarCards(sortByCategory(carsArrCards));
        } 
    });
}

function sortByCategory(cars) {
    switch (sortCategory.value) {
        case 'name-up': 
            cars.sort( (a, b) => `${a.carInfo.brand} ${a.carInfo.model}`.localeCompare(`${b.carInfo.brand} ${b.carInfo.model}`));
            break;
        case 'name-down': 
            cars.sort( (a, b) => `${b.carInfo.brand} ${b.carInfo.model}`.localeCompare(`${a.carInfo.brand} ${a.carInfo.model}`));
            break;
        case 'year-up': 
            cars.sort( (a, b) => a.carInfo.model_year - b.carInfo.model_year);
            break;
        case 'year-down': 
            cars.sort( (a, b) => b.carInfo.model_year - a.carInfo.model_year);
            break;
        case 'price-up': 
            cars.sort( (a, b) => a.carInfo.price.slice(1) - b.carInfo.price.slice(1));
            break;
        case 'price-down': 
            cars.sort( (a, b) => b.carInfo.price.slice(1) - a.carInfo.price.slice(1));
            break;
        case 'available':
            cars.sort( (a, b) => b.carInfo.availability - a.carInfo.availability);
    }

    return cars;
}

const search = document.querySelector('#search');

if (search) {
    search.addEventListener('keyup', async () => {
        currentCars = 0;
        const cars = sortByCategory(carsArrCards);
    
        const newCarsArray = cars.filter( carCard => {
            let carEl = carCard.carInfo;
            const nameCar = `${carEl.brand} ${carEl.model}`.toLowerCase();
            if (nameCar.includes(search.value.toLowerCase())) {
                return carEl;
            }
        });
    
        currentCars = newCarsArray;
        renderCarCards(newCarsArray);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const cars = getCarsArray(await getCars());
    renderCarCards(carsArrCards);
})


