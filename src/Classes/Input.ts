export class Input {

    private static axisX : Direction = 0;
    // Propriété statique stockant la direction horizontale :
    // 0 = immobile, 1 = déplacement vers la droite, -1 = vers la gauche

    private static isShooting : boolean = false;
    // Propriété statique indiquant si le joueur tire (true = tirer en cours, false = pas de tir)

    public static getAxisX() : Direction {
        // Méthode statique pour récupérer la valeur actuelle de axisX
        return this.axisX;
    }

    public static getIsShooting() : boolean {
        // Méthode statique pour récupérer l'état du tir (true/false)
        return Input.isShooting;
    }

    public static listen() {
        // Méthode statique pour écouter les événements clavier

        window.addEventListener("keydown", (event) => {
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

        window.addEventListener("keyup", (event) => {
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
    }
}

export type Direction = 0 | 1 | -1;
// Type personnalisé qui représente la direction horizontale :
// 0 = immobile, 1 = droite, -1 = gauche
