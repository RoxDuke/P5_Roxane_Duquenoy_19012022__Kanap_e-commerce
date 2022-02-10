// Récupération des éléments HTML avec l'interpolation de variables 
// Pour chaque produits dans le panier
async function addItems(){
    let basket = getBasket();
    document.querySelector('#cart__items').innerHTML = "";
    allProduct = [];
    for(let product of basket){
        apiProduct = await getProduct(product.productId).then(function(refProduct){
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

            return refProduct;     
        })
     allProduct.push(apiProduct);

    }
    return allProduct;
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
                localStorage.setItem(quantity, newQuantity)
                create_cart()
           console.log(newQuantity)
//
            })
//VERIFIER SUPP PDT + ACTUALISATION DE LA PAGE      
             cartItem.addEventListener("click", function(remove){
                let removeItem = remove.target.closest("[data-id]");
                let product = removeItem.dataset;
                removeFromBasket(productId);
                create_cart()
                console.log(productId)            
            })
            
}
}
async function create_cart(){
    let refBasket = await addItems();
    (console.log(refBasket))
    addListerners()
    setTotalQuantity()
    setTotalPrice(refBasket)
   
}


//---------Formulaire pour passer la commande---------
//Formulaire utilisateur

function listenerForm(){
    let form = document.querySelector(".cart__order__form");

    form.addEventListener("submit", function (element) {
        element.preventDefault()
        let userFirstName = document.getElementById("firstName").value;
        let userLastName = document.getElementById("lastName").value;
        let userAddress = document.getElementById("address").value;
        let userCity = document.getElementById("city").value;
        let userEmail = document.getElementById("email").value;
        
        
    //Création de l'object contact
        contact = {
        firstName : userFirstName,
        lastName : userLastName,
        address : userAddress, 
        city : userCity,
        email : userEmail,
        }

    saveContact(contact)
    window.location.assign("confirmation.html")
    })


    //Vérification des champs lors du remplissage par l'utilisateur

    form.firstName.addEventListener("change", function (){
        valideName(this);
        console.log(firstName.value)
    })
    form.lastName.addEventListener("change", function(){
        valideName(this);
        console.log(lastName.value)
    })
    form.address.addEventListener("change", function(){
        valideCity(this);
        console.log(address.value)
    })
    form.city.addEventListener("change", function(){
        valideCity(this);
        console.log(city.value)
    })
    form.email.addEventListener("change", function(){
        valideMail(this);
        console.log(email.value)
    })
}