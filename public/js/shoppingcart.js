// --------------- Injecte les données du localStorage (cart) dans le DOM --------------- //
function displayCart(cart) {    
    const containerEmpty = document.getElementById('empty');
    const cartTable = document.querySelector('tbody');
    const view = document.getElementById('view');

    if (cart == null || Object.keys(cart).length === 0) {
    
        view.className = "d-none";
        const empty = document.createElement('p');
        empty.innerText = "Votre panier est vide";
        containerEmpty.append(empty);

    } else {

        for (let k in cart) {

            cartTable.innerHTML +=
            `<tr>
                <td>${cart[k].name}</td>
                <td>${cart[k].color}</td>
                <td>
                    <input type="number" class="input-quantity" data-name="${cart[k].name}Price" id="${cart[k].id}" min="1" max="10" value="${cart[k].quantity}"></input>
                </td>
                <td id="${cart[k].name}Price">${cart[k].price * cart[k].quantity} €</td>
                <td><button data-id="${cart[k].id}" class="delete-btn btn btn-dark">supprimer</button></td>
            </tr>`;
            
        }

        calculTotal(cart);
    }  
}

// --------------- Calcul montant total du panier --------------- //
function calculTotal(cart) {
    const allPrices = [];

    for (let k in cart) {
        const priceCart = cart[k].price * cart[k].quantity;
        allPrices.push(priceCart);
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = allPrices.reduce(reducer, 0);
    const total = document.getElementById('total-price');
    total.innerText = `${totalPrice} €`;
    total.dataset.total = totalPrice;
}

// --------------- Ajoute une quantité --------------- //
function addOnCartPage(teddyId) {
    const cart = getCart();
    cart[teddyId].quantity++; 
    saveCart(cart);
    calculTotal(cart);
}

// --------------- Enlève une quantité --------------- //
function removeOnCartPage(teddyId) {
    const cart = getCart();
    cart[teddyId].quantity--;
    saveCart(cart);
    calculTotal(cart);
}

// --------------- Supprime le produit --------------- //
function deleteProductOfCart(teddyId) {
    const cart = getCart();
    delete cart[teddyId];

    calculTotal(cart);
    saveCart(cart); 

    if (Object.keys(cart).length === 0) {
        displayCart(cart);
    }
}

function setPageCart() {
    const cart = getCart();
    displayCart(cart);
}

setPageCart();

// --------------- Montre un message d'erreur --------------- //
const showError = (input, message) => {

    const formField = input;
    // ajoute classe d'erreur
    formField.classList.remove('success');
    formField.classList.add('error');

    // montre le message
    const error = formField.parentElement.querySelector('small');
    error.classList.add('error');
    error.textContent = message;
}

// --------------- Enlève le message d'erreur --------------- //
const showSuccess = (input) => {

    const formField = input;

    // enlève la classe error
    formField.classList.remove('error');
    formField.classList.add('success');

    // cache le message d'erreur
    const error = formField.parentElement.querySelector('small');
    error.textContent = '';
}

// --------------- Vérifie valeur de l'input --------------- //
const checkFirstName = (input) => {
    // (accepte lettres maj min acc && (un espace ou -) && lettres maj min acc) || accepte lettres maj min acc
    const validName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;

    if (validName.test(input.value) !== true) {
        showError(input, 'Veuillez saisir votre prénom');
    } else {
        showSuccess(input);
        return true;
    }
}

// --------------- Vérifie valeur de l'input --------------- //
const checkLastName = (input) => {
    // (accepte lettres maj min acc && (un espace ou -) && lettres maj min acc) || accepte lettres maj min acc
    const validName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;

    if (validName.test(input.value) !== true) {
        showError(input, 'Veuillez saisir votre nom');
    } else {
        showSuccess(input);
        return true;
    }
}

// --------------- Vérifie valeur de l'input --------------- //
const checkCity = (input) => {
    // accepte lettres maj min acc ++ au moins un espace, - ++ lettres maj min acc || accepte lettres maj min acc
    const validCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,5}$/;

    if (validCity.test(input.value) !== true) {
        showError(input, 'Veuillez saisir votre ville')
    } else {
        showSuccess(input);
        return true;
    }
}

// --------------- Vérifie valeur de l'input --------------- //
const checkAddress = (input) => {
    // accepte chiffres, lettres maj min acc ++ au moins un espace, - ++ chiffres, lettres maj min acc
    const validAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,7}$/;

    if (validAddress.test(input.value) !== true) {
        showError(input, 'Veuillez saisir votre adresse');
    } else {
        showSuccess(input);
        return true;
    }
}

// Valide valeur de l'input
const checkEmail = (input) => {
    // accepte chiffres, lettres maj min, -_. ++ @ ++ au moins deux caractères : lettres maj min, chiffres, -_. ++ . ++ entre 2 et 4 lettres min
    const validMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    
    if (validMail.test(input.value) !== true) {
        showError(input, 'Veuillez saisir votre adresse mail');
    } else {
        showSuccess(input);
        return true;
    }
}

// --------------- Formate et envoie les données si validées et envoie sur la page confirmation de commande --------------- //
async function handleFormSubmit(e) {
    e.preventDefault();

    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const addressInput = document.getElementById('address');
    const cityInput = document.getElementById('city');
    const emailInput = document.getElementById('email');

    checkFirstName(firstNameInput);
    checkLastName(lastNameInput);
    checkAddress(addressInput);
    checkCity(cityInput);
    checkEmail(emailInput);

    let products = [];

    // Si formulaire valide, formate les données et les envoie
    if (checkFirstName(firstNameInput) && checkLastName(lastNameInput)
     && checkAddress(addressInput) && checkCity(cityInput) && checkEmail(emailInput)) {

        for (let product in getCart()) {
            products.push(product);
        }
    
        const contact = {
            contact : {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                address: addressInput.value,
                city: cityInput.value,
                email: emailInput.value
            },
            products
        };
    
        const response = await sendFormData('/api/teddies/order', contact);
        
        if (response) {
            // vide le localstorage
            localStorage.clear();
            // crée nouveau localstorage pour stocker les données de commande
            let orderValidation = {
                orderId: response.orderId,
                totalCart: document.getElementById("total-price").innerText,
                firstName: response.contact.firstName,
                email: response.contact.email
            };
            localStorage.setItem("orderValidation", JSON.stringify(orderValidation));
            // envoi sur la page de confirmation de commande
            window.location = '/ordervalidation';
        }
    }
}

// --------------- Gère les évènements --------------- //
window.addEventListener("DOMContentLoaded", () => {

    // Gère incrémentation et décrémentation des produits dans le panier
    document.querySelectorAll('input[type="number"]').forEach((input) => {
        const teddyId = input.id;
        const dataName = input.dataset.name;
    
        input.addEventListener("input", (e) => {

            const cart = getCart();
            const currentQuantity = e.target.value;

                if (currentQuantity > cart[teddyId].quantity) {
                    addOnCartPage(teddyId);
                } else {
                    removeOnCartPage(teddyId);
                }
                
                let newPrice = currentQuantity * cart[teddyId].price;
                document.getElementById(dataName).innerText = newPrice + "€";
        });

        
    });

    const btnSupp = document.querySelectorAll('.delete-btn');
    // Gère les suppressions de produits
    btnSupp.forEach((btn) => {
        const tr = btn.parentNode.parentNode;

        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id
            deleteProductOfCart(id);
            tr.remove();
        });
    });

    const form = document.getElementById('orinoco-form');
    // Gère l'envoi du formulaire
    form.addEventListener("submit", (e) => {
        handleFormSubmit(e);
    });
});