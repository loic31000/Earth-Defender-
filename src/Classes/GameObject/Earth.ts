import { Assets } from "../Assets.js"; 
// Import du module Assets pour accéder aux images et ressources graphiques

import { GameObject } from "./GameObject.js"; 
// Import de la classe de base GameObject dont hérite Earth

import { Alien } from "./Alien.js"; 
// Import de la classe Alien, utilisée dans la gestion des collisions

export class Earth extends GameObject {
  private health: number = 3; 
  // Point de vie de la Terre, initialisé à 3

  public getHealth(): number {
    return this.health; 
    // Getter public pour récupérer la valeur actuelle de la santé
  }

  protected start(): void {
    // Méthode appelée à l'initialisation de l’objet Earth

    this.setImage(Assets.getEarthImage()); 
    // Définit l'image représentant la Terre depuis les assets

    this.getImage().width = this.getGame().CANVAS_WIDTH; 
    // Ajuste la largeur de l'image pour couvrir toute la largeur du canvas

    this.getImage().height = 80; 
    // Hauteur fixe de l’image de la Terre

    this.setPosition({ 
      x: 0, 
      // Position horizontale alignée à gauche du canvas

      y: this.getGame().CANVAS_HEIGHT - this.getImage().height 
      // Position verticale placée en bas du canvas, en tenant compte de la hauteur de l’image
    });
  }

  protected collide(other: GameObject): void {
    // Méthode appelée lorsqu'une collision est détectée avec un autre GameObject

    if (other instanceof Alien) {
      // Si la collision concerne un alien

      this.health = Math.max(0, this.health - 1); 
      // Réduit la santé de la Terre d’un point, sans descendre en dessous de zéro

      console.log(`Terre touchée, PV restant : ${this.health}`); 
      // Affiche dans la console le nombre de PV restants

      this.getGame().destroy(other); 
      // Supprime l’alien qui a touché la Terre du jeu

      if (this.health === 0) {
        // Si la santé est tombée à zéro, déclenche la fin de la partie
        this.getGame().over();
      }
    }
  }
}
