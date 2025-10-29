var Input = /** @class */ (function () {
    function Input() {
    }
    // Variable statique qui représente la direction horizontale actuelle:
    // 0 = aucune direction, 1 = droite, -1 = gauche
    Input.getAxisX = function () {
        // Méthode statique pour récupérer la valeur courante de axisX
        return this.axisX;
    };
    Input.listen = function () {
        // Méthode statique pour activer l’écoute des événements clavier (keydown et keyup)
        document.addEventListener("keydown", function (event) {
            // Au moment où une touche est pressée
            switch (event.key) {
                case "d":
                case "D":
                    Input.axisX = 1; // Si touche 'd' ou 'D' pressée, déplacement vers la droite
                    break;
                case "q":
                case "Q":
                    Input.axisX = -1; // Si touche 'q' ou 'Q' pressée, déplacement vers la gauche
                    break;
                default:
                    break; // Autres touches ignorées
            }
        });
        document.addEventListener("keyup", function (event) {
            // Au moment où une touche est relâchée
            switch (event.key) {
                case "d":
                case "D":
                case "q":
                case "Q":
                    Input.axisX = 0; // Lorsque les touches 'd' ou 'q' sont relâchées, arrêt du mouvement horizontal
                    break;
                default:
                    break; // Autres touches ignorées
            }
        });
    };
    Input.axisX = 0;
    return Input;
}());
export { Input };
// Type personnalisé indiquant une direction possible:
// 0 = aucune direction, 1 = vers la droite, -1 = vers la gauche
