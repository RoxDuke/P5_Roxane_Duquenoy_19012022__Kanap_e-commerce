//Enregistrer le panier, envoi vers local storage
function saveBasket(basket){
    localStorage.setItem("basket",JSON.stringify(basket));
}

//Si le panier est vide, un tableau est retourné, sinon les éléments du panier s'affichent
function getBasket () {
    let basket = localStorage.getItem("basket");
    if(basket == null){
        return [];
    }
    else{
        return JSON.parse(basket);
    }
}

//Ajout du panier avec les produits dans le local storage
function addBasket(productId){
    let basket = getBasket();
    let foundProduct = basket.find(p => pId == productId);
    if (foundProduct !=undefined){
        foundProduct.quantity++;
    }
    else{
        productId.quantity = 1;
        basket.push(productId);
    }
    
//Ajout du produit dans le panier 
    basket.push(productId);
    saveBasket(basket);
}

//Retirer un produit du panier 
function removeFromBasket(productId){
    let basket = getBasket();
    basket = basket.filter(p => pId != productId)
    saveBasket(basket);
}

//Modifier la quantité dans le panier 
function changeQuantity(productId, quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => pId == productId);
    if (foundProduct !=undefined){
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0){
            removeFromBasket(foundproductId);
        }
        else{
            saveBasket(basket);
        }
    } 
}

//Calculer la quantité à partir du panier
function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for(let product of basket){
        number += productId.quantity;
    }
    return number; 
}

//Calculer le prix
function getTotalPrice(){
    let basket = getBasket();
    let total = 0;
    for (let productId of basket){
        number += productId.quantity * productId.price;
    }
    return number;
}