import { Player } from "./GameObject/Player.js";
import { Input } from "./Input.js";
import { Alien } from "./GameObject/Alien.js";
import { Assets } from "./Assets.js";
import { Star } from "./GameObject/Star.js";
import { Earth } from "./GameObject/Earth.js";
var Game = /** @class */ (function () {
    function Game() {
        this.CANVAS_WIDTH = 900;
        this.CANVAS_HEIGHT = 600;
        this.aliens = [];
        this.aliensKilled = 0;
        this.maxAliens = 10;
        this.alienSpawnInterval = 2000;
        this.lastAlienSpawnTime = 0;
        this.starCount = 100;
        this.gameObject = [];
        var canvas = document.querySelector("canvas");
        canvas.width = this.CANVAS_WIDTH;
        canvas.height = this.CANVAS_HEIGHT;
        this.context = canvas.getContext("2d");
    }
    Game.prototype.drawHealth = function () {
        var heartImage = Assets.getHeartImage();
        if (!heartImage) {
            console.error("Image cœur non trouvée");
            return;
        }
        var health = this.earth.getHealth();
        if (health <= 0)
            return; // ne rien afficher si PV à zéro
        // Dessiner le coeur en haut à gauche
        this.context.drawImage(heartImage, 10, 10, 30, 30);
        // Dessiner le texte des PV à côté
        this.context.font = "20px Arial";
        this.context.fillStyle = "red";
        this.context.fillText(health.toString(), 50, 35);
    };
    Game.prototype.getPlayer = function () {
        return this.player;
    };
    Game.prototype.getEarth = function () {
        return this.earth;
    };
    Game.prototype.start = function () {
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.player = new Player(this);
        this.instanciate(this.player);
        this.earth = new Earth(this);
        this.instanciate(this.earth);
        // Créer et instancier stars
        for (var i = 0; i < this.starCount; i++) {
            var star = new Star(this);
            this.instanciate(star);
        }
        Input.listen();
        this.loop();
    };
    Game.prototype.trySpawnAlien = function () {
        var now = Date.now();
        if (this.aliens.length < this.maxAliens && now - this.lastAlienSpawnTime > this.alienSpawnInterval) {
            var alien = new Alien(this);
            this.instanciate(alien);
            this.aliens.push(alien);
            this.lastAlienSpawnTime = now;
        }
    };
    Game.prototype.destroy = function (gameObject) {
        this.gameObject = this.gameObject.filter(function (go) { return go != gameObject; });
        if (gameObject instanceof Alien) {
            this.aliens = this.aliens.filter(function (a) { return a != gameObject; });
            this.aliensKilled++;
            // Tous les 10 aliens tués, accélère la fréquence d'apparition
            if (this.aliensKilled % 10 === 0 && this.alienSpawnInterval > 500) {
                this.alienSpawnInterval -= 300; // Réduit l'intervalle, limite la vitesse
                console.log("Nouveau rythme d'apparition :", this.alienSpawnInterval, "ms");
            }
        }
    };
    Game.prototype.instanciate = function (gameObject) {
        this.gameObject.push(gameObject);
    };
    Game.prototype.draw = function (gameObject) {
        if (!gameObject)
            return;
        this.context.drawImage(gameObject.getImage(), gameObject.getPosition().x, gameObject.getPosition().y, gameObject.getImage().width, gameObject.getImage().height);
    };
    Game.prototype.drawAlienCounter = function () {
        var text = "Aliens tu\u00E9s : ".concat(this.aliensKilled);
        this.context.font = "20px Arial";
        this.context.fillStyle = "white";
        var textWidth = this.context.measureText(text).width;
        var x = this.CANVAS_WIDTH - textWidth - 10;
        var y = 30;
        this.context.fillText(text, x, y);
    };
    Game.prototype.over = function () {
        alert("GameOver!");
        window.location.reload();
    };
    Game.prototype.loop = function () {
        var _this = this;
        setInterval(function () {
            _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.context.fillStyle = "#141414";
            _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.trySpawnAlien();
            _this.gameObject.forEach(function (go) {
                go.callUpdate();
                _this.draw(go);
            });
            // Gestion collisions
            for (var i = 0; i < _this.gameObject.length; i++) {
                for (var j = i + 1; j < _this.gameObject.length; j++) {
                    var obj1 = _this.gameObject[i];
                    var obj2 = _this.gameObject[j];
                    if (obj1.overlap(obj2)) {
                        obj1.callCollide(obj2);
                        obj2.callCollide(obj1);
                    }
                }
            }
            _this.drawAlienCounter();
            _this.drawHealth();
        }, 10);
    };
    return Game;
}());
export { Game };
