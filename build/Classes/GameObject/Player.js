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
import { GameObject } from "./GameObject.js"; // Importation de la classe de base GameObject
import { Input } from "../Input.js"; // Importation du module Input pour gérer les entrées utilisateur
import { Assets } from "../Assets.js"; // Importation du module Assets pour accéder aux images
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 10; // Vitesse de déplacement horizontale du joueur (en pixels par mise à jour)
        return _this;
    }
    Player.prototype.start = function () {
        // Méthode appelée à l'initialisation du joueur (héritée et redéfinie)
        this.setImage(Assets.getPlayerImage()); // Définit l'image du joueur récupérée via Assets
        this.setPosition({
            x: this.getGame().CANVAS_WIDTH / 2, // Place le joueur horizontalement au centre du canvas
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height - 10, // Place le joueur proche du bas du canvas, en tenant compte de la hauteur de son image et un décalage de 10 pixels
        });
    };
    Player.prototype.update = function () {
        // Méthode appelée à chaque frame pour mettre à jour la position du joueur
        this.setPosition({
            x: this.getPosition().x += this.speed * Input.getAxisX(), // Change la position horizontale en fonction de la vitesse et de l'entrée utilisateur (gauche/droite)
            y: this.getPosition().y // Maintient la position verticale inchangée (le joueur bouge uniquement horizontalement)
        });
    };
    return Player;
}(GameObject));
export { Player };
