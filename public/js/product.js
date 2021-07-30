
// // Page Produit -----------------------------------------------
// Je récupère les données du produit avec son Id et je l'injecte dans le DOM pour faire ma carte produit
// au clic sur le bouton ajouter je stock les données du produit dont j'ai besoin dans un objet que j'enregistre dans le localStorage
// si le produit est déjà dans le localStorage j'ajoute une quantité et j'enregistre l'objet dans le localStorage
// // Fin Page Produit -----------------------------------------------


const utils = {

    getProduct: async function(productId) {
        const response = await fetch('/api/teddies/'+ productId);
                if(!response.ok) {
                    console.log("hello");
                    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
                }
                return await response.json();
    },

    displayProduct: function(product) {

        // console.log(product);
        document.getElementById('teddy-card').innerHTML = 
        `
        <div class="col-8 card my-4 p-4 shadow-sm card-product m-auto">
            <img src=${product.imageUrl} alt=${product.description} class="card-img-top"/>           
            <div class="card-body">
                <select id="select-color"></select>
                <button id="btn-add" class="btn btn-primary">Ajouter au panier</button>
                <p class="card-title">${product.name}</p>
                <p class="card-text">${product.price} €</p>
                <p class="card-text">${product.description}</p>
            </div>
        </div>
        `;
        
        for(let i = 0; i < product.colors.length; i++) {            
            let option = document.createElement('option');
            option.innerText = product.colors[i];
            option.value = product.colors[i];
            document.getElementById("select-color").append(option);
        }

        document.getElementById("btn-add")
        .addEventListener("click", () => this.addOneProductToCart(product));
    },

    getCart: function() {
       let cart = localStorage.getItem("cart");
       console.log(cart);
       if (cart == null) {
           return {};
       }
       return JSON.parse(cart);
    },

    saveCart: function(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    },

    addOneProductToCart: function(product) {
        let cart = this.getCart();
        if (cart[product._id] == null) {

            let teddySelected = {};
            teddySelected.id = product._id;
            teddySelected.name = product.name;
            teddySelected.color = product.colors[0]; 
            teddySelected.quantity = 1;
            teddySelected.price = product.price;
            cart[teddySelected.id] = teddySelected;

        } else {
            cart[product._id].quantity++;    
        }
            
        this.saveCart(cart);
    
    },

    removeOneProductOfCart: function(product) {
        let cart = this.getCart();
        delete cart[product.id];
        this.saveCart(cart);
    },
};

const page = {

    setPage: async function() {
        let productId = window.location.href.split('/')[4].split('#')[0];
        let product = await utils.getProduct(productId);
        utils.displayProduct(product);

    }
};

page.setPage();