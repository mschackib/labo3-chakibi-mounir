// =====================================================
// MES RÉSERVATIONS (merci.html)
// Relit le tableau des réservations dans le localStorage,
// affiche le récapitulatif de la dernière et la liste complète.
// Le bouton « Tout effacer » vide la liste après confirmation.
// =====================================================


// ---------- 1. SÉLECTIONS ----------

const zone_recapitulatif = document.querySelector("#recapitulatif");
const liste_demandes = document.querySelector("#liste-reservations");
const bouton_effacer = document.querySelector("#bouton-effacer");


// ---------- 2. AFFICHAGE ----------

function afficherDemandes() {
    // On relit le tableau (texte -> tableau d'objets)
    const reservations = JSON.parse(localStorage.getItem("reservations_monsite") ?? "[]");

    // On vide la liste avant de la remplir (pour ne pas afficher en double)
    liste_demandes.textContent = "";

    // Aucun envoi enregistré
    if (reservations.length === 0) {
        zone_recapitulatif.textContent = "Aucune réservation enregistrée.";
        const ligne_vide = document.createElement("li");
        ligne_vide.textContent = "Aucune réservation pour le moment.";
        liste_demandes.appendChild(ligne_vide);
        return;
    }

    // Récapitulatif : la dernière réservation du tableau
    const derniere = reservations[reservations.length - 1];
    zone_recapitulatif.textContent =
        `${derniere.prenom} ${derniere.nom} - ${derniere.velo}, du ${derniere.date_depart} au ${derniere.date_fin}. Confirmation envoyée à ${derniere.courriel}.`;

    // Mes réservations : une ligne <li> par réservation
    // textContent (et pas innerHTML) : les données saisies restent du texte
    for (const reservation of reservations) {
        const ligne = document.createElement("li");
        ligne.textContent = `${reservation.velo} - du ${reservation.date_depart} au ${reservation.date_fin} (${reservation.prenom} ${reservation.nom})`;
        liste_demandes.appendChild(ligne);
    }
}


// ---------- 3. TOUT EFFACER (avec confirmation) ----------

function effacerDemandes() {
    // confirm() affiche OK / Annuler et renvoie true ou false
    const confirmation = confirm("Voulez-vous vraiment effacer toutes vos réservations ?");

    if (confirmation === true) {
        localStorage.removeItem("reservations_monsite");
        afficherDemandes();
    }
}


// ---------- 4. AU CHARGEMENT + ÉCOUTEUR ----------

afficherDemandes();
bouton_effacer.addEventListener("click", effacerDemandes);