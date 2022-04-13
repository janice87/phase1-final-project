const BASE_URL = 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=benefit'
const productCardContainer = document.getElementById('product-card-container');
//const imageContainer = document.getElementById('image-container');

document.addEventListener('DOMContentLoaded', () => {
    fetchAPI();
    
})

//Get data from API and for each product send it to the renderProducts function
const fetchAPI = () => {
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(products => {
        products.forEach(product => renderProducts(product))
    })
}

//Helper functions
const createElem = tag => document.createElement(tag);

const renderProducts = (product) => {
    const productCard = createElem('div')
    productCard.className = 'product-card'

    const image = createElem('img');
    image.src = product["api_featured_image"];
      
    const name = createElem('p');
    name.textContent = product.name;

    const price = createElem('p');
    price.textContent = product.price;

    productCardContainer.appendChild(productCard);
    productCard.append(image, name, price);
} 
