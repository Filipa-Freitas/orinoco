
async function getProducts() {
    const response = await fetch('/api/teddies/');
        if(!response.ok) {
            console.log("hello");
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        return await response.json();
    
 };

 function displayHome(products) {

     let teddiesContainer = document.getElementById('teddies-container');

    for(let i = 0; i < products.length; i++) {
        let card = document.createElement('div');
        let img = document.createElement('img');
        let cardBody = document.createElement('div');
        let cardPrice = document.createElement('p');
        let cardName = document.createElement('a');

        card.className = "col-md-6 col-lg-4 card p-2 shadow-sm";
        img.className = "card-img-top";
        cardBody.className = "card-body d-flex justify-content-between";
        cardPrice.className = "card-title";
        cardName.className = "stretched-link";

        img.src = products[i].imageUrl;
        img.alt = products[i].description;
        cardPrice.innerText = products[i].price + " €";
        cardName.innerText = products[i].name;
        cardName.href = "/product/"+ products[i]._id

        cardBody.append(cardName);
        cardBody.append(cardPrice);
        card.append(img);
        card.append(cardBody);
        teddiesContainer.append(card);


    }
 };

 async function setHome() {
     getProducts();
     let products = await getProducts();
     displayHome(products);
 };

 setHome();