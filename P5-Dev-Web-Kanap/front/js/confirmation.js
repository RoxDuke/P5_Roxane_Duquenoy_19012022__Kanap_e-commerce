//Récupération du panier et du contact pour confirmer la commande
let basket = getBasket();
let contact = getContact();
let products = basket.map(function(product){
    
    return product.productId
})
console.log(products)

let orderConfirm = {
    contact : contact,
    products : products,
    
}
console.log(orderConfirm)

// Requête POST vers l'API pour envoyer la commande
//Paramètres pour utiliser la requête POST
let sendParams = {
    method: "POST",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body: JSON.stringify(orderConfirm)
};
//Envoi vers le serveur 
fetch("http://localhost:3000/api/products/order", sendParams)
    .then(function(response){
        return response.json();
    }).then(function(order){
        console.log(order)
        let orderId = document.getElementById("orderId");
        let newOrderId = document.createTextNode(`${order.orderId}`);
        if(newOrderId != undefined){
            orderId.replaceChild(newOrderId, orderId.childNodes[0]);
        }
})
    try{
        Error("Erreur")
    }
    catch{
        console.log("Erreur")
    }

    
