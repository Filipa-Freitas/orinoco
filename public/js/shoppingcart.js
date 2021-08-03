// const allPrices = [];
function displayCart(cart) {
    
    const containerEmpty = document.getElementById('empty');
    const cartTable = document.querySelector('tbody');
    const view = document.getElementById('view');
    if (cart == null || Object.keys(cart).length === 0) {
    
        view.className = "d-none";
        const empty = document.createElement('p');
        empty.innerText = "Votre panier est vide";
        containerEmpty.append(empty);
        // console.log(cart);
        
    // sinon, ajouter les teddies dans table
    } else {
        // Ajouter le prix de chaque teddy dans un tableau
        // const allPrices = [];

        for (let k in cart) {
            
            // const tr = document.createElement('tr');

            cartTable.innerHTML +=
            `<tr>
                <td>${cart[k].name}</td>
                <td>${cart[k].color}</td>
                <td>
                    <input type="number" data-name="${cart[k].name}Price" id="${cart[k].id}" min="1" max="10" value="${cart[k].quantity}"></input>
                </td>
                <td id="${cart[k].name}Price">${cart[k].price * cart[k].quantity} €</td>
                <td><button data-id="${cart[k].id}" class="delete-btn btn btn-dark">supprimer</button></td>
            </tr>`;
            
            // updatePrice(cart);
            // cartTable.append(tr);
        }

        calculTotal(cart);
        // aditionner les prix des teddies et l'afficher dans table
        
        

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
    // si cart est vide ou n'a pas de clé je supprime l'objet entier ou je renvoi null displayCart(cart)
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
    // const allPrices = [];
    // var teddyId = null;

    document.querySelectorAll('input[type="number"]').forEach((input) => {
        const teddyId = input.id;
        const dataName = input.dataset.name;
    
        input.addEventListener("input", (e) => {

            const cart = getCart();
            const currentQuantity = e.target.value;
            // const total = document.getElementById('total-price');

            // si la quantité de l'input est > à quantité de cart on ajoute 

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
    
});