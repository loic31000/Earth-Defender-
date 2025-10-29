import { GameObject } from "./GameObject.js"; // Importation de la classe de base GameObject
import { Input } from "../Input.js"; // Importation du module Input pour gérer les entrées utilisateur
import { Assets } from "../Assets.js"; // Importation du module Assets pour accéder aux images

export class Player extends GameObject {
    private speed: number = 10; // Vitesse de déplacement horizontale du joueur (en pixels par mise à jour)

    protected start(): void {
        // Méthode appelée à l'initialisation du joueur (héritée et redéfinie)

        this.setImage(Assets.getPlayerImage()); // Définit l'image du joueur récupérée via Assets

        this.setPosition({
            x: this.getGame().CANVAS_WIDTH / 2, // Place le joueur horizontalement au centre du canvas
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height - 10, // Place le joueur proche du bas du canvas, en tenant compte de la hauteur de son image et un décalage de 10 pixels
        });
    }

    protected update(): void {
        // Méthode appelée à chaque frame pour mettre à jour la position du joueur

        this.setPosition({
            x: this.getPosition().x += this.speed * Input.getAxisX(), // Change la position horizontale en fonction de la vitesse et de l'entrée utilisateur (gauche/droite)
            y: this.getPosition().y // Maintient la position verticale inchangée (le joueur bouge uniquement horizontalement)
        });
    }
}
