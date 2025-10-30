import { Assets } from "../Assets.js";
// Import de la classe principale Game pour référencer le jeu courant
var GameObject = /** @class */ (function () {
    // Référence à l’instance du jeu principal, pour accéder aux propriétés globales (canvas, etc.)
    function GameObject(game) {
        this.position = {
            x: 0,
            y: 0,
        };
        // Initialise la position à (0,0) par défaut
        this.image = Assets.getDefaultImage();
        // Affecte une image par défaut provenant du gestionnaire d’Assets
        this.game = game;
        // Stocke la référence à l’objet du jeu pour interaction globale
        this.start();
        // Appelle la méthode start, à redéfinir par héritage pour initialiser l’objet après création
    }
    // Méthode pour détecter le chevauchement (collision) avec un autre objet "other" en testant les côtés
    GameObject.prototype.overlap = function (other) {
        if (this.right() < other.left() || // Cet objet est complètement à gauche de l'autre
            this.left() > other.right() || // Cet objet est complètement à droite de l'autre
            this.bottom() < other.top() || // Cet objet est complètement au-dessus de l'autre
            this.top() > other.bottom() // Cet objet est complètement en dessous de l'autre
        ) {
            return false; // Si une de ces conditions est vraie, pas de chevauchement
        }
        return true; // Sinon, il y a collision (chevauchement)
    };
    /** Méthodes utiles pour obtenir les bords de l’objet selon sa position et dimension */
    GameObject.prototype.top = function () {
        return this.position.y;
        // Coordonnée y du bord supérieur de l'objet
    };
    GameObject.prototype.bottom = function () {
        return this.position.y + this.image.height;
        // Coordonnée y du bord inférieur, calculée via la hauteur de l’image
    };
    GameObject.prototype.left = function () {
        return this.position.x;
        // Coordonnée x du bord gauche
    };
    GameObject.prototype.right = function () {
        return this.position.x + this.image.width;
        // Coordonnée x du bord droit, via la largeur de l’image
    };
    // Accesseur pour récupérer l'image affichée par cet objet
    GameObject.prototype.getImage = function () {
        return this.image;
    };
    // Accesseur pour récupérer la position actuelle (objet {x,y})
    GameObject.prototype.getPosition = function () {
        return this.position;
    };
    // Retourne la référence à l’objet Game (jeu principal)
    GameObject.prototype.getGame = function () {
        return this.game;
    };
    // Méthode pour modifier l’image affichée (changer le sprite)
    GameObject.prototype.setImage = function (image) {
        this.image = image;
    };
    // Méthode pour changer la position de l’objet (mise à jour des coordonnées)
    GameObject.prototype.setPosition = function (position) {
        this.position = position;
    };
    // Méthode destinée à être redéfinie dans les classes filles pour initialiser l’objet
    GameObject.prototype.start = function () { };
    // Méthode destinée à être redéfinie pour mettre à jour la logique de l’objet à chaque frame
    GameObject.prototype.update = function () { };
    // Méthode destinée à gérer les effets de collision avec un autre objet, à redéfinir dans les héritages
    GameObject.prototype.collide = function (other) { };
    // Méthode publique exposée appelant la méthode protégée collide (pour gestion des collisions)
    GameObject.prototype.callCollide = function (other) {
        this.collide(other);
    };
    // Méthode publique exposée appelant la méthode protégée update (mise à jour logique)
    GameObject.prototype.callUpdate = function () {
        this.update();
    };
    return GameObject;
}());
export { GameObject };
