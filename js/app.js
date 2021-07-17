// Variables
const brand = document.querySelector('#brand');
const year = document.querySelector('#year');
const minimum = document.querySelector('#min');
const maximum = document.querySelector('#max');
const doors = document.querySelector('#doors');
const transmission = document.querySelector('#transmission');
const colour = document.querySelector('#colour');

// Creating years
const years = document.createElement('option');
const max = new Date().getFullYear();
const min = max - 10;


for(let i = max; i >  min; i--) {
    const option =  document.createElement('option');
    option.value = i;
    option.innerText = i;
    document.querySelector('#year').appendChild(option);
}

//Generate an object with searching
const dataSearch = {
    brand : '',
    year: '',
    minimum : '',
    maximum: '',
    doors: '',
    transmission:'',
    colour:''
}

document.addEventListener('DOMContentLoaded', () => {
    showCars(cars);
});

// Form event Listeners 
brand.addEventListener('input', e => {
    dataSearch.brand = e.target.value;

    // Calls carFilter function
    carFilter();
});


year.addEventListener('input', e => {
    dataSearch.year = parseInt(e.target.value);
    carFilter();
});


minimum.addEventListener('input', e => {
    dataSearch.minimum = parseInt(e.target.value);
    carFilter();
});


maximum.addEventListener('input', e => {
    dataSearch.maximum = parseInt(e.target.value);
    carFilter();
});


doors.addEventListener('input', e => {
    dataSearch.doors = parseInt(e.target.value);
    carFilter();
});


transmission.addEventListener('input', e => {
    dataSearch.transmission = e.target.value
    carFilter();
});


colour.addEventListener('input', e => {
    dataSearch.colour = e.target.value
    carFilter();
});

function cleanHTML() {
    // Read result element
    const container = document.querySelector('#result');

    //Delete previous HTML
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function showCars(cars){
    cleanHTML();

    // Read result element
    const container = document.querySelector('#result');

    // Build cars HTML
    cars.forEach(car => {
        const carHTML = document.createElement('p');
        carHTML.innerHTML = `
            <p>${car.brand} ${car.model} - ${car.year} - ${car.doors} Doors - 
            Transmission: ${car.transmission} - Price: $${car.price} - Colour: ${car.colour}</p>
        `;
        container.appendChild(carHTML);
    })
}
function noResult() {
    cleanHTML();

    const noResult = document.createElement('div');
    noResult.classList.add('alert', 'error');
    noResult.appendChild(document.createTextNode('No results'));
    document.querySelector('#result').appendChild(noResult);
}

function carFilter() {
   const result = cars.filter(brandFilter).filter(yearFilter)
   .filter(minFilter).filter(maxFilter).filter(doorsFilter)
   .filter(transFilter).filter(colourFilter);

   if(result.length){
        showCars(result);
   } else {
       noResult();
   }
}


// Apply filters
function brandFilter(car) {
    if(dataSearch.brand){
        return car.brand === dataSearch.brand;
    } 
    return car;
}
function yearFilter(car) {
    if(dataSearch.year){
        return car.year === dataSearch.year;
    }
    return car;
}

function minFilter(car) {
    if(dataSearch.minimum){
        return car.price >= dataSearch.minimum;
    }
    return car;
}
function maxFilter(car) {
    if(dataSearch.maximum){
        return car.price <= dataSearch.maximum;
    }
    return car;
}
function doorsFilter(car) {
    if(dataSearch.doors){
        return car.doors === dataSearch.doors;
    }
    return car;
}

function transFilter(car) {
    if(dataSearch.transmission){
        return car.transmission === dataSearch.transmission;
    } 
    return car;
}

function colourFilter(car){
    if(dataSearch.colour){
        return car.colour === dataSearch.colour;
    } 
    return  car;
}
