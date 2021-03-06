const productCardContainer = document.getElementById('product-card-container');

//Helper functions
const createElem = tag => document.createElement(tag);
const selectElement = id => document.getElementById(id);

document.addEventListener('DOMContentLoaded', () => {
    loadMainPage();   
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
    addButton.textContent = 'ADD TO CART';
    addButton.className = "add-button"
    addButton.addEventListener('click', (event) => {
        const total = selectElement('total');
        let amount = event.target.previousElementSibling.innerText //this is the price $28
        let add = amount.replace("$", "") //just the integer 28
            if(total.innerHTML === '0') {
            total.innerHTML = `${parseInt(add)}`
            } else {
            total.innerHTML = parseInt(total.innerHTML) + parseInt(add)
        }       
    })
    
    const emptyCart = selectElement('empty-cart')
    emptyCart.addEventListener('click', () => total.innerHTML = '0')

    const hideForm = selectElement('form-signup');
    hideForm.hidden = true;

    productCardContainer.append(productCard);
    productCard.append(image, name, price, addButton);
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
    likeButton.textContent = "??? ADD TO WISHLIST";
    likeButton.addEventListener('click', () => alert("Added to your wishlist!"));
      
    productCardContainer.appendChild(oneCard);
    oneCard.append(image, name, price, desc, button, likeButton);
    return oneCard;
}


const formContainer = selectElement('form-container');
const form = selectElement('form-signup');

const createForm = () => { 

    const content = createElem('p');
    content.textContent = 'Create an account and get exclusive offers and updates!';

    const name = createElem('input')
    name.type = 'text'
    name.placeholder = 'Enter name here'
    
    const emailInput = createElem('input');
    emailInput.type = 'text';
    emailInput.placeholder = "Email";

    const password = createElem('input');
    password.type = 'password';
    password.placeholder = "Enter password here";

    const submitButton = createElem('input');
    submitButton.type = 'submit';
    submitButton.value = "SUBMIT";

    form.append(content, name, emailInput, password, submitButton); 
    formContainer.append(form);    
}

const account = selectElement('account')
account.addEventListener('click', () => {
    resetCardContainer();
    createForm()
    
    const hideForm = selectElement('form-signup');
    hideForm.hidden = false;
    hideForm.hidden = false ? hideForm.hidden = true : hideForm.hidden = false 
    
})

//event listener to submit form
form.addEventListener('submit', e => {
    e.preventDefault();
    alert("Thank you for creating an account!");
    form.reset(); 
   
    const hideForm = selectElement('form-signup');
    hideForm.innerHTML = "";
   
    const thankyou = createElem('p')
    thankyou.innerText = 'You have been added to our list for exclusive updates!'

    const submitMessage = selectElement('form-container')
    submitMessage.append(thankyou);
})  

//event listener for tabs
const allProducts = selectElement('all-products');
allProducts.addEventListener('click', () => {
    resetCardContainer();
    fetch('http://localhost:3000/products')
    .then(resp => resp.json())
    .then(products => {
        products.forEach(product => renderProducts(product))
    })  
});

//Event listener helper function for remaining tabs
    const eyes = selectElement('eyes');
    const lips = selectElement('lips');
    const faces = selectElement('faces');
    function fetchProducts(element) {
        element.addEventListener('click', () => { //element is the eyes a tag
                resetCardContainer();
                fetch(`http://localhost:3000/${element.id}/`) //returns http://localhost:3000/eyes/ eyes a tag id="eyes"
                .then(resp => resp.json())
                .then(products => 
                    products.forEach(product => renderProducts(product))
                )
            })
    }
    fetchProducts(eyes);
    fetchProducts(lips);
    fetchProducts(faces);

    
