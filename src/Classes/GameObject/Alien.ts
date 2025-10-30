import { Assets } from "../Assets.js";
// Import du module Assets pour accéder aux images et ressources graphiques

import { GameObject } from "./GameObject.js";
// Import de la classe de base GameObject que Alien étend, fournissant position, image, collision

import { Player } from "../GameObject/Player.js";
// Import de la classe Player, utilisée pour vérifier les collisions avec le joueur

export class Alien extends GameObject {
  private speed: number = 1;
  // Vitesse verticale de déplacement de l’alien, ici 1 pixel par frame

  protected start(): void {
    // Méthode appelée lors de l'initialisation de l’alien (surcharge de la méthode start de GameObject)

    this.setImage(Assets.getAlienImage());
    // Définit l’image de l’alien récupérée depuis les assets (sprite)

    // Positionne l’alien à une position aléatoire dans la partie haute de l’écran
    this.setPosition({
      x: Math.random() * this.getGame().CANVAS_WIDTH,
      // Position horizontale aléatoire sur toute la largeur du canvas

      y: (Math.random() * this.getGame().CANVAS_HEIGHT) / 4 - 50,
      // Position verticale aléatoire dans le quart supérieur du canvas, décalée vers le haut de 50 pixels
    });
  }

  protected update(): void {
    // Mise à jour de la position à chaque frame

    let newY = this.getPosition().y + this.speed;
    // L’alien descend en ajoutant sa vitesse à sa position verticale

    let newX = this.getPosition().x;
    // La position horizontale reste inchangée (pas de déplacement latéral)

    if (newY > this.getGame().CANVAS_HEIGHT - this.getImage().height) {
      // Si l’alien atteint ou dépasse le bas du canvas (prise en compte de sa hauteur)
      newY = this.getGame().CANVAS_HEIGHT - this.getImage().height;
      // Bloque l’alien au bas de l’écran pour éviter qu’il sorte du canvas
    }

    newX = Math.max(
      0,
      Math.min(newX, this.getGame().CANVAS_WIDTH - this.getImage().width)
    );
    // Garantie que la position horizontale reste dans les limites du canvas

    this.setPosition({
      x: newX,
      y: newY,
      // Met à jour la position avec les nouvelles coordonnées calculées
    });
  }

  protected collide(other: GameObject): void {
    // Méthode appelée quand une collision est détectée avec un autre GameObject

    if (other instanceof Player) {
      // Affiche un message dans la console, utile pour déboguer la collision

      this.getGame().over();
      // Appelle la méthode over() du jeu pour déclencher la fin de la partie

      window.location.reload();
      // Recharge la page pour redémarrer le jeu (souvent fait dans over() déjà)
    }
  }
}
