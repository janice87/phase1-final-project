const BASE_URL = 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=clinique'
const productCardContainer = document.getElementById('product-card-container');


document.addEventListener('DOMContentLoaded', () => {
    fetchAPI();    
})

//Get data from API and for each product send it to the renderProducts function
const fetchAPI = () => {
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(products => {
        products.forEach(product => {
            console.log(product)
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

    const button = createElem('button');
    button.innerText = 'SHOP NOW';
    button.addEventListener('click', (e, product) => {
        e.preventDefault();
        productCard.replace
        fetch(BASE_URL + `${product.id}`)
        .then(resp => resp.json())
        .then(data => console.log(data))    
})

    productCardContainer.appendChild(productCard);
    productCard.append(image, name, price, button);
} 


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

//event listener for brows
const brows = selectElement('brows');
brows.addEventListener('click', (e) => {
    e.preventDefault();
    resetCardContainer();
   
    fetch(BASE_URL + '&product_type=eyebrow')
    .then(resp => resp.json())
    .then(products => {
        products.forEach(product => renderProducts(product))
    })  
});

//event listener for blush
// const blush = selectElement('blush');
// blush.addEventListener('click', (e) => {
//     e.preventDefault();
//     resetCardContainer();
   
//     fetch(BASE_URL + '&product_type=blush')
//     .then(resp => resp.json())
//     .then(products => {
//         products.forEach(product => renderProducts(product))
//     })  
// });

//event listener for bronzer
const bornzer = selectElement('bronzer');
bronzer.addEventListener('click', (e) => {
    e.preventDefault();
    resetCardContainer();
   
    fetch(BASE_URL + '&product_type=bronzer')
    .then(resp => resp.json())
    .then(products => {
        products.forEach(product => renderProducts(product))
    })  
});

//event listener for eyeliner
const eyeliner = selectElement('eyeliner');
eyeliner.addEventListener('click', (e) => {
    e.preventDefault();
    resetCardContainer();
   
    fetch(BASE_URL + '&product_type=eyeliner')
    .then(resp => resp.json())
    .then(products => {
        products.forEach(product => renderProducts(product))
    })  
});

//event listener for eyeshadow
const eyeshadow = selectElement('eyeshadow');
eyeshadow.addEventListener('click', (e) => {
    e.preventDefault();
    resetCardContainer();
   
    fetch(BASE_URL + '&product_type=eyeshadow')
    .then(resp => resp.json())
    .then(products => {
        products.forEach(product => renderProducts(product))
    })  
});

//event listener for foundation
const foundation = selectElement('foundation');
foundation.addEventListener('click', (e) => {
    e.preventDefault();
    resetCardContainer();
   
    fetch(BASE_URL + '&product_type=foundation')
    .then(resp => resp.json())
    .then(products => {
        products.forEach(product => renderProducts(product))
    })  
});

//event listener for lipstick
const lipstick = selectElement('lipstick');
lipstick.addEventListener('click', (e) => {
    e.preventDefault();
    resetCardContainer();
   
    fetch(BASE_URL + '&product_type=lipstick')
    .then(resp => resp.json())
    .then(products => {
        products.forEach(product => renderProducts(product))
    })  
});

//Helper function for event listener

const blush = selectElement('blush');

function eventListenerTemplate (element) {
    //const ${element} = selectElement('${element}');
    element.addEventListener('click', (e) => {
        console.log(e.target)
        e.preventDefault();
        resetCardContainer();
        
        fetch(BASE_URL + `&product_type=${element}`) //does this not work?
        .then(resp => resp.json())
        .then(products => 
            products.forEach(product => console.log(product))
            )  
        });
    }
    
    eventListenerTemplate(blush);


