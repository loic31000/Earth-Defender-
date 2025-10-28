import { GameObject } from "./GameObject/GameObject.js";
import { Player } from "./GameObject/Player.js";
import { Input } from "./Input.js";
import { Alien } from "./GameObject/Alien.js"

export class Game {
  // Déclaration d'une classe exportable nommée Game

  // Attributs
  private context: CanvasRenderingContext2D; // Stocke le contexte de dessin 2D du canvas
  public readonly CANVAS_WIDTH: number = 900; // Largeur fixe du canvas en pixels
  public readonly CANVAS_HEIGHT: number = 600; // Hauteur fixe du canvas en pixels
  private alien: Alien;

  // initialisation
  constructor() {
    const canvas: HTMLCanvasElement = document.querySelector("canvas"); // Sélectionne l'élément <canvas> dans le DOM
    canvas.width = this.CANVAS_WIDTH; // Définit la largeur du canvas dans le DOM
    canvas.height = this.CANVAS_HEIGHT; // Définit la hauteur du canvas dans le DOM
    this.context = canvas.getContext("2d"); // Récupère le contexte 2D pour dessiner sur le canvas
  }

  private player: Player;
  public start(): void {
    // Méthode pour initialiser le dessin
    this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT); // Efface toute la zone du canvas (nettoyage)
    this.context.fillStyle = "#141414"; // Définit la couleur de remplissage (gris foncé)
    this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT); // Dessine un rectangle plein couvrant tout le canvas

    const gameObject = new GameObject(this);
    this.player = new Player(this);

    this.draw(gameObject);
    this.draw(this.player);
    Input.listen();
    this.loop();
    this.alien = new Alien(this);
    this.draw(this.alien);
  }

  private draw(gameObject: GameObject) {
    this.context.drawImage(
      gameObject.getImage(),
      gameObject.getPosition().x,
      gameObject.getPosition().y,
      gameObject.getImage().width,
      gameObject.getImage().height
    );
  }
    private loop(){
        setInterval(()=>{
            console.log("Frame!");
            // Clear context
            this.context.clearRect(0,0,this.CANVAS_WIDTH,this.CANVAS_HEIGHT);
            this.context.fillStyle = "#141414";
            this.context.fillRect(0,0,this.CANVAS_WIDTH,this.CANVAS_HEIGHT);

            this.player.callUpdate();
            this.draw(this.player);
            
            this.alien.callUpdate();
            this.draw(this.alien);

        },10); 
    }
}
