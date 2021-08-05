// --------------- Récupère tous les produits --------------- //
async function getProducts() {
    const response = await fetch('/api/teddies/');
    if(!response.ok) {
        console.log("hello");
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return await response.json();
}

// --------------- Récupère un produit avec l'id --------------- //
async function getProduct(productId) {
    const response = await fetch('/api/teddies/'+ productId);
    if(!response.ok) {
        console.log("hello");
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

// --------------- Formate les données à envoyer et envoie sur la page confirmation de commande --------------- //
async function handleFormSubmit(e) {
    e.preventDefault();

    const formError = document.createElement('p');
    formError.innerText = 'Veuillez remplir les champs indiqués';
    formError.classList = 'error';

    const firstName = document.getElementById('first-name').value
    const lastName = document.getElementById('last-name').value
    const address = document.getElementById('address').value
    const city = document.getElementById('city').value
    const email = document.getElementById('email').value
    let products = [];

    const validName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const validCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    const validMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const validAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

    console.log(validName.test(firstName.value));

    // if(validName.test(firstName.value) !== true) {
    //     firstName.parentNode.insertBefore(formError, firstName.nextSibling);
    //     firstName.classList.add('error');
    // }
    // // if()

    if ((validName.test(firstName) == true) &&
        (validName.test(lastName) == true) &&
        (validAddress.test(address) == true) &&
        (validCity.test(city) == true) &&
        (validMail.test(email) == true)) {

            for(let product in getCart()) {
                products.push(product);
            }
        
            const contact = {
                contact : {
                    firstName,
                    lastName,
                    address,
                    city,
                    email
                },
                products
            };
        
            const response = await sendFormData('/api/teddies/order', contact);
        
            if (response) {
                //vide le localstorage
                localStorage.clear();
                // //crée nouveau localstorage pour stocker les données de commande
                let orderValidation = {
                    orderId: response.orderId,
                    totalCart: document.getElementById("total-price").innerText,
                    firstName: response.contact.firstName,
                    email: response.contact.email
                };
                localStorage.setItem("orderValidation", JSON.stringify(orderValidation));
                window.location = '/ordervalidation';
            }
    }
    //  else {
    //     alert("Merci de renseigner correctement les champs du formulaire afin de valider votre commande.");
    //     return false;
    // }
    
}
