// --------------- Injecte les données de l'API dans le DOM --------------- //
function displayHome(products) {

     let teddiesContainer = document.getElementById('teddies-container');

    for (let i = 0; i < products.length; i++) {

        teddiesContainer.innerHTML += 
        `<div class="col-md-6 col-lg-4 mb-4">
            <div class="card p-2 shadow-sm">
                <img class="img-thumbnail p-1" src="${products[i].imageUrl}" alt="${products[i].description}">
                <div class="card-body d-flex justify-content-between">
                    <a class="stretched-link" href="${"/product/" + products[i]._id}">${products[i].name}</a>
                    <p class="card-title">${products[i].price + " €"}</p>
                </div>
            </div>
        </div>`
    }
 }

async function setHome() {
     let products = await getProducts();
     displayHome(products);
}

setHome();