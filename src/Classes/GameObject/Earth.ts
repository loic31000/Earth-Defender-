import { Assets } from "../Assets.js";
import { GameObject } from "./GameObject.js";
import { Player } from "./Player.js";

export class Earth extends GameObject {

protected start(): void {
    // Définit l'image de la Terre
    this.setImage(Assets.getEarthImage());

    // Modifie la largeur de l'image pour remplir tout le bas du canvas
    this.getImage().width = this.getGame().CANVAS_WIDTH;
    this.getImage().height = 80; // Par exemple, fixe une hauteur raisonnable pour la Terre

    // Place la Terre bien en bas du canvas
    this.setPosition({
      x: 0, // Commence tout à gauche du canvas
      y: this.getGame().CANVAS_HEIGHT - this.getImage().height // Place en bas
    });
   }
     protected collide(other: GameObject): void {
    // Méthode appelée lors d'une collision avec un autre GameObject

    // if (other instanceof Player) { // Si l'objet en collision est un joueur
    //   console.log("1 PV en moins!!!"); // Message dans la console pour debug/collision détectée
    //   this.getGame().over(); // Appelle la méthode "game over" du jeu, pour signaler la fin de la partie
    //   window.location.reload(); // Recharge la page pour redémarrer le jeu (optionnel dans collide, car déjà appelé dans over())
    // }
  }
}
