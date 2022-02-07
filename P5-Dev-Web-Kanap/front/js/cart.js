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
                console.log(quantity)
                changeQuantity(productId, color, quantity)

            

       
                let newQuantity = item.target.closest("p.");
                console.log(newQuantity)      
                if(newQuantity != quantity){
                   quantity == newQuantity
console.log(newQuantity)    
                    
             }  
            })
            
             cartItem.addEventListener("click", function(remove){
                let deleteItem = remove.target.closest("[data-id]");
                let productId = deleteItem.dataset;
                removeFromBasket(productId);
                console.log(productId)
                
            })
            
        }}
               



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
console.log(setTotalPrice)

// //Formulaire utilisateur
// let firstName = document.getElementById("firstName");
// let lastName = document.getElementById("lastName");
// let adress = document.getElementById("address");
// let city = document.getElementById("city");
// let email = document.getElementById("email");
// let order = document.getElementById("order");