// Récupération du panier dans le local storage
let basket = getBasket();

if(basket.length == 0){
    alert('Votre panier est vide')
}

// Récupération des éléments HTML avec l'interpolation de variables 
// Pour chaque produits dans le panier

document.querySelector('#cart__items').innerHTML = "";
for(let product of basket){
    let productId = product.productId;
    console.log(productId)
    getProduct(productId).then(function(refProduct){
        document.querySelector('#cart__items').innerHTML +=

        `<article class="cart__item" data-id="${product.productId}" data-color="${product.color}">
    
        <div class="cart__item__img">
        <img src="${refProduct.imageUrl}" alt="${refProduct.altTxt}"></img>
        </div>
    
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.color}</p>
            <p>${refProduct.price}€</p>
        </div>
    
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>${product.quantity} </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}"></input>
        </div>
                <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
        </article> `
            
        });

    

    }