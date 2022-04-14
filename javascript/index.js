const productCardContainer = document.getElementById('product-card-container');
const cartContainer = document.getElementById('cart-container');

document.addEventListener('DOMContentLoaded', (e) => {
    loadMainPage();    
    e.preventDefault();
    createForm();
})

//Get data from API and for each product send it to the renderProducts function
const loadMainPage = () => {
    fetch('http://localhost:3000/products')
    .then(resp => resp.json())
    .then(products => {
        products.forEach(product => {
            renderProducts(product) 
           
        })        
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
    addButton.addEventListener('click', () => {
        const total = selectElement('total');
        let sum = 0;
        let price = parseInt(product.price, 10)
        sum += price
        total.innerHTML = `$ ${sum}`;      
    })

    const deleteButton = createElem('button');
    deleteButton.textContent = 'DELETE';
    deleteButton.addEventListener('click', () => {
        const total = selectElement('total');
        let sum = 0;
        let price = parseInt(product.price, 10)
        sum -= price
        total.innerHTML = `$ ${sum}`;          
    })
   
    productCardContainer.appendChild(productCard);
    productCard.append(image, name, price, addButton, deleteButton);
} 

const formContainer = selectElement('form-container');
const form = selectElement('form-signup');

function createForm() { 
    const content = createElem('p');
    content.textContent = 'Sign up exclusive online offers and updates!';
    
    const emailInput = createElem('input');
    emailInput.type = 'text';
    emailInput.placeholder = "Email";

    const submitButton = createElem('input');
    submitButton.type = 'submit';
    submitButton.value = "SUBMIT";

    form.append(content, emailInput, submitButton); 
    formContainer.append(form);
}

//event listener for submit
form.addEventListener('submit', e => {
    e.preventDefault();
    form.reset();
})  


//event listener for tabs
const allProducts = selectElement('all-products');
allProducts.addEventListener('click', (e) => {
    e.preventDefault();
    resetCardContainer();
    fetch('http://localhost:3000/products')
    .then(resp => resp.json())
    .then(products => {
        products.forEach(product => renderProducts(product))
    })  
});

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
        .then(resp => resp.json())
        .then(products => 
            products.forEach(product => renderProducts(product))
        )
    })

