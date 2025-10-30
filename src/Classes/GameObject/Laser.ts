import { Assets } from "../Assets.js";
// Import du module Assets pour accéder aux images et ressources graphiques

import { Alien } from "./Alien.js";
// Import de la classe Alien pour détecter les collisions avec les lasers

import { GameObject } from "./GameObject.js";
// Import de la classe de base GameObject dont hérite Laser

export class Laser extends GameObject {
  protected start(): void {
    // Méthode appelée à l'initialisation du laser

    this.setImage(Assets.getLaserImage());
    // Définit l’image du laser depuis les assets graphiques

    this.setPosition({
      x: this.getGame().getPlayer().getPosition().x + 50,
      y: this.getGame().getPlayer().getPosition().y - this.getImage().height,
    });
  }
  

  protected update(): void {
    // Mise à jour effectuée à chaque frame pour déplacer le laser vers le haut

    this.setPosition({
      x: this.getPosition().x,
      // Garde la même position horizontale

      y: this.getPosition().y - 10,
      // Déplace le laser de 10 pixels vers le haut (coordonnée y décroissante)
    });

    if (this.getPosition().y < 0) {
      // Si le laser sort de l’écran par le haut
      this.getGame().destroy(this);
      // Supprime le laser du jeu pour éviter les calculs inutiles
    }
  }

  protected collide(other: GameObject): void {
    // Gère la collision du laser avec un autre objet

    if (other instanceof Alien) {
      // Si le laser touche un alien

      this.getGame().destroy(other);
      // Supprime l’alien touché

      this.getGame().destroy(this);
      // Supprime également le laser (qui disparaît après avoir touché)
    }
  }
}
