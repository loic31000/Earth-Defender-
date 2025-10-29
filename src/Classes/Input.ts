export class Input {
    private static axisX: Direction = 0; 
    // Variable statique qui représente la direction horizontale actuelle:
    // 0 = aucune direction, 1 = droite, -1 = gauche

    public static getAxisX(): Direction { 
        // Méthode statique pour récupérer la valeur courante de axisX
        return this.axisX;
    }

    public static listen() {
        // Méthode statique pour activer l’écoute des événements clavier (keydown et keyup)

        document.addEventListener("keydown", (event) => {
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

        document.addEventListener("keyup", (event) => {
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
    }
}

export type Direction = 0 | 1 | -1; 
// Type personnalisé indiquant une direction possible:
// 0 = aucune direction, 1 = vers la droite, -1 = vers la gauche
