
async function displayCart(cart) {
    
    let containerEmpty = document.getElementById('empty');
    let cartTable = document.querySelector('tbody');
    let displayNone = document.getElementById('display-none');
    
   
    
    if (cart == null) {
    
        displayNone.className = "d-none";
        let empty = document.createElement('p');
        empty.innerText = "Votre panier est vide";
        containerEmpty.append(empty);
        console.log(cart);
        
    // sinon, ajouter les teddies dans table
    } else {
        for (let k in cart) {
           
            let tr = document.createElement('tr');
            let tdName = document.createElement('td');
            let tdColor = document.createElement('td');
            let tdQuantity = document.createElement('td');
            let btnMinus = document.createElement('button');
            let btnAdd = document.createElement('button');
            let tdPrice = document.createElement('td');

            tdName.innerText = cart[k].name;
            tdColor.innerText = cart[k].color;
            tdPrice.innerText = cart[k].price*cart[k].quantity+ " €";
            tdQuantity.innerText = cart[k].quantity;
            btnAdd.className = "add-quantity";
            // let teddySelected =  cart[k];
            // btnAdd.addEventListener("click", () => {
            //     addOneProductToCart(teddySelected);
            //     displayCart(cart);
            // });

            tr.append(tdName);
            tr.append(tdColor);
            tr.append(tdQuantity);
            tdQuantity.append(btnMinus);
            tdQuantity.append(btnAdd);
            tr.append(tdPrice);
            cartTable.append(tr);
        }
        // Ajouter le prix de chaque teddy dans un tableau
        let allPrices = [];
        for (let k in cart) {
            let priceCart = cart[k].price*cart[k].quantity;
            allPrices.push(priceCart);
            console.log(allPrices);
        }
        // aditionner les prix des teddies et l'afficher dans table
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const totalPrice = allPrices.reduce(reducer, 0);
        let total = document.getElementById('total-price');
        total.innerText = totalPrice+ " €";


    }
    
   
};

function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        return cart;
    }
    return JSON.parse(cart);
 };

 function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
};

function addOneProductToCart(teddySelected) {
    
    let cart = getCart();
    cart[teddySelected.id].quantity++;    
    
    saveCart(cart);
};

function removeOneProductOfCart(product) {
    let cart = getCart();
    delete cart[product.id];
    saveCart(cart);
};

async function setPageCart() {
    let cart = await getCart();
    displayCart(cart);

};

setPageCart();