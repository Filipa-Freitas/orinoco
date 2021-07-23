
async function displayCart(cart) {
    
    let containerEmpty = document.getElementById('empty');
    let cartTable = document.querySelector('tbody');
    let displayNone = document.getElementById('display-none');
    
   
    
    if (cart == null) {
        console.log("dicplayCart!!");
        displayNone.className = "d-none";
        let empty = document.createElement('p');
        empty.innerText = "Votre panier est vide";
        containerEmpty.append(empty);
        console.log(cart);
        
    // sinon, ajouter les teddies dans table
    } else {
        for (let k in cart) {
            console.log("dicplayCart!!");
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
        for (let i = 0; i < cart.length; i++) {
            let priceCart = cart[i].price*cart[i].quantity;
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

function addOneProductToCart(product) {
    let cart = getCart();
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