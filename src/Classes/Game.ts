import { GameObject } from "./GameObject/GameObject.js"; 
import { Player } from "./GameObject/Player.js"; 
import { Input } from "./Input.js"; 
import { Alien } from "./GameObject/Alien.js"; 
import { Assets } from "./Assets.js"; 
import { Star } from "./GameObject/Star.js"; 
import { Earth } from "./GameObject/Earth.js"; 

export class Game {
  private context: CanvasRenderingContext2D;
  public readonly CANVAS_WIDTH: number = 900;
  public readonly CANVAS_HEIGHT: number = 600;

  private player: Player;
  private earth: Earth;

  private aliens: Alien[] = [];
  private aliensKilled: number = 0;
  private maxAliens: number = 10;
  private alienSpawnInterval: number = 2000;
  private lastAlienSpawnTime: number = 0;

  private starCount: number = 100;

  private gameObject: GameObject[] = [];

  private drawHealth() {
    const heartImage = Assets.getHeartImage();

    if (!heartImage) {
      console.error("Image cœur non trouvée");
      return;
    }

    const health = this.earth.getHealth();

    if (health <= 0) return; // ne rien afficher si PV à zéro

    // Dessiner le coeur en haut à gauche
    this.context.drawImage(heartImage, 10, 10, 30, 30);

    // Dessiner le texte des PV à côté
    this.context.font = "20px Arial";
    this.context.fillStyle = "red";
    this.context.fillText(health.toString(), 50, 35);
  }

  constructor() {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    canvas.width = this.CANVAS_WIDTH;
    canvas.height = this.CANVAS_HEIGHT;
    this.context = canvas.getContext("2d");
  }

  public getPlayer(): Player {
    return this.player;
  }

  public getEarth(): Earth {
    return this.earth;
  }

  public start(): void {
    this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.context.fillStyle = "#141414";
    this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

    this.player = new Player(this);
    this.instanciate(this.player);

    this.earth = new Earth(this);
    this.instanciate(this.earth);

    // Créer et instancier stars
    for (let i = 0; i < this.starCount; i++) {
      const star = new Star(this);
      this.instanciate(star);
    }

    Input.listen();

    this.loop();
  }

  private trySpawnAlien() {
    const now = Date.now();
    if (this.aliens.length < this.maxAliens && now - this.lastAlienSpawnTime > this.alienSpawnInterval) {
      const alien = new Alien(this);
      this.instanciate(alien);
      this.aliens.push(alien);
      this.lastAlienSpawnTime = now;
    }
  }

  public destroy(gameObject: GameObject): void {
    this.gameObject = this.gameObject.filter(go => go != gameObject);

    if (gameObject instanceof Alien) {
      this.aliens = this.aliens.filter(a => a != gameObject);
      this.aliensKilled++;
      // Tous les 10 aliens tués, accélère la fréquence d'apparition
      if (this.aliensKilled % 10 === 0 && this.alienSpawnInterval > 500) {
        this.alienSpawnInterval -= 300; // Réduit l'intervalle, limite la vitesse
        console.log("Nouveau rythme d'apparition :", this.alienSpawnInterval, "ms");
      }
    }
  }

  public instanciate(gameObject: GameObject): void {
    this.gameObject.push(gameObject);
  }

  private draw(gameObject: GameObject) {
    if (!gameObject) return;
    this.context.drawImage(
      gameObject.getImage(),
      gameObject.getPosition().x,
      gameObject.getPosition().y,
      gameObject.getImage().width,
      gameObject.getImage().height
    );
  }

  private drawAlienCounter() {
    const text = `Aliens tués : ${this.aliensKilled}`;
    this.context.font = "20px Arial";
    this.context.fillStyle = "white";
    const textWidth = this.context.measureText(text).width;
    const x = this.CANVAS_WIDTH - textWidth - 10;
    const y = 30;
    this.context.fillText(text, x, y);
  }

  public over(): void {
    alert("GameOver!");
    window.location.reload();
  }

  private loop(): void {
    setInterval(() => {
      this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
      this.context.fillStyle = "#141414";
      this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

      this.trySpawnAlien();

      this.gameObject.forEach(go => {
        go.callUpdate();
        this.draw(go);
      });

      // Gestion collisions
      for (let i = 0; i < this.gameObject.length; i++) {
        for (let j = i + 1; j < this.gameObject.length; j++) {
          const obj1 = this.gameObject[i];
          const obj2 = this.gameObject[j];
          if (obj1.overlap(obj2)) {
            obj1.callCollide(obj2);
            obj2.callCollide(obj1);
          }
        }
      }

      this.drawAlienCounter();
      this.drawHealth();
    }, 10);
  }
}
