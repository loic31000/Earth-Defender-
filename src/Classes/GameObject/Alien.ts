import { Assets } from "../Assets.js"; // Importation du module Assets pour accéder aux images
import { GameObject } from "./GameObject.js"; // Importation de la classe GameObject dont hérite Alien
import { Player } from "../GameObject/Player.js"; // Importation de la classe Player pour vérification des collisions

export class Alien extends GameObject {
  private speed: number = 1; // Vitesse de déplacement verticale de l'alien, initialisée à 1 pixel par mise à jour

  protected start(): void {
    // Méthode appelée à l'initialisation de l'objet Alien (surcharge de la méthode start)

    this.setImage(Assets.getAlienImage()); // Définit l'image représentant l'alien via Assets

    // Positionne l'alien à une position aléatoire dans la zone haute du canvas
    this.setPosition({
      x: Math.random() * this.getGame().CANVAS_WIDTH, // Position horizontale aléatoire sur toute la largeur du canvas
      y: (Math.random() * this.getGame().CANVAS_HEIGHT) / 4 - 50, // Position verticale aléatoire dans le quart supérieur du canvas, décalée vers le haut par -50
    });
  }

  protected update(): void {
    let newY = this.getPosition().y + this.speed;
    let newX = this.getPosition().x;

    if (newY > this.getGame().CANVAS_HEIGHT - this.getImage().height) {
      newY = this.getGame().CANVAS_HEIGHT - this.getImage().height;
    }
    newX = Math.max(
      0,
      Math.min(newX, this.getGame().CANVAS_WIDTH - this.getImage().width)
    );
    // Fait descendre l'alien vers le bas du canvas en augmentant sa coordonnée y selon sa vitesse
    this.setPosition({
      x: newX,
      y: newY, // Ajoute la vitesse à la position verticale pour faire descendre l'alien
    });
  }

  protected collide(other: GameObject): void {
    // Méthode appelée lors d'une collision avec un autre GameObject

    if (other instanceof Player) {
      // Si l'objet en collision est un joueur
      console.log("Miam Miam !"); // Message dans la console pour debug/collision détectée
      this.getGame().over(); // Appelle la méthode "game over" du jeu, pour signaler la fin de la partie
      window.location.reload(); // Recharge la page pour redémarrer le jeu (optionnel dans collide, car déjà appelé dans over())
    }
  }
}
