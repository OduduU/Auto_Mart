// Variables
let galleryModal = document.getElementById('myModal'),
    slideIndex = 0,
    miniModalImg = document.getElementById('img01'),
    modalElements = document.getElementsByClassName('modal'),
    cars = document.querySelector('#cars-list'),
    shoppingCart = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('.clear-cart');

// Event Listeners

eventListeners();

function eventListeners() {
    //Start slideshow when the page is loaded
    document.addEventListener('DOMContentLoaded', showSlides);

    // Document Ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);

    // When a car is added
    cars.addEventListener('click', buyCar);

    // When the remove button is clicked
    shoppingCart.addEventListener('click', removeCar);

    // Clear Cart Btn
    clearCartBtn.addEventListener('click', clearCart);
}

// Functions

//Slide show
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1} 
    slides[slideIndex-1].style.display = "block"; 
    setTimeout(showSlides, 5000); // Change image every 2 seconds
}

//Header
function displayHeader() {
    let headerContainer = document.getElementById("myTopnav");
    if (headerContainer.className === "topnav") {
        headerContainer.className += " responsive";
    } else {
        headerContainer.className = "topnav";
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target.className === 'modal') {
      for (let i = 0; i < modalElements.length; i++) {
        modalElements[i].style.display = 'none';
      }
    }
}

// Modal from mini gallery images
function miniGallery(image) {
    galleryModal.style.display = 'block';
    miniModalImg.src = image.src;
}

// function to close the modal when X is clicked
function modalClose() {
    //modal.parentElement.style.display = 'none';
    for (let i = 0; i < modalElements.length; i++) {
      modalElements[i].style.display = 'none';        
    }
}

//function to display the create add modal
function createAddModal() {
    let createAdd = document.getElementById('add');
    createAdd.style.display = 'block';
}

//function to display edit ad modal
function editAddModal() {
    let editAdd = document.getElementById('update');
    editAdd.style.display = 'block';
}

//function to display cart modal
function cartModal() {
    let cart = document.getElementById('car-cart');
    cart.style.display = 'block';
}

//function to display sign in modal
function signInModal() {
    let signModal = document.getElementById('id0');
    signModal.style.display = 'block';
}

//function to display sign up modal
function signUpModal() {
    let signup = document.getElementById('id01');
    signup.style.display='block';
}

//function to display admin delete modal
function displayDeleteModal() {
    let adminDelete = document.getElementById('id01');
    adminDelete.style.display='block';
}

// Adding purchase(s) to chart
function buyCar(e) {
    //e.preventDefault();
    // Use delegation to find the course that was added
    if(e.target.classList.contains('add-to-cart')) {
         // read the car details
         const car = e.target.parentElement.parentElement;

         // read the values
         getCarInfo(car);
    }
}

// Reads the HTML information of the selected car
function getCarInfo(car) {
    // Create an Object with Car details
    const carInfo = {
         image: car.querySelector('img').src,
         title: car.querySelector('h3 b').textContent,
         price: car.querySelector('p i').textContent,
         id: car.querySelector('p button').getAttribute('data-id')
    }
    // Insert into the shopping cart
    addIntoCart(carInfo);
}

// Display the selected course into the shopping cart
function addIntoCart(car) {
    // create a <tr>
    const row = document.createElement('tr');

    // Build the template
    row.innerHTML = `
        <td>
            <img src="${car.image}" width=100>
        </td>
        <td>${car.title}</td>
        <td>${car.price}</td>
        <td>
            <a href="#" class="remove" data-id="${car.id}">X</a>
        </td>
    `;
    // Add into the shopping cart
    //document.querySelector('#cart-total').style.display = "block";
    shoppingCart.insertBefore(row, document.querySelector('#cart-content tbody #cart-total'));
    //shoppingCart.appendChild(row);

    // Add course into Storage
    saveIntoStorage(car);
}

// Add the cars into the local storage
function saveIntoStorage(car) {
    let cars = getCarsFromStorage();

    // add the cars into the array
    cars.push(car);

    // since storage only saves strings, we need to convert JSON into String
    localStorage.setItem('cars', JSON.stringify(cars) );
}

// Get the contents from storage
function getCarsFromStorage() {

    let cars;

    // if something exist on storage then we get the value, otherwise create an empty array
    if(localStorage.getItem('cars') === null) {
        cars = [];
    } else {
        cars = JSON.parse(localStorage.getItem('cars') );
    }
    return cars;

}

// remove cars from the dom
function removeCar(e) {
    let car, carId;

    // Remove from the dom
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        car = e.target.parentElement.parentElement;
        carId = car.querySelector('a').getAttribute('data-id');
    }
    // remove from the local storage
    removeCarLocalStorage(carId);
}

// remove deleted car from local storage
function removeCarLocalStorage(id) {
    // get the local storage data
    let carsLS = getCarsFromStorage();

    // loop through the array and find the index to remove
    carsLS.forEach(function(carLS, index) {
        if(carLS.id === id) {
            carsLS.splice(index, 1);
        }
    });

    // Add the rest of the array
    localStorage.setItem('cars', JSON.stringify(carsLS));
}

// Clears the shopping cart
function clearCart() {
    // shoppingCartContent.innerHTML = '';

    while(shoppingCart.firstChild) {
        shoppingCart.removeChild(shoppingCart.firstChild);
    }

    // Clear from Local Storage
    clearLocalStorage();
}
// Clears the whole local storage
function clearLocalStorage() {
    localStorage.clear();
}

// Loads when document is ready and display cars in the shopping cart
function getFromLocalStorage() {
    let carsLS = getCarsFromStorage();

    // Loop through the cars and display cars in the shopping cart
    carsLS.forEach(function(car) {
        // create the <tr>
        const row = document.createElement('tr');

        // print the content
        row.innerHTML = `
            <td>
                <img src="${car.image}" width=100>
            </td>
            <td>${car.title}</td>
            <td>${car.price}</td>
            <td>
                <a href="#" class="remove" data-id="${car.id}">X</a>
            </td>
        `;
        shoppingCart.appendChild(row);
    });
}