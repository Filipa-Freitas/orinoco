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

    const firstName = document.getElementById('first-name')
    const lastName = document.getElementById('last-name')
    const address = document.getElementById('address')
    const city = document.getElementById('city')
    const email = document.getElementById('email')

    const showError = (input, message) => {

        const formField = input;
        // ajoute message d'erreur
        formField.classList.remove('success');
        formField.classList.add('error');
    
        // montre le message
        const error = formField.parentElement.querySelector('small');
        error.textContent = message;
    };

    const showSuccess = (input) => {

        const formField = input;
    
        // enlève la classe error
        formField.classList.remove('error');
        formField.classList.add('success');
    
        // cache le message d'erreur
        const error = formField.parentElement.querySelector('small');
        error.textContent = '';
    };

    const checkFirstName = () => {
        const validName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
        console.log(firstName.value);

        if(validName.test(firstName.value) !== true) {
            showError(firstName, 'Name error')
        } else {
            showSuccess(firstName);
            return true;
        }
    };

    const checkLastName = () => {
        const validName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
        console.log(lastName.value);

        if(validName.test(lastName.value) !== true) {
            showError(lastName, 'Name error')
        } else {
            showSuccess(lastName);
            return true;
        }
    };

    const checkCity = () => {
        const validCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;

        if(validCity.test(city.value) !== true) {
            showError(city, 'city error')
        } else {
            showSuccess(city);
            return true;
        }
    };

    const checkAddress = () => {
        const validAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

        if(validAddress.test(address.value) !== true) {
            showError(address, 'city error')
        } else {
            showSuccess(address);
            return true;
        }
    };

    const checkEmail = () => {
        const validMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

        if(validMail.test(email.value) !== true) {
            showError(email, 'city error')
        } else {
            showSuccess(email);
            return true;
        }
    };

    let products = [];

    if (checkCity() && checkFirstName() && checkLastName() && checkEmail() && checkAddress()) {

        for(let product in getCart()) {
            products.push(product);
        }
    
        const contact = {
            contact : {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
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
}
