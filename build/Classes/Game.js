import { GameObject } from "./GameObject/GameObject.js"; // Importe la classe GameObject
import { Player } from "./GameObject/Player.js"; // Importe la classe Player (héritée de GameObject)
import { Input } from "./Input.js"; // Importe le module Input pour gérer les entrées utilisateur (clavier/souris)
import { Alien } from "./GameObject/Alien.js"; // Importe la classe Alien (héritée de GameObject)
// import { Assets } from "./Assets.js";
import { Star } from "./GameObject/Star.js"; // Importe la classe Star (héritée de GameObject)
import { Earth } from "./GameObject/Earth.js";
var Game = /** @class */ (function () {
    // Constructeur de la classe Game
    function Game() {
        this.CANVAS_WIDTH = 900; // Largeur fixe du canvas en pixels
        this.CANVAS_HEIGHT = 600; // Hauteur fixe du canvas en pixels
        this.nbAliens = 10; // Nombre d’aliens à créer dans le jeu
        this.nbStars = 100; // Nombre de stars à créer
        // Tableau pour stocker tous les GameObjects du jeu
        this.gameObject = [];
        var canvas = document.querySelector("canvas"); // Sélectionne la balise canvas du DOM
        canvas.width = this.CANVAS_WIDTH; // Définit la largeur du canvas
        canvas.height = this.CANVAS_HEIGHT; // Définit la hauteur du canvas
        this.context = canvas.getContext("2d"); // Récupère le contexte de dessin 2D du canvas
    }
    // Méthode pour démarrer le jeu et initialiser objets & affichage
    Game.prototype.start = function () {
        // Nettoie la zone du canvas (avant début du jeu)
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414"; // Choisit une couleur de fond (gris foncé)
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT); // Remplit le canvas avec cette couleur
        var gameObject = new GameObject(this); // Crée un GameObject générique
        this.player = new Player(this); // Crée le joueur
        this.draw(gameObject); // Dessine le GameObject générique
        this.draw(this.player); // Dessine le joueur
        Input.listen(); // Active la gestion des entrées clavier / souris
        this.loop(); // Lance la boucle principale du jeu (mise à jour et dessin répétés)
        this.alien = new Alien(this); // Crée un alien générique
        this.draw(this.alien); // Dessine l'alien
        this.star = new Star(this); // Crée une star générique
        this.draw(this.star); // Dessine la star
        this.earth = new Earth(this);
        this.draw(this.earth);
        this.instanciate(this.earth);
        this.instanciate(this.player); // Ajoute le joueur au tableau des GameObjects
        // Ajoute plusieurs aliens dans le tableau via une boucle
        for (var i = 0; i < this.nbAliens; i++) {
            this.instanciate(new Alien(this)); // Crée et ajoute un alien
        }
        // Ajoute plusieurs stars dans le tableau via une boucle
        for (var i = 0; i < this.nbStars; i++) {
            this.instanciate(new Star(this)); // Crée et ajoute une star
        }
    };
    // Méthode publique pour récupérer l'instance du joueur
    Game.prototype.getPlayer = function () {
        return this.player;
    };
    Game.prototype.getEarth = function () {
        return this.earth;
    };
    // Supprimer gameObject du tableau de gameObjects
    Game.prototype.destroy = function (gameObject) {
        this.gameObject = this.gameObject.filter(function (go) { return go != gameObject; }); // Filtre et enlève l'objet spécifié
    };
    // Méthode publique pour ajouter un GameObject au tableau gameObject
    Game.prototype.instanciate = function (gameObject) {
        this.gameObject.push(gameObject); // Ajoute le GameObject au tableau
    };
    // Méthode privée pour dessiner un GameObject sur le canvas
    Game.prototype.draw = function (gameObject) {
        if (!gameObject)
            return; // Ne dessine rien si l'objet est undefined
        this.context.drawImage(gameObject.getImage(), gameObject.getPosition().x, gameObject.getPosition().y, gameObject.getImage().width, gameObject.getImage().height);
    };
    // Méthode publique qui affiche une alerte "GameOver" et recharge la page
    Game.prototype.over = function () {
        alert("GameOver!"); // Affiche un message à l'utilisateur
        window.location.reload(); // Recharge la page web pour redémarrer le jeu
    };
    // Boucle principale du jeu appelée toutes les 10 millisecondes (~100 fois par seconde)
    Game.prototype.loop = function () {
        var _this = this;
        setInterval(function () {
            console.log("Frame!"); // Affiche "Frame!" dans la console pour debug
            // Nettoyage du canvas avant de redessiner tous les objets
            _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.context.fillStyle = "#141414"; // Applique la couleur de fond
            _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT); // Remplit le canvas
            _this.player.callUpdate(); // Met à jour la logique du joueur (position, état, etc.)
            _this.draw(_this.player); // Dessine le joueur après mise à jour
            _this.alien.callUpdate(); // Met à jour la logique de l’alien générique
            _this.draw(_this.alien); // Dessine l'alien
            _this.star.callUpdate(); // Met à jour la logique de la star générique
            _this.draw(_this.star); // Dessine la star
            // this.earth.callUpdate();
            _this.draw(_this.earth);
            // Pour chaque GameObject dans gameObject
            _this.gameObject.forEach(function (go) {
                go.callUpdate(); // Mise à jour de son état / position
                _this.draw(go); // Dessine l'objet après mise à jour
                // Pour chaque autre GameObject, teste si ils se chevauchent et ne sont pas le même objet
                _this.gameObject.forEach(function (other) {
                    if (other != go && go.overlap(other)) {
                        console.log("Deux GameObject différents se touchent"); // Message debug
                        go.callCollide(other); // Appelle la méthode de collision du GameObject
                    }
                });
            });
        }, 10);
    };
    return Game;
}());
export { Game };
