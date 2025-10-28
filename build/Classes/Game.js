import { GameObject } from "./GameObject/GameObject.js";
import { Player } from "./GameObject/Player.js";
import { Input } from "./Input.js";
var Game = /** @class */ (function () {
    // initialisation
    function Game() {
        this.CANVAS_WIDTH = 900; // Largeur fixe du canvas en pixels
        this.CANVAS_HEIGHT = 600; // Hauteur fixe du canvas en pixels
        var canvas = document.querySelector("canvas"); // Sélectionne l'élément <canvas> dans le DOM
        canvas.width = this.CANVAS_WIDTH; // Définit la largeur du canvas dans le DOM
        canvas.height = this.CANVAS_HEIGHT; // Définit la hauteur du canvas dans le DOM
        this.context = canvas.getContext("2d"); // Récupère le contexte 2D pour dessiner sur le canvas
    }
    Game.prototype.start = function () {
        // Méthode pour initialiser le dessin
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT); // Efface toute la zone du canvas (nettoyage)
        this.context.fillStyle = "#141414"; // Définit la couleur de remplissage (gris foncé)
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT); // Dessine un rectangle plein couvrant tout le canvas
        var gameObject = new GameObject(this);
        this.player = new Player(this);
        this.draw(gameObject);
        this.draw(this.player);
        Input.listen();
        this.loop();
    };
    Game.prototype.draw = function (gameObject) {
        this.context.drawImage(gameObject.getImage(), gameObject.getPosition().x, gameObject.getPosition().y, gameObject.getImage().width, gameObject.getImage().height);
    };
    Game.prototype.loop = function () {
        var _this = this;
        setInterval(function () {
            console.log("Frame!");
            _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.context.fillStyle = "#141414";
            _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.draw(_this.player);
            _this.player.callUpdate();
        }, 10);
    };
    return Game;
}());
export { Game };
