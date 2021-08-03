function getOrderValidation() {
    const orderValidation = localStorage.getItem("orderValidation");
    
    if (orderValidation == null) {
        return {};
    }
    return JSON.parse(orderValidation);
}

function displayOrderValidation(orderValidation) {
    
    const textValidation = document.getElementById("textValidation");

    textValidation.innerHTML = `<p><strong>${orderValidation.firstName}</strong>, merci pour votre achat.</p>
    <p>Votre commande N° <strong>${orderValidation.orderId}</strong>, d'un montant total de <strong>${orderValidation.totalCart}</strong> a bien été validée.</p>
    <p>Vous recevrez votre facture par mail à l'adresse : <strong>${orderValidation.email}</strong>.</p>`

}

function backHome() {
    const btnBackHome = document.getElementById('backHome');
    btnBackHome.addEventListener("click", () => {
        localStorage.clear();
        window.location = '/';
    });
}

function setOrderValidation() {
    const orderValidation = getOrderValidation();
    displayOrderValidation(orderValidation);
    backHome();
}

setOrderValidation();