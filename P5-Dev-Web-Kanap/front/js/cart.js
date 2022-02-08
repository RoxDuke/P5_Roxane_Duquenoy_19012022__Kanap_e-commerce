// Récupération des éléments HTML avec l'interpolation de variables 
// Pour chaque produits dans le panier
async function addItems(){
    document.querySelector('#cart__items').innerHTML = "";
    for(let product of basket){
        await getProduct(product.productId).then(function(refProduct){
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
                
        })
    }
}

async function addListerners(){        
// Modification de l'élément dans le panier avec délégation d'événements
        let itemQuantity = document.getElementsByClassName("cart__item")
        
        
        for(cartItem of itemQuantity){
            console.log(cartItem.getAttribute("data-id"))
            let color = cartItem.dataset.color
            let productId = cartItem.dataset.id 
            
            
            cartItem.addEventListener("change", function(item){
                let quantity = item.target.closest(".itemQuantity").value;
                
                changeQuantity(productId, color, quantity)
//VERIFIER MAJ QTE/ PB ID 
                let newQuantity = document.querySelector(".itemQuantity").value;
                newQuantity.textContent = item.target.value;
           console.log(newQuantity)
//
            })
// //VERIFIER SUPP PDT + ACTUALISATION DE LA PAGE            
//              cartItem.addEventListener("click", function(remove){
//                 let removeItem = remove.target.closest("[data-id]");
//                 let product = removeItem.dataset;
//                 removeFromBasket(productId);
//                 window.location.assign("cart.html")
//                 console.log(productId)
//  //               
            // })
            
}
}
               
async function create_cart(){
    await addItems()
    addListerners()
   
}

// Récupération du panier dans le local storage
let basket = getBasket();

if(basket.length == 0){
    alert('Votre panier est vide')
}
else{
    create_cart()
}      
setTotalQuantity()
setTotalPrice()
console.log(totalPrice)

//---------Formulaire pour passer la commande---------
//Formulaire utilisateur
let form = document.querySelector(".cart__order__form");

form.addEventListener("submit", function (element) {
    element.preventDefault()
    let userFirstName = document.getElementById("firstName");
    let userLastName = document.getElementById("lastName");
    let userAddress = document.getElementById("address");
    let userCity = document.getElementById("city");
    let userEmail = document.getElementById("email");
    let order = document.getElementById("order");
    
//Création de l'object contact
    contact = {
    firstName : userFirstName,
    lastName : userLastName,
    address : userAddress, 
    city : userCity,
    email : userEmail,
    }



})