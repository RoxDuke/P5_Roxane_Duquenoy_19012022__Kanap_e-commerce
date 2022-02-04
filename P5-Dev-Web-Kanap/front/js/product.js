/**
 * Insertion d'un produit grâce à son id
 */

//Récupération de l'id du produit dans l'URL
let params = new URLSearchParams(window.location.search)
let productId = params.get("id");
let urlProduct = new URL ("http://localhost:3000/api/products/"+productId)
console.log("id" , productId);

//Récupération d'un seul et unique produit dans l'API en fonction de l'ID 
fetch("http://localhost:3000/api/products/"+productId)

//Si la réponse de la console est 200
    .then(function(response){

        if(response.status == 200){
            let name = document.getElementById("title");
            let price = document.getElementById("price");
            let description = document.getElementById("description");
            let colors = document.getElementById("colors"); 
            let imgContainer = document.querySelector(".item__img");
            let imgElt = document.createElement("img");
                             
            response.json().then (data =>{
            console.log(data)   
            name.innerHTML = data.name;
            price.innerHTML = data.price;
            description.innerHTML = data.description;
            
//L'img devient l'enfant du container 'item__img'
            imgElt.src = data.imageUrl;
            imgElt.alt = data.altTxt;
            imgContainer.appendChild(imgElt); 

//for Each utilisé pour donner des options de couleurs dans le DOM
                data.colors.forEach (c =>{
                option = document.createElement('option');
                option.value = c;
                option.innerHTML = c;
                colors.appendChild(option)
            })
                console.log(data.colors)

            })
        }
    })
  
//Eléments à ajouter dans le panier lors du clic de l'utilisateur 
let button = document.getElementById('addToCart');

button.addEventListener("click", function basket () {
    let name = document.getElementById("title").textContent;
    let color = document.getElementById("colors").value;
    let quantity = document.getElementById("quantity").value;

//Renvoi vers la page panier et envoi dans le local storage
    addBasket(productId, name, color, quantity)
    window.location.assign("cart.html")

})



   
    