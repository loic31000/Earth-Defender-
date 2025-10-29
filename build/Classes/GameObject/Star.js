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
import { Assets } from "../Assets.js"; // Importation du module Assets pour accéder aux images
import { GameObject } from "./GameObject.js"; // Importation de la classe de base GameObject
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Star.prototype.start = function () {
        // Méthode appelée lors de l'initialisation de l'objet Star (redéfinition)
        this.setImage(Assets.getStarImage()); // Définit l'image de la star via Assets
        this.setPosition({
            x: Math.random() * this.getGame().CANVAS_WIDTH, // Place la star à une position horizontale aléatoire dans tout le canvas
            y: Math.random() * this.getGame().CANVAS_HEIGHT - 10 // Place la star à une position verticale aléatoire dans le canvas, légèrement décalée vers le haut (-10)
        });
    };
    Star.prototype.update = function () {
        // Méthode appelée à chaque mise à jour de la boucle de jeu
        this.setPosition({
            x: this.getPosition().x, // Garde la même position horizontale
            y: this.getPosition().y + 1 // Fait descendre la star d'un pixel à chaque mise à jour
        });
        if (this.getPosition().y > this.getGame().CANVAS_HEIGHT) {
            // Si la star dépasse le bas du canvas
            this.setPosition({
                x: this.getPosition().x, // Garde la même position horizontale
                y: 0 // Replace la star tout en haut du canvas pour recommencer sa descente
            });
        }
    };
    return Star;
}(GameObject));
export { Star };
