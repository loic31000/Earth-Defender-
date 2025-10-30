import { Assets } from "../Assets.js"; 
// Import du module Assets pour accéder aux images et ressources graphiques

import { Position } from "../Position.js"; 
// Import du type Position, définissant une structure {x, y} pour les coordonnées

import { Game } from "../Game.js"; 
// Import de la classe principale Game pour référencer le jeu courant

export class GameObject {
  private position: Position; 
  // Stocke la position actuelle de l’objet dans le canvas (coordonnées x, y)

  private image: HTMLImageElement; 
  // Contient l’image affichée pour cet objet dans le jeu

  private game: Game; 
  // Référence à l’instance du jeu principal, pour accéder aux propriétés globales (canvas, etc.)

  constructor(game: Game) {
    this.position = {
      x: 0,
      y: 0,
    }; 
    // Initialise la position à (0,0) par défaut

    this.image = Assets.getDefaultImage(); 
    // Affecte une image par défaut provenant du gestionnaire d’Assets

    this.game = game; 
    // Stocke la référence à l’objet du jeu pour interaction globale

    this.start(); 
    // Appelle la méthode start, à redéfinir par héritage pour initialiser l’objet après création
  }

  // Méthode pour détecter le chevauchement (collision) avec un autre objet "other" en testant les côtés
  public overlap(other: GameObject): boolean {
    if (
      this.right() < other.left() || // Cet objet est complètement à gauche de l'autre
      this.left() > other.right() || // Cet objet est complètement à droite de l'autre
      this.bottom() < other.top() || // Cet objet est complètement au-dessus de l'autre
      this.top() > other.bottom()    // Cet objet est complètement en dessous de l'autre
    ) {
      return false; // Si une de ces conditions est vraie, pas de chevauchement
    }
    return true; // Sinon, il y a collision (chevauchement)
  }

  /** Méthodes utiles pour obtenir les bords de l’objet selon sa position et dimension */

  public top(): number {
    return this.position.y; 
    // Coordonnée y du bord supérieur de l'objet
  }

  public bottom(): number {
    return this.position.y + this.image.height; 
    // Coordonnée y du bord inférieur, calculée via la hauteur de l’image
  }

  public left(): number {
    return this.position.x; 
    // Coordonnée x du bord gauche
  }

  public right(): number {
    return this.position.x + this.image.width; 
    // Coordonnée x du bord droit, via la largeur de l’image
  }

  // Accesseur pour récupérer l'image affichée par cet objet
  public getImage(): HTMLImageElement {
    return this.image;
  }

  // Accesseur pour récupérer la position actuelle (objet {x,y})
  public getPosition(): Position {
    return this.position;
  }

  // Retourne la référence à l’objet Game (jeu principal)
  public getGame(): Game {
    return this.game;
  }

  // Méthode pour modifier l’image affichée (changer le sprite)
  public setImage(image: HTMLImageElement) {
    this.image = image;
  }

  // Méthode pour changer la position de l’objet (mise à jour des coordonnées)
  public setPosition(position: Position) {
    this.position = position;
  }

  // Méthode destinée à être redéfinie dans les classes filles pour initialiser l’objet
  protected start() {}

  // Méthode destinée à être redéfinie pour mettre à jour la logique de l’objet à chaque frame
  protected update(): void {}

  // Méthode destinée à gérer les effets de collision avec un autre objet, à redéfinir dans les héritages
  protected collide(other: GameObject) {}

  // Méthode publique exposée appelant la méthode protégée collide (pour gestion des collisions)
  public callCollide(other: GameObject): void {
    this.collide(other);
  }

  // Méthode publique exposée appelant la méthode protégée update (mise à jour logique)
  public callUpdate(): void {
    this.update();
  }
}
