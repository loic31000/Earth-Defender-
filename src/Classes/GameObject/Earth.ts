import { Assets } from "../Assets.js";
import { GameObject } from "./GameObject.js";
import { Alien } from "./Alien.js";

export class Earth extends GameObject {
  private health: number = 3; 

  public getHealth(): number {
    return this.health;
  }

  protected start(): void {
    this.setImage(Assets.getEarthImage());
    this.getImage().width = this.getGame().CANVAS_WIDTH; // couvre toute la largeur du canvas
    this.getImage().height = 80; // taille fixe

    this.setPosition({ 
      x: 0,
      y: this.getGame().CANVAS_HEIGHT - this.getImage().height
    });
  }

  protected collide(other: GameObject): void {
    if (other instanceof Alien) {
      this.health = Math.max(0, this.health - 1);
      console.log(`Terre touchée, PV restant : ${this.health}`);
      this.getGame().destroy(other);
      if (this.health === 0) {
        this.getGame().over();
      }
    }
  }
}
