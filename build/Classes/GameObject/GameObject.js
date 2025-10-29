import { Assets } from "../Assets.js"; // Importation du module Assets pour récupérer les images et ressources
var GameObject = /** @class */ (function () {
    function GameObject(game) {
        this.position = {
            x: 0,
            y: 0,
        }; // Initialisation de la position à (0,0)
        this.image = Assets.getDefaultImage(); // Récupère une image par défaut depuis le gestionnaire d'Assets
        this.game = game; // Stocke la référence au jeu principal transmis au constructeur
        this.start(); // Appelle la méthode start pour initialiser l'objet (peut être redéfinie par héritage)
    }
    GameObject.prototype.overlap = function (other) {
        // La condition pour vérifier si les objets ne se chevauchent pas :
        if (this.right() < other.left() || // cet objet est complètement à gauche de l'autre
            this.left() > other.right() || // cet objet est complètement à droite de l'autre
            this.bottom() < other.top() || // cet objet est complètement au-dessus de l'autre
            this.top() > other.bottom() // cet objet est complètement en dessous de l'autre
        ) {
            // Si une de ces conditions est vraie, il n'y a pas chevauchement
            return false;
        }
        // Sinon, il y a chevauchement
        return true;
    };
    /** Méthodes utilitaires pour la position du GameObject */
    GameObject.prototype.top = function () {
        return this.position.y;
    };
    GameObject.prototype.bottom = function () {
        return this.position.y + this.image.height;
    };
    GameObject.prototype.left = function () {
        return this.position.x;
    };
    GameObject.prototype.right = function () {
        return this.position.x + this.image.width;
    };
    // Méthode publique pour récupérer l'image associée à cet objet
    GameObject.prototype.getImage = function () {
        return this.image;
    };
    // Méthode publique pour récupérer la position actuelle de cet objet
    GameObject.prototype.getPosition = function () {
        return this.position;
    };
    // Méthode publique pour récupérer la référence au jeu principal
    GameObject.prototype.getGame = function () {
        return this.game;
    };
    // Méthode publique pour modifier l'image associée à cet objet
    GameObject.prototype.setImage = function (image) {
        this.image = image;
    };
    // Méthode publique pour modifier la position de l'objet
    GameObject.prototype.setPosition = function (position) {
        this.position = position;
    };
    // Méthode protégée appelée lors de l'initialisation de l'objet, prévue pour être surchargée par les classes filles
    GameObject.prototype.start = function () { };
    // Méthode protégée appelée à chaque mise à jour du jeu, à surcharger pour définir le comportement de l'objet
    GameObject.prototype.update = function () { };
    GameObject.prototype.collide = function (other) { };
    GameObject.prototype.callCollide = function (other) {
        this.collide(other);
    };
    // Méthode publique pour appeler la méthode update (permet de contrôler l'accès à la mise à jour)
    GameObject.prototype.callUpdate = function () {
        this.update();
    };
    return GameObject;
}());
export { GameObject };
