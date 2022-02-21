// Récupération des éléments HTML avec l'interpolation de variables 
// Pour chaque produits dans le panier, ajout dans le DOM
async function addItems() {
    let basket = getBasket();
    let objItem = document.getElementById('cart__items');
    objItem.innerHTML = "";
    allProduct = [];
    for (let product of basket) {
        apiProduct = await getProduct(product.productId).then(function (refProduct) {
            objItem.insertAdjacentHTML('beforeend', getContentBasket(product, refProduct));

            return refProduct;
        })
        allProduct.push(apiProduct);
    }
    return allProduct;
}
function getContentBasket(product, refProduct) {
    return `<article class="cart__item" data-id="${product.productId}" data-color="${product.color}">
            
                <div class="cart__item__img">
                <img src="${refProduct.imageUrl}" alt="${refProduct.altTxt}" />
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
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}" />
                </div>
                        <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
                </article> `;
}
async function addListerners() {
    // Modification de l'élément dans le panier avec délégation d'événements
    let itemQuantity = document.getElementsByClassName("cart__item")
    for (cartItem of itemQuantity) {
        let color = cartItem.dataset.color
        let productId = cartItem.dataset.id
        //Evénement "change" sur chaque item           
        cartItem.addEventListener("change", function (item) {
            let quantity = item.target.closest(".itemQuantity").value;
            changeQuantity(productId, color, quantity)
            //Actualisation de la quantité sur la page
            let newQuantity = document.querySelector(".itemQuantity").value;
            newQuantity.textContent = item.target.value;
            localStorage.setItem(quantity, newQuantity)
            theCart()
        })
        //Suppression du produit au clic et actualisation de la page  
        cartItem.addEventListener("click", function (remove) {
            let removeItem = remove.target.closest("[data-id]");
            let product = removeItem.dataset;
            removeFromBasket(productId);
            theCart()
        })
    }
}
//Exécution des fonctions précédentes dans la page panier
async function theCart() {
    let refBasket = await addItems();
    addListerners()
    setTotalQuantity()
    setTotalPrice(refBasket)
}
//---------Formulaire pour passer la commande---------
//Formulaire utilisateur
function listenerForm() {
    let form = document.querySelector(".cart__order__form");

    form.addEventListener("submit", function (element) {
        element.preventDefault()
        if (valideChamp('firstName') && valideChamp('lastName') && valideChamp('city') && valideChamp('email', 'email')) {

            let userFirstName = document.getElementById("firstName").value;
            let userLastName = document.getElementById("lastName").value;
            let userAddress = document.getElementById("address").value;
            let userCity = document.getElementById("city").value;
            let userEmail = document.getElementById("email").value;
            //Création de l'object contact
            contact = {
                firstName: userFirstName,
                lastName: userLastName,
                address: userAddress,
                city: userCity,
                email: userEmail,
            }

            saveContact(contact)
            window.location.assign("confirmation.html")
        }
    })
    //Vérification des champs lors du remplissage par l'utilisateur
    function valideChamp(nomChamp, type) {
        let regEx;
        if (type == 'email') {
            //let regEx = new RegExp (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
            regEx = new RegExp(/^[a-z0-9_\-\.]+@[a-z]+\.[a-z]+$/i);
        } else {
            regEx = new RegExp(/^[^0-9]+$/i);
        }
        if (!regEx.test(document.getElementById(nomChamp).value)) {
            // Affichage du message d'erreur
            document.getElementById(nomChamp + 'ErrorMsg').innerHTML = 'Erreur de saisie sur ce champ';
            return false;
        } else {
            return true;
        }
    }
}