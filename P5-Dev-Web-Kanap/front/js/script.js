/**
 * Insertion des produits dans la page d'accueil à l'aide de 'fetch()' et en argument l'url de l'API
 * La méthode 'fetch()' retourne une 'promise' contenant une réponse 
 */

fetch(" http://localhost:3000/api/products")
    .then(function(response) {
        //si réponse vraie de la console
        if(response.ok){
            return response.json();
        }
        console.log(response);
    })
    
/**
 * Fonction 'then()' utilisée si 'Promise = resolve'
 * Création d'éléments dans le DOM 
 * Ajout des données 'product' sur chaque éléments
 */

.then(function (value){
//Exécution de la fonction pour chaque élément 
    value.forEach(product =>{
        let items = document.getElementById('items');
//Création des enfants de l'élément parent (items)
        a = document.createElement('a');
        article = document.createElement('article');
            article.classList.add("productCard");
        img = document.createElement('img');
            img.classList.add("productImage");
        h3 = document.createElement('h3');
            h3.classList.add("productName");
        p = document.createElement('p');
            p.classList.add("productDescription");

//Liste des enfants de l'élément parent (id) 'items'
        items.appendChild(a);
        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(p);

//Element = nom des données fournit dans l'API 
        a.href = product._id;
        img.src = product.imageUrl;
        h3.innerHTML = product.name;
        img.alt = product.altTxt;
        p.innerHTML = product.description;


    }
,)})
       
