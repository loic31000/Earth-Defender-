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
import { GameObject } from "./GameObject.js";
// Import de la classe de base GameObject dont hérite Player, fournissant les propriétés et méthodes communes
import { Input } from "../Input.js";
// Import du module pour gérer les entrées utilisateur (clavier, souris)
import { Assets } from "../Assets.js";
// Import du module pour accéder aux ressources graphiques, comme l’image du joueur
import { Laser } from "./Laser.js";
// Import de la classe Laser qui représente les projectiles tirés par le joueur
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastShootTime = Date.now();
        // Timestamp du dernier tir réalisé, initialisé à la création du joueur
        _this.shootInterval_ms = 200;
        // Intervalle minimum en millisecondes entre deux tirs (limite la cadence de tir)
        _this.speed = 10;
        return _this;
    }
    // Vitesse de déplacement horizontal du joueur, en pixels par frame
    Player.prototype.start = function () {
        // Méthode appelée automatiquement à l'initialisation du joueur (héritée et redéfinie)
        this.setImage(Assets.getPlayerImage());
        // Définit l'image du joueur à partir des assets chargés (graphisme du vaisseau)
        this.setPosition({
            x: this.getGame().CANVAS_WIDTH / 2 - this.getImage().width / 2,
            // Centre horizontalement le joueur sur le canvas en tenant compte de la largeur de l'image
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height - 100,
            // Position verticale du joueur proche du bas de l’écran, avec un décalage fixe de 100 pixels
        });
    };
    Player.prototype.update = function () {
        // Méthode appelée à chaque frame pour mettre à jour la position et actions du joueur
        var newX = this.getPosition().x + this.speed * Input.getAxisX();
        // Calcule la nouvelle position horizontale selon la vitesse et l'entrée utilisateur (axe X)
        newX = Math.max(0, Math.min(newX, this.getGame().CANVAS_WIDTH - this.getImage().width));
        // Contraint la position pour rester dans les limites du canvas (0 au bord droit moins la largeur du joueur)
        this.setPosition({
            x: newX,
            y: this.getPosition().y,
            // Garde la position verticale fixe (le joueur ne se déplace qu’horizontalement)
        });
        // Gestion du tir : si le joueur appuie pour tirer et que le délai entre tirs est respecté
        if (Input.getIsShooting() &&
            Date.now() - this.lastShootTime >= this.shootInterval_ms) {
            this.getGame().instanciate(new Laser(this.getGame()));
            // Créé un nouveau laser et l’ajoute aux objets du jeu (tir lancé)
            this.lastShootTime = Date.now();
            // Met à jour le temps du dernier tir pour gérer la cadence
        }
    };
    return Player;
}(GameObject));
export { Player };
