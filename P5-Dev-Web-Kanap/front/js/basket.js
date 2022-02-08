//---------------Sur la page du produit---------------//

//Récupérer les éléments du produit dans l'API
function getProduct(productId){
    return fetch("http://localhost:3000/api/products/"+productId)
        .then(function(response){
            if(response.status == 200){
               return response.json()
            }              
        })
    }
//Création d'un produit avec les éléments
// ParseInt() pour founir un entier à partir de la chaîne de caractère quantité
function createProduct(productId, name, color, quantity){
    let product ={
        productId : productId,
        name : name, 
        color : color,
        quantity : parseInt(quantity),
    }
    return product
}
//Enregistrer le panier, envoi vers local storage
function saveBasket(basket){
    localStorage.setItem("basket",JSON.stringify(basket));
}
//Si le panier est vide, un tableau est retourné, sinon, les éléments du panier s'affichent
function getBasket () {
    let basket = localStorage.getItem("basket");
    if(basket == null){
        return [];
    }
    else{
        return JSON.parse(basket);
    }
}
// Fonction pour rechercher un produit et me renvoyer le numéro de case
function findProduct(basket,id, color){
    let i = 0;
    index=-1
    basket.forEach(function(product,i){
        if(product.productId == id){
            if(product.color == color)
            index=i  
        }
    })
    return index
}
//Ajout du panier avec les produits dans le local storage
function addBasket(productId, name, color, quantity){
    let basket = getBasket(); 
    let i = 0;
    let position = findProduct(basket, productId, color);
    let product = createProduct(productId, name, color, quantity);

    if (position == -1){
        let product = createProduct(productId,name, color, quantity);
        basket.push(product) 
        console.log(product)
    }
    else{
        basket[position].quantity = basket[position].quantity + parseInt(quantity);
    }  
//Ajout du produit dans le panier 
    saveBasket(basket);
}

//-----------------Sur la page panier-------------------//

// //Retirer un produit du panier 
function removeFromBasket(productId){
     let basket = getBasket();
// filter = filtrer un tableau par rapport à une condition 
     basket = basket.filter(p => p.productId != productId)
     saveBasket(basket);
}
//Modifier la quantité dans le panier une fois le produit trouvé dans celui-ci
function changeQuantity(productId,color,quantity){
    console.log("id: "+productId+" color: "+color+" qte: "+quantity)
    let basket = getBasket();
    let position = findProduct(basket, productId, color);
        if(position >= 0){
            if(quantity <= 0){
                removeFromBasket(product) 
            }
                else{
                    if(quantity > 100){
                    quantity = 100
                    alert ('La quantité ne peut pas être supérieure à 100')
                }}
            basket[position].quantity = parseInt(quantity);
        }
        else{
            console.log("product not found")
        }
        console.log(changeQuantity)
    saveBasket(basket);
 }
 
//Calculer la quantité dans le panier
//Nous retourne le nombre d'articles dans le panier
function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for(let product of basket){
        number = number + product.quantity;
    }
    return number; 
    
}
//Affichage de la quantité de produits dans le panier 
function setTotalQuantity(){
    let totalQuantity = document.getElementById("totalQuantity");
    let newQuantity = document.createTextNode(`${getNumberProduct()}`);
    if (newQuantity != undefined){
        totalQuantity.replaceChild(newQuantity, totalQuantity.childNodes[0])
    }
//Sinon, ajoute la nouvelle quantité à la fin de la liste du parent(totalQuantity)
    else{
        totalQuantity.appendChild(newQuantity)
    }
}
//Calculer le prix
//Nous retourne le prix total des articles du panier 
function getTotalPrice(){
    let basket = getBasket();
    let number = 0;
    for (let product of basket){
        number = number + product.quantity * product.price;
    }
    return number;

}

//Affichage du prix total des articles dans le panier 
function setTotalPrice(){
    let totalPrice = document.getElementById("totalPrice");
    let newPrice = document.createTextNode(`${getTotalPrice()}`);
    if (newPrice != undefined){
        totalPrice.replaceChild(newPrice, totalPrice.childNodes[0])
    }
    else{
        totalPrice.appendChild(newPrice)
    }
}
//------------------Vérification du formulaire-----------
//Vérification du format des champs de saisies, noms/prénoms/ville 
function valideName (inputName){
    let name = new RegExp (/^[a-z ,.'-]+$/i);
    let testName = name.test(inputName.value);
    let message = inputName.nextElementSibling;
    if(testName){
        message.innerHTML = "";
        return true;
    }
    else{
        message.innerHTML ="Invalid";
        return false;
    }
}
//Vérification du format de saisie de mail 
function valideMail(inputMail){
    let mail = new RegExp (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
    let tesMail = mail.test(inputMail.value);
    let message = inputMail.nextElementSibling;
    if(testMail){
        message.innerHTML = "";
        return true;
    }
    else{
        message.innerHTML = "Invalid";
        return false; 
    }
}
//Envoi vers le local storage
function saveContact(contact){
    localStorage.setItem("contact", JSON.stringify(contact))
}
//Récupération du contact dans le local storage
function getContact(){
    let contact = localStorage.getItem("contact");
    if(contact == null){
        return []
    }
    else{
        return JSON.parse(contact)
    }
}
// //Validation du formulaire
// function checkForm(){
// let form = document.querySelector(".cart__order__form");  
// if(document.form.value != ""){
//     //on envoie le formulaire vers l'API

// }
// else{
//     alert('Merci de bien vouloir remplir tout les champs de saisie')

// }
// }