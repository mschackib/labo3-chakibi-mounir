// =====================================================
// FORMULAIRE DE RÉSERVATION 
// =====================================================


// ---------- 1. SÉLECTIONS ----------

const formulaire_reservation = document.querySelector("#formulaire-reservation");

// Les champs
const champ_prenom = document.querySelector("#prenom");
const champ_nom = document.querySelector("#nom");
const champ_courriel = document.querySelector("#courriel");
const champ_telephone = document.querySelector("#telephone");
const champ_velo = document.querySelector("#velo");
const champ_date_depart = document.querySelector("#date_depart");
const champ_date_fin = document.querySelector("#date_fin");
const champ_conditions = document.querySelector("#conditions");

// Les paragraphes d'erreur (sous chaque champ)
const erreur_prenom = document.querySelector("#erreur-prenom");
const erreur_nom = document.querySelector("#erreur-nom");
const erreur_courriel = document.querySelector("#erreur-courriel");
const erreur_telephone = document.querySelector("#erreur-telephone");
const erreur_velo = document.querySelector("#erreur-velo");
const erreur_date_fin = document.querySelector("#erreur-date_fin");
const erreur_conditions = document.querySelector("#erreur-conditions");


// ---------- 2. PRÉ-REMPLISSAGE ----------
// Au retour sur la page, on remet la dernière saisie (champs non sensibles).
// ?? "" : si rien n'est enregistré, on met un texte vide.

champ_prenom.value = localStorage.getItem("prenom_monsite") ?? "";
champ_nom.value = localStorage.getItem("nom_monsite") ?? "";
champ_courriel.value = localStorage.getItem("courriel_monsite") ?? "";


// ---------- 3. FONCTIONS DE VÉRIFICATION ----------
// Chaque fonction affiche (ou efface) son message
// et renvoie true si le champ est valide, false sinon.

// Règle 1 : longueur - le prénom a au moins 3 caractères
function verifierPrenom() {
    if (champ_prenom.value.trim().length < 3) {
        erreur_prenom.textContent = "Saisir votre prénom (au moins 3 caractères).";
        return false;
    }
    erreur_prenom.textContent = "";
    return true;
}

// Règle 1 (suite) : longueur - le nom a au moins 3 caractères
function verifierNom() {
    if (champ_nom.value.trim().length < 3) {
        erreur_nom.textContent = "Saisir votre nom (au moins 3 caractères).";
        return false;
    }
    erreur_nom.textContent = "";
    return true;
}

// Règle 2 : format du courriel 
function verifierCourriel() {
    const courriel = champ_courriel.value.trim();

    if (courriel === "") {
        erreur_courriel.textContent = "Saisir votre courriel.";
        return false;
    }
    if (!courriel.includes("@") || !courriel.includes(".")) {
        erreur_courriel.textContent = "Saisir un courriel valide.";
        return false;
    }
    erreur_courriel.textContent = "";
    return true;
}

// Règle 3 : format du téléphone (facultatif) - s'il est rempli,
// il doit respecter le pattern HTML5 du champ (514-555-1234).
// checkValidity() relit les attributs HTML5 du Laboratoire 2.
function verifierTelephone() {
    if (champ_telephone.value !== "" && !champ_telephone.checkValidity()) {
        erreur_telephone.textContent = "Saisir un numéro de téléphone au format approprié.";
        return false;
    }
    erreur_telephone.textContent = "";
    return true;
}

// Règle 4 : champ vide - un vélo est choisi
function verifierVelo() {
    if (champ_velo.value === "") {
        erreur_velo.textContent = "Sélectionner un vélo dans la liste.";
        return false;
    }
    erreur_velo.textContent = "";
    return true;
}

// Règle 5 : cohérence entre deux champs - la fin est après le début de la location
function verifierDates() {
    if (champ_date_depart.value === "") {
        erreur_date_fin.textContent = "Indiquer la date de début de la location.";
        return false;
    }
    if (champ_date_fin.value === "") {
        erreur_date_fin.textContent = "Indiquer la date de fin de la location.";
        return false;
    }
    if (champ_date_fin.value <= champ_date_depart.value) {
        erreur_date_fin.textContent = "Choisir une date de fin postérieure à la date de début de la location.";
        return false;
    }
    erreur_date_fin.textContent = "";
    return true;
}

// Règle 6 : case obligatoire - les conditions sont acceptées
function verifierConditions() {
    if (!champ_conditions.checked) {
        erreur_conditions.textContent = "Accepter les conditions de location pour envoyer la réservation.";
        return false;
    }
    erreur_conditions.textContent = "";
    return true;
}


// ---------- 4. ENREGISTREMENT (MÉMOIRE) ----------
// Ajoute la réservation au tableau du localStorage (JSON).

function enregistrerReservation() {
    // Dernière saisie, pour le pré-remplissage
    localStorage.setItem("prenom_monsite", champ_prenom.value.trim());
    localStorage.setItem("nom_monsite", champ_nom.value.trim());
    localStorage.setItem("courriel_monsite", champ_courriel.value.trim());

    // On relit le tableau déjà enregistré (ou un tableau vide)
    const reservations = JSON.parse(localStorage.getItem("reservations_monsite") ?? "[]");

    // Le texte de l'option choisie, par exemple « City Volt S - dépôt 1 800 $ »
    const texte_velo = champ_velo.options[champ_velo.selectedIndex].text;

    // La nouvelle réservation, sous forme d'objet
    const nouvelle_reservation = {
        prenom: champ_prenom.value.trim(),
        nom: champ_nom.value.trim(),
        courriel: champ_courriel.value.trim(),
        velo: texte_velo,
        date_depart: champ_date_depart.value,
        date_fin: champ_date_fin.value
    };

    // On l'ajoute au tableau, puis on réenregistre le tableau en texte
    reservations.push(nouvelle_reservation);
    localStorage.setItem("reservations_monsite", JSON.stringify(reservations));
}


// ---------- 5. GESTION DE L'ENVOI ----------
// On vérifie TOUS les champs (pour afficher tous les messages d'un coup).
// S'il y a une erreur : on bloque l'envoi. Sinon : on enregistre,
// et le formulaire continue vers merci.html.

function verifierEnvoi(evenement) {
    const prenom_ok = verifierPrenom();
    const nom_ok = verifierNom();
    const courriel_ok = verifierCourriel();
    const telephone_ok = verifierTelephone();
    const velo_ok = verifierVelo();
    const dates_ok = verifierDates();
    const conditions_ok = verifierConditions();

    if (prenom_ok && nom_ok && courriel_ok && telephone_ok && velo_ok && dates_ok && conditions_ok) {
        enregistrerReservation();
    } else {
        evenement.preventDefault();
    }
}


// ---------- 6. ÉCOUTEURS ----------
// "input" ou "change" : le message disparaît dès que le champ est corrigé.

champ_prenom.addEventListener("input", verifierPrenom);
champ_nom.addEventListener("input", verifierNom);
champ_courriel.addEventListener("input", verifierCourriel);
champ_telephone.addEventListener("input", verifierTelephone);
champ_velo.addEventListener("change", verifierVelo);
champ_date_depart.addEventListener("change", verifierDates);
champ_date_fin.addEventListener("change", verifierDates);
champ_conditions.addEventListener("change", verifierConditions);

formulaire_reservation.addEventListener("submit", verifierEnvoi);
