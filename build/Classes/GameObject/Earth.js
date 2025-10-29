var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Assets } from "../Assets.js";
import { GameObject } from "./GameObject.js";
var Earth = /** @class */ (function (_super) {
    __extends(Earth, _super);
    function Earth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Earth.prototype.start = function () {
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
    };
    Earth.prototype.collide = function (other) {
        // Méthode appelée lors d'une collision avec un autre GameObject
        // if (other instanceof Player) { // Si l'objet en collision est un joueur
        //   console.log("1 PV en moins!!!"); // Message dans la console pour debug/collision détectée
        //   this.getGame().over(); // Appelle la méthode "game over" du jeu, pour signaler la fin de la partie
        //   window.location.reload(); // Recharge la page pour redémarrer le jeu (optionnel dans collide, car déjà appelé dans over())
        // }
    };
    return Earth;
}(GameObject));
export { Earth };
