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





// //Retirer un produit du panier 
// function removeFromBasket(product){
//     let basket = getBasket();
//     basket = basket.filter(p => product.id != product.id)
//     saveBasket(basket);
// }

// //Modifier la quantité dans le panier 
// function changeQuantity(productId, quantity){
//     let basket = getBasket();
//     let foundProduct = basket.find(p => p.id == product.id);
//     if (foundProduct !=undefined){
//         foundProduct.quantity += quantity;
//         if(foundProduct.quantity <= 0){
//             removeFromBasket(foundproductId);
//         }
//         else{
//             saveBasket(basket);
//         }
//     } 
// }

// //Calculer la quantité à partir du panier
// function getNumberProduct(){
//     let basket = getBasket();
//     let number = 0;
//     for(let product of basket){
//         number += product.id.quantity;
//     }
//     return number; 
// }

// //Calculer le prix
// function getTotalPrice(){
//     let basket = getBasket();
//     let total = 0;
//     for (let productId of basket){
//         number += product.id.quantity * product.id.price;
//     }
//     return number;
// }