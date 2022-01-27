/**
 * Insertion d'un produit grâce à son id
 */
//Récupération de l'id du produit dans l'URL
let urlProduct = new URL ("http://localhost:3000/api/products/"+productId)
let params = new URLSearchParams(window.location.search)
let productId = params.get("id");
console.log("id" , productId);


fetch("http://localhost:3000/api/products/"+productId)
    .then(function(response){
        if(response.resolve){
            return response.json()
        }
     console.log(response); 
    })
  

    let imageUrl = document.getElementsByClassName("item__img");
    let name = document.getElementById("title");
    let price = document.getElementById("prince");
    let description = document.getElementById("description");
    let colors = document.getElementById("colors"); 