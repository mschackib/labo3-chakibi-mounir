// =====================================================
// THÈME CLAIR / SOMBRE
// Le JS pose seulement data-theme sur <html>.
// Les couleurs, elles, sont dans css/style.css (variables).
// =====================================================

// Les éléments utilisés
const la_racine = document.documentElement;                    // la balise <html>
const bouton_theme = document.querySelector("#bouton-theme"); // le bouton de la navbar


// Choisit le thème au chargement de la page :
// 1. le choix enregistré dans le localStorage, s'il existe ;
// 2. sinon, la préférence du système (prefers-color-scheme).
function themeDeDepart() {
    const theme_enregistre = localStorage.getItem("theme_monsite");

    if (theme_enregistre !== null) {
        return theme_enregistre;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "sombre";
    }

    return "claire";
}


// Applique un thème : pose l'attribut sur <html>
// et met à jour le texte du bouton (libellé explicite).
function executerTheme(theme_choisi) {
    la_racine.setAttribute("data-theme", theme_choisi);

    if (bouton_theme !== null) {
        if (theme_choisi === "sombre") {
            bouton_theme.textContent = "Activer le mode clair";
        } else {
            bouton_theme.textContent = "Activer le mode sombre";
        }
    }
}


// Au clic : passe au thème inverse et enregistre le choix.
function changerTheme() {
    let nouveauTheme = "sombre";

    if (la_racine.getAttribute("data-theme") === "sombre") {
        nouveauTheme = "claire";
    }

    executerTheme(nouveauTheme);
    localStorage.setItem("theme_monsite", nouveauTheme);
}


// Au chargement : on applique le thème de départ
executerTheme(themeDeDepart());

// On écoute le clic seulement si le bouton existe (zéro erreur dans la console)
if (bouton_theme !== null) {
    bouton_theme.addEventListener("click", changerTheme);
}