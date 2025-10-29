import { Assets } from "../Assets.js"; // Importation du module Assets pour récupérer les images et ressources
var GameObject = /** @class */ (function () {
    function GameObject(game) {
        this.position = {
            x: 0,
            y: 0,
        }; // Initialise la position de l'objet aux coordonnées (0, 0)
        this.image = Assets.getDefaultImage(); // Affecte une image par défaut tirée du gestionnaire d’Assets
        this.game = game; // Stocke la référence au jeu principal passé au constructeur
        this.start(); // Appelle la méthode start, prévue pour initialiser objet et à redéfinir dans les classes héritées
    }
    GameObject.prototype.overlap = function (other) {
        // Vérifie si cet objet ne se chevauche pas avec un autre GameObject "other" en testant les côtés
        if (this.right() < other.left() || // Cet objet est entièrement à gauche de l'autre (pas de chevauchement horizontal)
            this.left() > other.right() || // Cet objet est entièrement à droite de l'autre (pas de chevauchement horizontal)
            this.bottom() < other.top() || // Cet objet est totalement au-dessus de l'autre (pas de chevauchement vertical)
            this.top() > other.bottom() // Cet objet est totalement en dessous de l'autre (pas de chevauchement vertical)
        ) {
            return false; // Si une de ces conditions est vraie, aucun chevauchement n'a lieu
        }
        return true; // Sinon, les objets se chevauchent
    };
    /** Méthodes utilitaires pour obtenir les bords du GameObject */
    GameObject.prototype.top = function () {
        return this.position.y; // Retourne la coordonnée y en haut de l'objet
    };
    GameObject.prototype.bottom = function () {
        return this.position.y + this.image.height; // Coordonnée y en bas, calculée avec la hauteur de l'image
    };
    GameObject.prototype.left = function () {
        return this.position.x; // Coordonnée x à gauche de l'objet
    };
    GameObject.prototype.right = function () {
        return this.position.x + this.image.width; // Coordonnée x à droite, calculée avec la largeur de l'image
    };
    // Méthode publique pour obtenir l'image affichée de cet objet
    GameObject.prototype.getImage = function () {
        return this.image;
    };
    // Méthode publique pour obtenir la position actuelle de l'objet
    GameObject.prototype.getPosition = function () {
        return this.position;
    };
    // Méthode publique pour récupérer la référence au jeu principal
    GameObject.prototype.getGame = function () {
        return this.game;
    };
    // Méthode publique pour modifier l'image affichée de l'objet
    GameObject.prototype.setImage = function (image) {
        this.image = image;
    };
    // Méthode publique pour changer la position de l'objet
    GameObject.prototype.setPosition = function (position) {
        this.position = position;
    };
    // Méthode protégée appelée lors de l'initialisation, prévue pour être redéfinie dans les classes filles
    GameObject.prototype.start = function () { };
    // Méthode protégée appelée à chaque mise à jour du jeu, à surcharger selon le comportement voulu
    GameObject.prototype.update = function () { };
    // Méthode protégée prévue pour gérer la collision entre ce GameObject et un autre 
    GameObject.prototype.collide = function (other) { };
    // Méthode publique permettant d'appeler la méthode protégée collide 
    GameObject.prototype.callCollide = function (other) {
        this.collide(other);
    };
    // Méthode publique permettant d'appeler la méthode update (contrôle d’accès)
    GameObject.prototype.callUpdate = function () {
        this.update();
    };
    return GameObject;
}());
export { GameObject };
