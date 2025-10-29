import { Assets } from "../Assets.js"; // Importation du module Assets pour récupérer les images et ressources
import { Position } from "../Position.js"; // Importation du type Position pour gérer les coordonnées
import { Game } from "../Game.js"; // Importation de la classe Game pour référencer le jeu principal

export class GameObject {
  private position: Position; // Propriété qui stocke la position (x, y) de l'objet dans le jeu
  private image: HTMLImageElement; // Propriété qui contient l'image représentant l'objet à l'écran
  private game: Game; // Référence à l'instance du jeu principal auquel cet objet appartient

  constructor(game: Game) {
    this.position = {
      x: 0,
      y: 0,
    }; // Initialisation de la position à (0,0)
    this.image = Assets.getDefaultImage(); // Récupère une image par défaut depuis le gestionnaire d'Assets
    this.game = game; // Stocke la référence au jeu principal transmis au constructeur

    this.start(); // Appelle la méthode start pour initialiser l'objet (peut être redéfinie par héritage)
  }

  public overlap(other: GameObject): boolean {
    // La condition pour vérifier si les objets ne se chevauchent pas :
    if (
      this.right() < other.left() || // cet objet est complètement à gauche de l'autre
      this.left() > other.right() || // cet objet est complètement à droite de l'autre
      this.bottom() < other.top() || // cet objet est complètement au-dessus de l'autre
      this.top() > other.bottom() // cet objet est complètement en dessous de l'autre
    ) {
      // Si une de ces conditions est vraie, il n'y a pas chevauchement
      return false;
    }
    // Sinon, il y a chevauchement
    return true;
  }

  /** Méthodes utilitaires pour la position du GameObject */
  public top(): number {
    return this.position.y;
  }
  public bottom(): number {
    return this.position.y + this.image.height;
  }
  public left(): number {
    return this.position.x;
  }
  public right(): number {
    return this.position.x + this.image.width;
  }

  // Méthode publique pour récupérer l'image associée à cet objet
  public getImage(): HTMLImageElement {
    return this.image;
  }

  // Méthode publique pour récupérer la position actuelle de cet objet
  public getPosition(): Position {
    return this.position;
  }

  // Méthode publique pour récupérer la référence au jeu principal
  public getGame(): Game {
    return this.game;
  }

  // Méthode publique pour modifier l'image associée à cet objet
  public setImage(image: HTMLImageElement) {
    this.image = image;
  }

  // Méthode publique pour modifier la position de l'objet
  public setPosition(position: Position) {
    this.position = position;
  }

  // Méthode protégée appelée lors de l'initialisation de l'objet, prévue pour être surchargée par les classes filles
  protected start() {}

  // Méthode protégée appelée à chaque mise à jour du jeu, à surcharger pour définir le comportement de l'objet
  protected update(): void {}

  protected collide(other:GameObject) {}
    
    public callCollide(other:GameObject):void {
    this.collide(other);
  }

  // Méthode publique pour appeler la méthode update (permet de contrôler l'accès à la mise à jour)
  public callUpdate(): void {
    this.update();
  }

}
