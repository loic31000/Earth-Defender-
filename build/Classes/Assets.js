var Assets = /** @class */ (function () {
    function Assets() {
    }
    Assets.getDefaultImage = function () {
        // Méthode statique qui récupère l'image par défaut du DOM avec l'id 'asset_default'
        var image = document.querySelector("img#asset_default");
        if (image == null) {
            // Si aucune image n'est trouvée, lève une erreur
            throw Error("No assets found");
        }
        return image; // Retourne l'image récupérée
    };
    Assets.getPlayerImage = function () {
        // Méthode statique qui récupère l'image du joueur avec l'id 'asset_player'
        var image = document.querySelector("img#asset_player");
        if (image == null) {
            throw Error("No assets found");
        }
        return image;
    };
    Assets.getAlienImage = function () {
        // Méthode statique qui récupère l'image de l'alien avec l'id 'asset_alien'
        var image = document.querySelector("img#asset_alien");
        if (image == null)
            throw Error("No alien asset found");
        return image;
    };
    Assets.getStarImage = function () {
        // Méthode statique qui récupère l'image de l'étoile avec l'id 'asset_star'
        var image = document.querySelector("img#asset_star");
        if (image == null)
            throw Error("No star asset found");
        return image;
    };
    return Assets;
}());
export { Assets };
