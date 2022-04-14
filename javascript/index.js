const productCardContainer = document.getElementById('product-card-container');
const cartContainer = document.getElementById('cart-container');

document.addEventListener('DOMContentLoaded', (e) => {
    loadMainPage();    
    e.preventDefault();
})

//Get data from API and for each product send it to the renderProducts function
const loadMainPage = () => {
    fetch('http://localhost:3000/products')
    .then(resp => resp.json())
    .then(products => {
        products.forEach(product => {
            //console.log(product)
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

const formDiv = document.createElement('div')
formDiv.id = 'form-div'
//create form after clicking on account in nav bar
function createForm() {
    const formContainer = createElem('div');
    formContainer.id = "form-account-container"

    const form = createElem('form');
    form.id = "form-account"

    const h4 = createElem('h4');
    h4.textContent = 'Create an account to get exclusive online offers and updates!';

    const nameLabel = createElem('label');
    nameLabel.textContent = 'First Name:';
    
    const nameInput = createElem('input');
    nameInput.type = 'text';
    nameInput.placeholder = "Enter first name";

    const lastNameLabel = createElem('label');
    lastNameLabel.textContent = 'Last Name:';
    
    const lastNameInput = createElem('input');
    lastNameInput.type = 'text';
    lastNameInput.placeholder = "Enter last name";

    const emailLabel = createElem('label');
    emailLabel.textContent = 'Email:';
    
    const emailInput = createElem('input');
    emailInput.type = 'text';
    emailInput.placeholder = "Email";

    const submitButton = createElem('input');
    submitButton.type = 'submit';
    submitButton.value = "CREATE AN ACCOUNT";

    form.append(h4, nameLabel, nameInput, lastNameLabel, lastNameInput, emailLabel, emailInput, submitButton); 
    formContainer.append(form);
    formDiv.append(formContainer); 
}

    //event listener for Account tab ADD DIV TO HTML TO APPEND???
    const account = selectElement('account');
    account.addEventListener('click', (e) => {
        e.preventDefault();
        resetCardContainer();
        createForm();  
    })
    
    //event listener for submit
    
    


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

