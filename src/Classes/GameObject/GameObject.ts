import { Assets } from "../Assets.js"; // Importation du module Assets pour récupérer les images et ressources
import { Position } from "../Position.js"; // Importation du type Position pour gérer les coordonnées
import { Game } from "../Game.js"; // Importation de la classe Game pour référencer le jeu principal

export class GameObject {
  private position: Position; // Propriété qui stocke la position (x, y) de l'objet dans le jeu
  private image: HTMLImageElement; // Propriété contenant l'image représentant cet objet à l'écran
  private game: Game; // Référence à l'instance de la classe Game, pour accéder au contexte global du jeu

  constructor(game: Game) {
    this.position = {
      x: 0,
      y: 0,
    }; // Initialise la position de l'objet aux coordonnées (0, 0)
    this.image = Assets.getDefaultImage(); // Affecte une image par défaut tirée du gestionnaire d’Assets
    this.game = game; // Stocke la référence au jeu principal passé au constructeur

    this.start(); // Appelle la méthode start, prévue pour initialiser objet et à redéfinir dans les classes héritées
  }

  public overlap(other: GameObject): boolean {
    // Vérifie si cet objet ne se chevauche pas avec un autre GameObject "other" en testant les côtés
    if (
      this.right() < other.left() || // Cet objet est entièrement à gauche de l'autre (pas de chevauchement horizontal)
      this.left() > other.right() || // Cet objet est entièrement à droite de l'autre (pas de chevauchement horizontal)
      this.bottom() < other.top() || // Cet objet est totalement au-dessus de l'autre (pas de chevauchement vertical)
      this.top() > other.bottom() // Cet objet est totalement en dessous de l'autre (pas de chevauchement vertical)
    ) {
      return false; // Si une de ces conditions est vraie, aucun chevauchement n'a lieu
    }
    return true; // Sinon, les objets se chevauchent
  }

  /** Méthodes utilitaires pour obtenir les bords du GameObject */

  public top(): number {
    return this.position.y; // Retourne la coordonnée y en haut de l'objet
  }
  public bottom(): number {
    return this.position.y + this.image.height; // Coordonnée y en bas, calculée avec la hauteur de l'image
  }
  public left(): number {
    return this.position.x; // Coordonnée x à gauche de l'objet
  }
  public right(): number {
    return this.position.x + this.image.width; // Coordonnée x à droite, calculée avec la largeur de l'image
  }

  // Méthode publique pour obtenir l'image affichée de cet objet
  public getImage(): HTMLImageElement {
    return this.image;
  }

  // Méthode publique pour obtenir la position actuelle de l'objet
  public getPosition(): Position {
    return this.position;
  }

  // Méthode publique pour récupérer la référence au jeu principal
  public getGame(): Game {
    return this.game;
  }

  // Méthode publique pour modifier l'image affichée de l'objet
  public setImage(image: HTMLImageElement) {
    this.image = image;
  }

  // Méthode publique pour changer la position de l'objet
  public setPosition(position: Position) {
    this.position = position;
  }

  // Méthode protégée appelée lors de l'initialisation, prévue pour être redéfinie dans les classes filles
  protected start() {}

  // Méthode protégée appelée à chaque mise à jour du jeu, à surcharger selon le comportement voulu
  protected update(): void {}

  // Méthode protégée prévue pour gérer la collision entre ce GameObject et un autre 
  protected collide(other: GameObject) {}

  // Méthode publique permettant d'appeler la méthode protégée collide 
  public callCollide(other: GameObject): void {
    this.collide(other);
  }

  // Méthode publique permettant d'appeler la méthode update (contrôle d’accès)
  public callUpdate(): void {
    this.update();
  }
}
