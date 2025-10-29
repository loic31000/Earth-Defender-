import { Assets } from "../Assets.js"; // Importation du module Assets pour accéder aux images
import { GameObject } from "./GameObject.js"; // Importation de la classe de base GameObject

export class Star extends GameObject {
    protected start(): void {
        // Méthode appelée lors de l'initialisation de l'objet Star (redéfinition)

        this.setImage(Assets.getStarImage()); // Définit l'image de la star via Assets

        this.setPosition({
            x: Math.random() * this.getGame().CANVAS_WIDTH, // Place la star à une position horizontale aléatoire dans tout le canvas
            y: Math.random() * this.getGame().CANVAS_HEIGHT - 10 // Place la star à une position verticale aléatoire dans le canvas, légèrement décalée vers le haut (-10)
        });
    }

    protected update(): void {
        // Méthode appelée à chaque mise à jour de la boucle de jeu

        this.setPosition({
            x: this.getPosition().x, // Garde la même position horizontale
            y: this.getPosition().y + 1 // Fait descendre la star d'un pixel à chaque mise à jour
        });

        if (this.getPosition().y > this.getGame().CANVAS_HEIGHT) {
            // Si la star dépasse le bas du canvas

            this.setPosition({
                x: this.getPosition().x, // Garde la même position horizontale
                y: 0 // Replace la star tout en haut du canvas pour recommencer sa descente
            });
        }
    }
}
