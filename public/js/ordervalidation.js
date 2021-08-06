// --------------- Récupère le localStorage --------------- //
function getOrderValidation() {
    const orderValidation = localStorage.getItem("orderValidation");
    
    if (orderValidation == null) {
        return {};
    }
    return JSON.parse(orderValidation);
}

// --------------- Injecte les données du localStorage (orderValidation) dans le DOM --------------- //
function displayOrderValidation(orderValidation) {
    
    const textValidation = document.getElementById("textValidation");

    textValidation.innerHTML = `<p><strong>${orderValidation.firstName}</strong>, merci pour votre achat.</p>
    <p>Votre commande N° <strong>${orderValidation.orderId}</strong>, d'un montant total de <strong>${orderValidation.totalCart}</strong> a bien été validée.</p>
    <p>Vous recevrez votre facture par mail à l'adresse : <strong>${orderValidation.email}</strong>.</p>`

}

// --------------- Gère le click pour retour à la page d'accueil --------------- //
function backHome() {
    const btnBackHome = document.getElementById('backHome');
    const linkHome = document.getElementById('linkHome');
    const logoLinkHome = document.getElementById('logoLinkHome');

    btnBackHome.addEventListener("click", () => {
        localStorage.clear();
        window.location = '/';
    });

    linkHome.addEventListener("click", () => {
        localStorage.clear();
        window.location = '/';
    });

    logoLinkHome.addEventListener("click", () => {
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