// Import de la classe de base pour tous les objets du jeu (position, image, collision, etc.)
import { Player } from "./GameObject/Player.js";
// Import de la classe spécifique du joueur, qui hérite de GameObject
import { Input } from "./Input.js";
// Module de gestion des entrées clavier/souris (déplacements, tirs...)
import { Alien } from "./GameObject/Alien.js";
// Classe représentant un alien ennemi
import { Assets } from "./Assets.js";
// Module pour charger et gérer les images/ressources graphiques
import { Star } from "./GameObject/Star.js";
// Classe pour les étoiles de l'arrière-plan, décor dynamique
import { Earth } from "./GameObject/Earth.js";
// Classe représentant la Terre à protéger (avec PV et état)
var Game = /** @class */ (function () {
    function Game() {
        // Contexte du canvas permettant de dessiner en 2D
        this.CANVAS_WIDTH = 900;
        this.CANVAS_HEIGHT = 600;
        // Instance de la Terre que le joueur doit protéger
        this.aliens = [];
        // Liste qui stocke tous les aliens présents à l'écran
        this.aliensKilled = 0;
        // Compteur du nombre d'aliens tués par le joueur
        this.maxAliens = 10;
        // Nombre maximum d'aliens simultanés autorisés à l'écran
        this.alienSpawnInterval = 2000;
        // Temps minimum (en millisecondes) entre chaque apparition d'alien
        this.lastAlienSpawnTime = 0;
        // Dernier timestamp de spawn d'un alien, pour gérer le délai
        this.starCount = 100;
        // Nombre d'étoiles à créer pour l'arrière-plan
        this.gameObject = [];
        // Initialisation du jeu : récupération du canvas HTML
        var canvas = document.querySelector("canvas");
        // Définir la taille du canvas avec les constantes
        canvas.width = this.CANVAS_WIDTH;
        canvas.height = this.CANVAS_HEIGHT;
        // Récupérer le contexte 2D pour le dessin
        this.context = canvas.getContext("2d");
    }
    // Tableau contenant tous les éléments du jeu (joueur, aliens, étoiles, etc.)
    // Méthode pour afficher la santé (PV) de la Terre sous forme d’un cœur et du texte
    Game.prototype.drawHealth = function () {
        var heartImage = Assets.getHeartImage();
        // Récupère l'image du cœur pour représenter PV
        if (!heartImage) {
            console.error("Image cœur non trouvée");
            return; // Si l'image n'est pas chargée, on arrête la fonction
        }
        var health = this.earth.getHealth();
        // Récupère la santé actuelle de la Terre
        if (health <= 0)
            return; // Si PV à zéro, ne pas dessiner le cœur
        // Dessine l’image du cœur en haut à gauche, avec dimension 30x30 pixels
        this.context.drawImage(heartImage, 10, 10, 30, 30);
        // Configure la police pour le texte (nombre de PV)
        this.context.font = "20px Arial";
        this.context.fillStyle = "red"; // Couleur du texte en rouge
        this.context.fillText(health.toString(), 50, 35); // Affiche PV à côté du cœur
    };
    Game.prototype.getPlayer = function () {
        return this.player; // Retourne l'instance du joueur
    };
    Game.prototype.getEarth = function () {
        return this.earth; // Retourne l’instance de la Terre
    };
    Game.prototype.start = function () {
        // Démarre la partie : nettoyage, création des éléments, lancement boucle
        // Nettoie le canvas et le remplit avec la couleur de fond
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414"; // Couleur sombre pour le fond
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        // Création et instanciation du joueur
        this.player = new Player(this);
        this.instanciate(this.player);
        // Création et instanciation de la Terre
        this.earth = new Earth(this);
        this.instanciate(this.earth);
        // Création d’étoiles pour l’arrière-plan pour donner un aspect dynamique
        for (var i = 0; i < this.starCount; i++) {
            var star = new Star(this);
            this.instanciate(star);
        }
        // Initialiser la gestion des entrées clavier/souris
        Input.listen();
        // Démarrer la boucle principale du jeu (mise à jour et rendu)
        this.loop();
    };
    Game.prototype.trySpawnAlien = function () {
        // Essaie de faire apparaître un alien selon certaines conditions
        var now = Date.now(); // Temps actuel en ms
        // Vérifie si le nombre d’alien est inférieur au maximum autorisé et si le délai est respecté
        if (this.aliens.length < this.maxAliens && now - this.lastAlienSpawnTime > this.alienSpawnInterval) {
            var alien = new Alien(this); // Crée un nouvel alien
            this.instanciate(alien); // L’ajoute à la liste principale d’objets
            this.aliens.push(alien); // Ajoute à la liste spécifique d’aliens
            this.lastAlienSpawnTime = now; // Met à jour le dernier temps de spawn
        }
    };
    Game.prototype.destroy = function (gameObject) {
        // Supprime un objet du jeu
        this.gameObject = this.gameObject.filter(function (go) { return go != gameObject; });
        // Retire l'objet donné de la liste
        if (gameObject instanceof Alien) {
            // Si c’est un alien, on le retire aussi de la liste des aliens
            this.aliens = this.aliens.filter(function (a) { return a != gameObject; });
            this.aliensKilled++; // Incrémenter le compteur de monstres tués
            // À chaque 10 aliens tués, on réduit le délai d’apparition pour augmenter la difficulté
            if (this.aliensKilled % 5 === 0 && this.alienSpawnInterval > 500) {
                this.alienSpawnInterval -= 300; // Diminuer l’intervalle (plus d’aliens apparaissent rapidement)
                console.log("Nouveau rythme d'apparition :", this.alienSpawnInterval, "ms");
            }
        }
    };
    Game.prototype.instanciate = function (gameObject) {
        // Ajoute un objet (joueur, alien, étoile, etc.) à la liste globale
        this.gameObject.push(gameObject);
    };
    Game.prototype.draw = function (gameObject) {
        // Dessine un objet à l’écran
        if (!gameObject)
            return; // Vérification pour sécurité
        // Dessine l’image de l’objet avec sa position et ses dimensions
        this.context.drawImage(gameObject.getImage(), gameObject.getPosition().x, gameObject.getPosition().y, gameObject.getImage().width, gameObject.getImage().height);
    };
    Game.prototype.drawAlienCounter = function () {
        // Affiche le nombre total d’aliens tués dans le coin supérieur droit
        var text = "Aliens tu\u00E9s : ".concat(this.aliensKilled); // Texte à afficher
        this.context.font = "20px Arial";
        this.context.fillStyle = "white"; // Couleur blanche
        // Mesure la largeur du texte pour la position horizontale
        var textWidth = this.context.measureText(text).width;
        var x = this.CANVAS_WIDTH - textWidth - 10; // Un peu d’espace à droite
        var y = 30; // Position en haut
        this.context.fillText(text, x, y);
    };
    Game.prototype.over = function () {
        // Fin du jeu, affiche une alerte et recharge la page
        alert("GameOver!");
        window.location.reload();
    };
    Game.prototype.loop = function () {
        // Boucle de mise à jour et d’affichage, tourne toutes les 10 ms
        var _this = this;
        setInterval(function () {
            // Efface tout et remplit avec la couleur de fond
            _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.context.fillStyle = "#141414";
            _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.trySpawnAlien();
            // Tente de faire apparaître des aliens selon le délai
            // Met à jour et dessine tous les objets du jeu
            _this.gameObject.forEach(function (go) {
                go.callUpdate(); // Logique de chaque objet
                _this.draw(go); // Dessine chaque objet
            });
            // Gestion des collisions entre tous les objets
            for (var i = 0; i < _this.gameObject.length; i++) {
                for (var j = i + 1; j < _this.gameObject.length; j++) {
                    var obj1 = _this.gameObject[i];
                    var obj2 = _this.gameObject[j];
                    if (obj1.overlap(obj2)) {
                        obj1.callCollide(obj2); // Si collision, gérer
                        obj2.callCollide(obj1);
                    }
                }
            }
            // Affiche le compteur d’aliens tués et la santé
            _this.drawAlienCounter();
            _this.drawHealth();
        }, 10); // La boucle se répète toutes les 10 millisecondes
    };
    return Game;
}());
export { Game };
