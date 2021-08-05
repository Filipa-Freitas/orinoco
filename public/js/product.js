// --------------- Injecte les données de l'api pour un teddy dans le DOM --------------- //
function displayProduct(product) {

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

        document.getElementById("select-color").innerHTML += 
        `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }

    document.getElementById("btn-add")
    .addEventListener("click", () => addOnProductPage(product));
}

async function setPage() {
    const productId = window.location.href.split('/')[4].split('#')[0];
    const product = await getProduct(productId);
    displayProduct(product);
}

setPage();
