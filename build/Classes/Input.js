var Input = /** @class */ (function () {
    function Input() {
    }
    // Propriété statique indiquant si le joueur tire (true = tirer en cours, false = pas de tir)
    Input.getAxisX = function () {
        // Méthode statique pour récupérer la valeur actuelle de axisX
        return this.axisX;
    };
    Input.getIsShooting = function () {
        // Méthode statique pour récupérer l'état du tir (true/false)
        return Input.isShooting;
    };
    Input.listen = function () {
        // Méthode statique pour écouter les événements clavier
        window.addEventListener("keydown", function (event) {
            // Lorsqu'une touche est pressée
            console.log(event.key); // Affiche la touche pressée dans la console (utile au debug)
            switch (event.key) {
                case "d":
                case "D":
                    Input.axisX = 1; // Déplacement vers la droite si 'd' ou 'D' est pressée
                    break;
                case "q":
                case "Q":
                    Input.axisX = -1; // Déplacement vers la gauche si 'q' ou 'Q' est pressée
                    break;
                case " ":
                    Input.isShooting = true; // Le joueur commence à tirer si la barre espace est pressée
                    break;
                default:
                    break; // Toutes les autres touches ignorées
            }
        });
        window.addEventListener("keyup", function (event) {
            // Lorsqu'une touche est relâchée
            switch (event.key) {
                case "d":
                case "D":
                case "q":
                case "Q":
                    Input.axisX = 0; // Arrêt du déplacement horizontal si 'd' ou 'q' est relâchée
                    break;
                case " ":
                    Input.isShooting = false; // Arrêt du tir si la barre espace est relâchée
                    break;
                default:
                    break; // Toutes les autres touches ignorées
            }
        });
    };
    Input.axisX = 0;
    // Propriété statique stockant la direction horizontale :
    // 0 = immobile, 1 = déplacement vers la droite, -1 = vers la gauche
    Input.isShooting = false;
    return Input;
}());
export { Input };
// Type personnalisé qui représente la direction horizontale :
// 0 = immobile, 1 = droite, -1 = gauche
