// --------------- Récupère tous les produits --------------- //
async function getProducts() {
    const response = await fetch('/api/teddies/');

    if(!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return await response.json();
}

// --------------- Récupère un produit avec l'id --------------- //
async function getProduct(productId) {
    const response = await fetch('/api/teddies/'+ productId);

    if(!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return await response.json();
}

// --------------- Récupère le localStorage --------------- //
function getCart() {
    const cart = localStorage.getItem("cart");
    
    if (cart == null) {
        return {};
    }
    return JSON.parse(cart);
}

// --------------- Enregistre le localStorage --------------- //
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// --------------- Ajoute le produit dans le localStorage --------------- //
function addOnProductPage(product) {
    const cart = getCart();
    const selectColor = document.querySelector("#select-color");

    if (cart[product._id] == null) {
        
        let teddySelected = {};
        teddySelected.id = product._id;
        teddySelected.name = product.name;
        teddySelected.color = selectColor.value; 
        teddySelected.quantity = 1;
        teddySelected.price = product.price;
        cart[teddySelected.id] = teddySelected;
         
    } else {
        cart[product._id].quantity++; 
    }
        
    saveCart(cart);

    // Affiche message succès ajout au panier
    document.getElementById("added-product").style.display = "block"
    setTimeout(function () {
        document.getElementById("added-product").style.display = "none";
    }, 800);
}

// --------------- Envoie les données du formulaire --------------- //
async function sendFormData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
        body: JSON.stringify(data)
    });

    if(!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}