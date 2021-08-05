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

function addOnCartPage(teddyId) {
    const cart = getCart();
    cart[teddyId].quantity++; 
    saveCart(cart);
    calculTotal(cart);
}

function removeOnCartPage(teddyId) {
    const cart = getCart();
    cart[teddyId].quantity--;
    saveCart(cart);
    calculTotal(cart);
}

function deleteProductOfCart(teddyId) {
    const cart = getCart();
    delete cart[teddyId];

    calculTotal(cart);
    saveCart(cart); 

    if(Object.keys(cart).length === 0) {
        displayCart(cart);
    }
}

function setPageCart() {
    const cart = getCart();
    displayCart(cart);
}

setPageCart();

window.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll('input[type="number"]').forEach((input) => {
        const teddyId = input.id;
        const dataName = input.dataset.name;
    
        input.addEventListener("input", (e) => {

            const cart = getCart();
            const currentQuantity = e.target.value;

                if(currentQuantity > cart[teddyId].quantity) {
                    addOnCartPage(teddyId);
                } else {
                    removeOnCartPage(teddyId);
                }
                
                let newPrice = currentQuantity * cart[teddyId].price;
                document.getElementById(dataName).innerText = newPrice + "€";
        });

        
    });

    const btnSupp = document.querySelectorAll('.delete-btn');

    btnSupp.forEach((btn) => {
        const tr = btn.parentNode.parentNode;

        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id
            deleteProductOfCart(id);
            tr.remove();
        });
    });

    const form = document.getElementById('orinocoForm');

    form.addEventListener("submit", (e) => {
        handleFormSubmit(e);
    });
    
    // for (let input of inputs) {
    //     input.addEventListener('focus', (e) => {
    //         if (input.className == "error") {
    //             e.target.classList.remove('error');
                
    //         }// si class error enlever trouver element p avec class error et supprimer du dom
    //     });
    // }
});