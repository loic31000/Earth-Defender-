import { GameObject } from "./GameObject/GameObject.js"; // Importation de la classe GameObject depuis son fichier
import { Player } from "./GameObject/Player.js"; // Importation de la classe Player depuis son fichier
import { Input } from "./Input.js"; // Importation du module Input pour gérer les entrées utilisateur
import { Alien } from "./GameObject/Alien.js"; // Importation de la classe Alien depuis son fichier
// import { Assets } from "./Assets.js";
import { Star } from "./GameObject/Star.js";
var Game = /** @class */ (function () {
    // Constructeur appelé lors de la création d'une nouvelle instance de Game
    function Game() {
        this.CANVAS_WIDTH = 900; // Largeur fixe du canvas en pixels
        this.CANVAS_HEIGHT = 600; // Hauteur fixe du canvas en pixels
        this.nbAliens = 10; // Nombre d'aliens à instancier
        this.nbStars = 100;
        // Tableaux
        this.gameObject = []; // Tableau contenant tous les objets de type GameObject du jeu
        var canvas = document.querySelector("canvas"); // Sélectionne l'élément <canvas> dans le DOM
        canvas.width = this.CANVAS_WIDTH; // Définit la largeur du canvas dans le DOM
        canvas.height = this.CANVAS_HEIGHT; // Définit la hauteur du canvas dans le DOM
        this.context = canvas.getContext("2d"); // Récupère le contexte 2D pour dessiner sur le canvas
    }
    Game.prototype.start = function () {
        // Méthode pour initialiser le dessin et démarrer le jeu
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT); // Efface toute la zone du canvas (nettoyage initial)
        this.context.fillStyle = "#141414"; // Définit la couleur de remplissage (gris foncé)
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT); // Remplit tout le canvas avec la couleur définie
        var gameObject = new GameObject(this); // Création d'un objet générique du jeu
        this.player = new Player(this); // Création de l'objet joueur
        this.draw(gameObject); // Dessine l'objet générique
        this.draw(this.player); // Dessine le joueur
        Input.listen(); // Active l'écoute des entrées utilisateur (clavier/souris)
        this.loop(); // Lance la boucle principale du jeu (mise à jour & dessin en continu)
        this.alien = new Alien(this); // Création d'un objet alien générique
        this.draw(this.alien); // Dessine l'alien créé
        this.star = new Star(this); // Création d'un objet star générique
        this.draw(this.star); // Dessine la star créé
        this.instanciate(this.player); // Ajoute le joueur au tableau des objets du jeu
        // Boucle pour instancier et ajouter plusieurs aliens au jeu
        for (var i = 0; i < this.nbAliens; i++) {
            this.instanciate(new Alien(this)); // Crée un nouvel alien et l'ajoute au tableau gameObject
        }
        for (var i = 0; i < this.nbStars; i++) {
            this.instanciate(new Star(this));
        }
    };
    // Méthode publique pour ajouter un objet GameObject au tableau des objets du jeu
    Game.prototype.instanciate = function (gameObject) {
        this.gameObject.push(gameObject); // Ajoute le gameObject dans le tableau
    };
    // Méthode privée pour dessiner un objet du jeu sur le canvas
    Game.prototype.draw = function (gameObject) {
        this.context.drawImage(gameObject.getImage(), // Récupère l'image à dessiner pour cet objet
        gameObject.getPosition().x, // Coordonnée x de la position de l'objet
        gameObject.getPosition().y, // Coordonnée y de la position de l'objet
        gameObject.getImage().width, // Largeur de l'image à dessiner
        gameObject.getImage().height // Hauteur de l'image à dessiner
        );
    };
    // Boucle principale du jeu, exécutée toutes les 10 millisecondes
    Game.prototype.loop = function () {
        var _this = this;
        setInterval(function () {
            console.log("Frame!"); // Affiche "Frame!" dans la console à chaque itération (utile pour debug)
            // Nettoyage du canvas avant redessin
            _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT); // Efface tout le canvas
            _this.context.fillStyle = "#141414"; // Réapplique la couleur de fond
            _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT); // Remplit le canvas avec la couleur de fond
            _this.player.callUpdate(); // Met à jour la logique du joueur (position, état, etc.)
            _this.draw(_this.player); // Dessine le joueur mis à jour
            _this.alien.callUpdate(); // Met à jour la logique d'un alien générique
            _this.draw(_this.alien); // Dessine cet alien
            _this.star.callUpdate(); // Met à jour la logique d'une star générique
            _this.draw(_this.star);
            // Met à jour et dessine tous les autres objets stockés dans gameObject
            _this.gameObject.forEach(function (go) {
                go.callUpdate(); // Mise à jour de chaque objet
                _this.draw(go); // Dessin de chaque objet sur le canvas
            });
        }, 10); // Intervalle de 10 millisecondes entre chaque frame (environ 100 FPS)
    };
    return Game;
}());
export { Game };
