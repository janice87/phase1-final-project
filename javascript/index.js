const productCardContainer = document.getElementById('product-card-container');
const cartContainer = document.getElementById('cart-container');

//Helper functions
const createElem = tag => document.createElement(tag);
const selectElement = id => document.getElementById(id);

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

function renderProducts(product){
    const productCard = createElem('div');
    productCard.className = 'product-card';
    
    const image = createElem('img');
    image.src = product["image_link"];
    image.className = 'image-card';
    image.addEventListener('click', () => showProduct(product))
      
    const name = createElem('p');
    name.textContent = product.name;
    name.className = 'product-name';

    const price = createElem('p');
    price.textContent = `$ ${product.price}0`;
    price.className = 'product-price';

    const addButton = createElem('button');
    addButton.textContent = 'ADD';
    addButton.className = "add-button"
    addButton.addEventListener('click', () => {
        const total = selectElement('total');
        let prices = [];
        let price = parseInt(product.price, 10)
        prices.push(price);
        let sum = prices.reduce((acc, price) => acc + price)
        total.innerHTML = `$ ${sum}`; 
    })
        
    const deleteButton = createElem('button');
    deleteButton.textContent = 'REMOVE';
    deleteButton.addEventListener('click', () => {
        const total = selectElement('total');
        let prices = [];
        let price = parseInt(product.price, 10)
        prices.pop();
        let sum = prices.reduce((acc, price) => acc - price)
        total.innerHTML = `$ ${sum}`;          
    })
      
    productCardContainer.appendChild(productCard);
    productCard.append(image, name, price, addButton, deleteButton);
} 

//get data  for displaying one card
const showProduct = (product) => {
fetch(`http://localhost:3000/products/${product.id}`)
.then(resp => resp.json())
.then(product => {
    const oneCard = showOneCard(product)
    oneCard.className = "show-one-card"
    productCardContainer.replaceChildren(oneCard)
}) 
}

function showOneCard (product) {
    const oneCard = createElem('div');

    const image = createElem('img');
    image.src = product["image_link"];
    image.className = 'image-card';

    const name = createElem('h5');
    name.textContent = product.name;

    const price = createElem('p');
    price.innerHTML = `$ ${product.price}0`;

    const desc = createElem('p');
    desc.textContent = product.description;

    const button = createElem('button');
    button.textContent = 'ADD TO CART';

    const likeButton = createElem('button');
    likeButton.textContent = "♥ ADD TO WISHLIST";
    likeButton.addEventListener('click', () => alert("Added to your wishlist!"));
      
    productCardContainer.appendChild(oneCard);
    oneCard.append(image, name, price, desc, button, likeButton);
    return oneCard;
}


const formContainer = selectElement('form-container');
const form = selectElement('form-signup');

function createForm() { 
    const content = createElem('p');
    content.textContent = 'Sign up exclusive offers and updates!';
    
    const emailInput = createElem('input');
    emailInput.type = 'text';
    emailInput.placeholder = "Email";

    const submitButton = createElem('input');
    submitButton.type = 'submit';
    submitButton.value = "SUBMIT";

    form.append(content, emailInput, submitButton); 
    formContainer.append(form);
}

//event listener to submit form
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

// const faces = selectElement('faces');
// faces.addEventListener('click', (e) => {
//         e.preventDefault();
//         resetCardContainer();
//         fetch('http://localhost:3000/faces/') 
//         .then(resp => resp.json())
//         .then(products => 
//             products.forEach(product => renderProducts(product))
//         )
//     })

    const faces = selectElement('faces');
    function fetchProducts(element) {
        element.addEventListener('click', (e) => {
                e.preventDefault();
                resetCardContainer();
                fetch(`http://localhost:3000/${element}/`) 
                .then(resp => resp.json())
                .then(products => 
                    products.forEach(product => renderProducts(product))
                )
            })
    }
    fetchProducts(faces);


