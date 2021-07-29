 function displayCart(cart) {
    
    const containerEmpty = document.getElementById('empty');
    const cartTable = document.querySelector('tbody');
    const displayNone = document.getElementById('display-none');
    
   
    
    if (cart == null) {
    
        displayNone.className = "d-none";
        const empty = document.createElement('p');
        empty.innerText = "Votre panier est vide";
        containerEmpty.append(empty);
        console.log(cart);
        
    // sinon, ajouter les teddies dans table
    } else {
        // Ajouter le prix de chaque teddy dans un tableau
        const allPrices = [];

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
                <td><button><i class="fas fa-trash"></i></button></td>
            </tr>`;

            const priceCart = cart[k].price * cart[k].quantity;
            allPrices.push(priceCart);
            // updatePrice(cart);
            // cartTable.append(tr);
        }

        // aditionner les prix des teddies et l'afficher dans table
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const totalPrice = allPrices.reduce(reducer, 0);
        const total = document.getElementById('total-price');
        total.innerText = `${totalPrice} €`;
        total.dataset.total = totalPrice;
        

    }  
};

function getCart() {
    const cart = localStorage.getItem("cart");
    if (cart == null) {
        return cart;
    }
    return JSON.parse(cart);
 };

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
};


function addOneProductToCart(teddyId) {
    const cart = getCart();
    cart[teddyId].quantity++; 
    saveCart(cart);
};

function removeOneProductOfCart(teddyId) {
    const cart = getCart();
    cart[teddyId].quantity--;
    saveCart(cart);
};

function deleteProductOfCart(teddyId) {
    const cart = getCart();
    delete cart[teddyId];
    saveCart();
}

function setPageCart() {
    const cart = getCart();
    displayCart(cart);
};

setPageCart();

window.addEventListener("DOMContentLoaded", () => {
    // const allPrices = [];

    document.querySelectorAll('input[type="number"]').forEach((input) => {
        const teddyId = input.id;
        const dataName = input.dataset.name;
    
        input.addEventListener("input", (e) => {
            const cart = getCart();
            const currentQuantity = e.target.value;
            const total = document.getElementById('total-price');
            // let newTotal = 0;
            // si la quantité de l'input est > à quantité de cart on ajoute 
            if(currentQuantity > cart[teddyId].quantity) {
                addOneProductToCart(teddyId);

                // newTotal = (currentQuantity * cart[teddyId].price) + Number(total.dataset.total);
                // console.log('+', newTotal)
            } else {
                removeOneProductOfCart(teddyId);

                // newTotal = Number(total.dataset.total) - currentQuantity * cart[teddyId].price
                // console.log('-', newTotal)
            }
            // on recalcule le prix par ligne
            let newPrice = currentQuantity * cart[teddyId].price;
            document.getElementById(dataName).innerText = newPrice + "€";
            // total.innerHTML = newPrice + parseInt(total.dataset.total); 
            
            // console.log(document.getElementById(dataName).innerText);
            // allPrices.push(currentQuantity * cart[teddyId].price);
            // console.log(allPrices);
            // total = document.getElementById('total-price');
            // total.innerText += document.getElementById(dataName).innerText;
        })
        btnSupp = document.querySelectorAll('.fa-trash');
        btnSupp.addEventListener("click", deleteProductOfCart(teddyId));
    });

    
});