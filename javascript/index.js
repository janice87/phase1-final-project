const BASE_URL = 'http://localhost:3000'
const productCardContainer = document.getElementById('product-card-container');
const cartContainer = document.getElementById('cart-container');

document.addEventListener('DOMContentLoaded', () => {
    fetchAPI();    
})

//Get data from API and for each product send it to the renderProducts function
const fetchAPI = () => {
    fetch(BASE_URL + '/products/')
    .then(resp => resp.json())
    .then(products => {
        products.forEach(product => {
            //console.log(product)
            renderProducts(product) })
        
    })
}

//clear container
const resetCardContainer = () => {
    productCardContainer.innerHTML = "";
}

//Helper functions
const createElem = tag => document.createElement(tag);
const selectElement = id => document.getElementById(id);

function renderProducts(product){
    const productCard = createElem('div');
    productCard.className = 'product-card';

    const image = createElem('img');
    image.src = product["image_link"];
    image.className = 'image-card';
      
    const name = createElem('p');
    name.textContent = product.name;
    name.className = 'product-name';

    const price = createElem('p');
    price.textContent = `$ ${product.price}0`;
    price.className = 'product-price';

    const addButton = createElem('button');
    addButton.textContent = 'ADD';
    addButton.addEventListener('click', (e, product) => {
        addButton.className = "add-to-cart"
        addToCart(e, product)
    })
    

    const deleteButton = createElem('button');
    deleteButton.textContent = 'DELETE';
    //deleteButton.addEventListener('click', deleteFromCart)
   
    productCardContainer.appendChild(productCard);
    productCard.append(image, name, price, addButton, deleteButton);
} 

//want this to display whats in cart
const cart = document.getElementById('cart')
cart.addEventListener('click', e => {
    e.preventDefault();
    resetCardContainer();

})

//when add is clicked we want that object to be added to this array
// const addToCart = (e, product) => {
//     let productsInCart = [];
//     if(e.target.classList.contains('add-to-cart')) {
//         productsInCart.push(product)
//     }
//     console.log(e.target)
    
// }

// const deleteFromCart = () => {

// }

// const getCart = () => {
//     resetCardContainer();
// }

//event listener for allproducts
const allProducts = selectElement('all-products');
allProducts.addEventListener('click', (e) => {
    e.preventDefault();
    resetCardContainer();
   
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(products => {
        products.forEach(product => renderProducts(product))
    })  
});

// event listener
    const eyes = selectElement('eyes');
    eyes.addEventListener('click', (e) => {
        e.preventDefault();
        resetCardContainer();
        
        fetch('http://localhost:3000/eyes/') 
        .then(resp => resp.json())
        .then(products => 
            products.forEach(product => renderProducts(product))
        )
    })

    const lips = selectElement('lips');
    lips.addEventListener('click', (e) => {
        e.preventDefault();
        resetCardContainer();
        
        fetch('http://localhost:3000/lips/') 
        .then(resp => resp.json())
        .then(products => 
            products.forEach(product => renderProducts(product))
        )
    })

    const faces = selectElement('faces');
    faces.addEventListener('click', (e) => {
        e.preventDefault();
        resetCardContainer();
        
        fetch('http://localhost:3000/faces/') 
        .then(products => 
            products.forEach(product => console.log(product))
        )
    })

