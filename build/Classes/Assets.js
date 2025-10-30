var Assets = /** @class */ (function () {
    function Assets() {
    }
    // Classe statique fournissant les accès aux différentes images du jeu via le DOM
    Assets.getDefaultImage = function () {
        // Récupère l'image par défaut, utilisée en cas d'absence d'image spécifique
        var image = document.querySelector("img#asset_default");
        // Cherche dans le document HTML l'élément <img> avec l'id 'asset_default'
        if (image == null)
            throw Error("No assets found");
        // Si l'image n'existe pas, lance une erreur pour indiquer le problème
        return image;
        // Retourne l'image trouvée
    };
    Assets.getPlayerImage = function () {
        // Récupère l'image représentant le joueur
        var image = document.querySelector("img#asset_player");
        if (image == null)
            throw Error("No assets found");
        return image;
    };
    Assets.getAlienImage = function () {
        // Récupère l'image représentant un alien
        var image = document.querySelector("img#asset_alien");
        if (image == null)
            throw Error("No alien asset found");
        return image;
    };
    Assets.getStarImage = function () {
        // Récupère l'image représentant une étoile pour l'arrière-plan
        var image = document.querySelector("img#asset_star");
        if (image == null)
            throw Error("No star asset found");
        return image;
    };
    Assets.getLaserImage = function () {
        // Récupère l'image du laser tiré par le joueur
        var image = document.querySelector("img#asset_laser");
        if (image == null)
            throw Error("No laser asset found");
        return image;
    };
    Assets.getEarthImage = function () {
        // Récupère l'image représentant la Terre
        var image = document.querySelector("img#asset_earth");
        if (image == null)
            throw Error("No earth asset found");
        return image;
    };
    Assets.getHeartImage = function () {
        // Récupère l'image représentant un cœur, pour afficher la santé/PV
        var image = document.querySelector("img#asset_heart");
        if (image == null)
            throw Error("No heart asset found");
        return image;
    };
    return Assets;
}());
export { Assets };
