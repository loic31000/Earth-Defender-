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
import { Alien } from "./Alien.js";
// Import de la classe Alien pour détecter les collisions avec les lasers
import { GameObject } from "./GameObject.js";
// Import de la classe de base GameObject dont hérite Laser
var Laser = /** @class */ (function (_super) {
    __extends(Laser, _super);
    function Laser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Laser.prototype.start = function () {
        // Méthode appelée à l'initialisation du laser
        this.setImage(Assets.getLaserImage());
        // Définit l’image du laser depuis les assets graphiques
        this.setPosition({
            x: this.getGame().getPlayer().getPosition().x + 50,
            y: this.getGame().getPlayer().getPosition().y - this.getImage().height,
        });
    };
    Laser.prototype.update = function () {
        // Mise à jour effectuée à chaque frame pour déplacer le laser vers le haut
        this.setPosition({
            x: this.getPosition().x,
            // Garde la même position horizontale
            y: this.getPosition().y - 10,
            // Déplace le laser de 10 pixels vers le haut (coordonnée y décroissante)
        });
        if (this.getPosition().y < 0) {
            // Si le laser sort de l’écran par le haut
            this.getGame().destroy(this);
            // Supprime le laser du jeu pour éviter les calculs inutiles
        }
    };
    Laser.prototype.collide = function (other) {
        // Gère la collision du laser avec un autre objet
        if (other instanceof Alien) {
            // Si le laser touche un alien
            this.getGame().destroy(other);
            // Supprime l’alien touché
            this.getGame().destroy(this);
            // Supprime également le laser (qui disparaît après avoir touché)
        }
    };
    return Laser;
}(GameObject));
export { Laser };
