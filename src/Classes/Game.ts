import { GameObject } from "./GameObject/GameObject.js"; // Importe la classe GameObject
import { Player } from "./GameObject/Player.js"; // Importe la classe Player (héritée de GameObject)
import { Input } from "./Input.js"; // Importe le module Input pour gérer les entrées utilisateur (clavier/souris)
import { Alien } from "./GameObject/Alien.js"; // Importe la classe Alien (héritée de GameObject)
// import { Assets } from "./Assets.js";
import { Star } from "./GameObject/Star.js"; // Importe la classe Star (héritée de GameObject)
import { Earth } from "./GameObject/Earth.js";

export class Game {
  // Déclaration de la classe principale Game

  // Attributs principaux
  private context: CanvasRenderingContext2D; // Contexte 2D pour dessiner sur le canvas HTML
  public readonly CANVAS_WIDTH: number = 900; // Largeur fixe du canvas en pixels
  public readonly CANVAS_HEIGHT: number = 600; // Hauteur fixe du canvas en pixels
  private player: Player; // Instance du joueur
  private alien: Alien; // Instance d'un alien générique
  private nbAliens: number = 10; // Nombre d’aliens à créer dans le jeu
  private star: Star; // Instance d'une star générique
  private nbStars: number = 100; // Nombre de stars à créer


  private earth: Earth;



  // Tableau pour stocker tous les GameObjects du jeu
  private gameObject: GameObject[] = [];

  // Constructeur de la classe Game
  constructor() {
    const canvas: HTMLCanvasElement = document.querySelector("canvas"); // Sélectionne la balise canvas du DOM
    canvas.width = this.CANVAS_WIDTH; // Définit la largeur du canvas
    canvas.height = this.CANVAS_HEIGHT; // Définit la hauteur du canvas
    this.context = canvas.getContext("2d"); // Récupère le contexte de dessin 2D du canvas
  }

  // Méthode pour démarrer le jeu et initialiser objets & affichage
  public start(): void {
    // Nettoie la zone du canvas (avant début du jeu)
    this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.context.fillStyle = "#141414"; // Choisit une couleur de fond (gris foncé)
    this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT); // Remplit le canvas avec cette couleur

    const gameObject = new GameObject(this); // Crée un GameObject générique
    this.player = new Player(this); // Crée le joueur

    this.draw(gameObject); // Dessine le GameObject générique
    this.draw(this.player); // Dessine le joueur
    Input.listen(); // Active la gestion des entrées clavier / souris
    this.loop(); // Lance la boucle principale du jeu (mise à jour et dessin répétés)

    this.alien = new Alien(this); // Crée un alien générique
    this.draw(this.alien); // Dessine l'alien
    this.star = new Star(this); // Crée une star générique
    this.draw(this.star); // Dessine la star



    this.earth = new Earth(this);
    this.draw(this.earth);
    this.instanciate(this.earth);


    this.instanciate(this.player); // Ajoute le joueur au tableau des GameObjects

    // Ajoute plusieurs aliens dans le tableau via une boucle
    for (let i = 0; i < this.nbAliens; i++) {
      this.instanciate(new Alien(this)); // Crée et ajoute un alien
    }

    // Ajoute plusieurs stars dans le tableau via une boucle
    for (let i = 0; i < this.nbStars; i++) {
      this.instanciate(new Star(this)); // Crée et ajoute une star
    }
  }

  // Méthode publique pour récupérer l'instance du joueur
  public getPlayer(): Player {
    return this.player;
  }

  public getEarth(): Earth {
    return this.earth;
  }

  // Supprimer gameObject du tableau de gameObjects
  public destroy(gameObject: GameObject): void {
    this.gameObject = this.gameObject.filter((go) => go != gameObject); // Filtre et enlève l'objet spécifié
  }

  // Méthode publique pour ajouter un GameObject au tableau gameObject
  public instanciate(gameObject: GameObject): void {
    this.gameObject.push(gameObject); // Ajoute le GameObject au tableau
  }

  // Méthode privée pour dessiner un GameObject sur le canvas
private draw(gameObject: GameObject) {
  if (!gameObject) return; // Ne dessine rien si l'objet est undefined
  this.context.drawImage(
    gameObject.getImage(),
    gameObject.getPosition().x,
    gameObject.getPosition().y,
    gameObject.getImage().width,
    gameObject.getImage().height
  );
}


  // Méthode publique qui affiche une alerte "GameOver" et recharge la page
  public over(): void {
    alert("GameOver!"); // Affiche un message à l'utilisateur
    window.location.reload(); // Recharge la page web pour redémarrer le jeu
  }

  // Boucle principale du jeu appelée toutes les 10 millisecondes (~100 fois par seconde)
  private loop() {
    setInterval(() => {
      console.log("Frame!"); // Affiche "Frame!" dans la console pour debug

      // Nettoyage du canvas avant de redessiner tous les objets
      this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
      this.context.fillStyle = "#141414"; // Applique la couleur de fond
      this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT); // Remplit le canvas

      this.player.callUpdate(); // Met à jour la logique du joueur (position, état, etc.)
      this.draw(this.player); // Dessine le joueur après mise à jour

      this.alien.callUpdate(); // Met à jour la logique de l’alien générique
      this.draw(this.alien); // Dessine l'alien

      this.star.callUpdate(); // Met à jour la logique de la star générique
      this.draw(this.star); // Dessine la star

      // this.earth.callUpdate();
      this.draw(this.earth);




      // Pour chaque GameObject dans gameObject
      this.gameObject.forEach((go) => {
        go.callUpdate(); // Mise à jour de son état / position
        this.draw(go); // Dessine l'objet après mise à jour

        // Pour chaque autre GameObject, teste si ils se chevauchent et ne sont pas le même objet
        this.gameObject.forEach((other) => {
          if (other != go && go.overlap(other)) {
            console.log("Deux GameObject différents se touchent"); // Message debug
            go.callCollide(other); // Appelle la méthode de collision du GameObject
          }
        });
      });
    }, 10);
  }
}
