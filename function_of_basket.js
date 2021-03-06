//---------------Sur la page du produit---------------//

//Récupérer les éléments du produit dans l'API
function getProduct(productId) {
    return fetch("http://localhost:3000/api/products/" + productId)
        .then(function (response) {
            if (response.status == 200) {
                return response.json()
            }
        })
        .catch(function (error){
            console.log('Erreur'+ error.message)
        })    
}
//Création d'un produit avec les éléments
// ParseInt() pour founir un entier à partir de la chaîne de caractère quantité
function createProduct(productId, name, color, quantity) {
    let product = {
        productId: productId,
        name: name,
        color: color,
        quantity: parseInt(quantity),
    }
    return product
}
//Sauvegarde du panier, envoi vers local storage
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}
//Si le panier est vide, un tableau est retourné, sinon, les éléments du panier s'affichent
function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
    }
    else {
        return JSON.parse(basket);
    }
}
// Fonction pour rechercher/trouver un produit et me renvoyer le numéro de case
function findProduct(basket, id, color) {
    let i = 0;
    index = -1
    basket.forEach(function (product, i) {
        if (product.productId == id) {
            if (product.color == color)
                index = i
        }
    })
    return index
}
//Ajout du panier avec les produits dans le local storage
function addBasket(productId, name, color, quantity) {
    let basket = getBasket();
    let i = 0;
    let position = findProduct(basket, productId, color);
    let product = createProduct(productId, name, color, quantity);

    if (position == -1) {
        let product = createProduct(productId, name, color, quantity);
        basket.push(product)
    }
    else {
        basket[position].quantity = basket[position].quantity + parseInt(quantity);
    }
    //Sauvegarde du produit dans le panier 
    saveBasket(basket);
}
//-----------------Sur la page panier-------------------//

// //Retirer un produit du panier 
function removeFromBasket(productId) {
    let basket = getBasket();
    // filter = filtrer un tableau par rapport à une condition 
    basket = basket.filter(p => p.productId != productId)
    saveBasket(basket);
}
//Modifier la quantité dans le panier une fois le produit trouvé dans celui-ci
function changeQuantity(productId, color, quantity) {
    let basket = getBasket();
    let position = findProduct(basket, productId, color);
    if (position >= 0) {
        if (quantity <= 0) {
            removeFromBasket(product)
        }
        else {
            if (quantity > 100) {
                quantity = 100
                alert('La quantité ne peut pas être supérieure à 100')
            }
        }
        basket[position].quantity = parseInt(quantity);
    }
    saveBasket(basket);
}
//Calculer la quantité dans le panier
//Nous retourne la quantité du produit dans le panier
function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number = number + product.quantity;
    }
    return number;
}
//Affichage de la quantité totale de produits dans le panier 
//Met à jour la quantité totale
function setTotalQuantity() {
    let totalQuantity = document.getElementById("totalQuantity");
    let newQuantity = document.createTextNode(`${getNumberProduct()}`);
    if (newQuantity != undefined) {
        totalQuantity.replaceChild(newQuantity, totalQuantity.childNodes[0])
    }
    //Sinon, ajoute la nouvelle quantité à la fin de la liste du parent(totalQuantity)
    else {
        totalQuantity.appendChild(newQuantity)
    }
}
//Calculer le prix
//Récupére le prix du produit dans le tableau
function getPrice(refBasket, productId) {
    for (product of refBasket) {
        if (productId == product._id) {
            return product.price;
        }
    }
}
//Retourne le prix total des articles du panier 
function getTotalPrice(refBasket) {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
        total += product.quantity * getPrice(refBasket, product.productId);
    }
    return parseInt(total);
}
//Affichage du prix total des articles dans le panier 
//Met à jour le prix total
function setTotalPrice(refBasket) {
    let totalPrice = document.getElementById("totalPrice");
    let newPrice = document.createTextNode(`${getTotalPrice(refBasket)}`);
    if (newPrice != undefined) {
        totalPrice.replaceChild(newPrice, totalPrice.childNodes[0])
    }
    else {
        totalPrice.appendChild(newPrice)
    }
}
//------------------Vérification du formulaire-----------
//Envoi vers le local storage
function saveContact(contact) {
    localStorage.setItem("contact", JSON.stringify(contact))
}
//Récupération du contact dans le local storage
function getContact() {
    let contact = localStorage.getItem("contact");
    if (contact == null) {
        return []
    }
    else {
        return JSON.parse(contact)
    }
}
