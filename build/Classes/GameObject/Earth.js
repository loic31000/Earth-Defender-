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
// Import du module Assets pour accéder aux images et ressources graphiques
import { GameObject } from "./GameObject.js";
// Import de la classe de base GameObject dont hérite Earth
import { Alien } from "./Alien.js";
// Import de la classe Alien, utilisée dans la gestion des collisions
var Earth = /** @class */ (function (_super) {
    __extends(Earth, _super);
    function Earth() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.health = 3;
        return _this;
    }
    // Point de vie de la Terre, initialisé à 3
    Earth.prototype.getHealth = function () {
        return this.health;
        // Getter public pour récupérer la valeur actuelle de la santé
    };
    Earth.prototype.start = function () {
        // Méthode appelée à l'initialisation de l’objet Earth
        this.setImage(Assets.getEarthImage());
        // Définit l'image représentant la Terre depuis les assets
        this.getImage().width = this.getGame().CANVAS_WIDTH;
        // Ajuste la largeur de l'image pour couvrir toute la largeur du canvas
        this.getImage().height = 80;
        // Hauteur fixe de l’image de la Terre
        this.setPosition({
            x: 0,
            // Position horizontale alignée à gauche du canvas
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height
            // Position verticale placée en bas du canvas, en tenant compte de la hauteur de l’image
        });
    };
    Earth.prototype.collide = function (other) {
        // Méthode appelée lorsqu'une collision est détectée avec un autre GameObject
        if (other instanceof Alien) {
            // Si la collision concerne un alien
            this.health = Math.max(0, this.health - 1);
            // Réduit la santé de la Terre d’un point, sans descendre en dessous de zéro
            console.log("Terre touch\u00E9e, PV restant : ".concat(this.health));
            // Affiche dans la console le nombre de PV restants
            this.getGame().destroy(other);
            // Supprime l’alien qui a touché la Terre du jeu
            if (this.health === 0) {
                // Si la santé est tombée à zéro, déclenche la fin de la partie
                this.getGame().over();
            }
        }
    };
    return Earth;
}(GameObject));
export { Earth };
