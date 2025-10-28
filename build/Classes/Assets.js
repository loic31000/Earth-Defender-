var Assets = /** @class */ (function () {
    function Assets() {
    }
    Assets.getDefaultImage = function () {
        var image = document.querySelector("img#asset_default");
        if (image == null) {
            throw Error("No assets found");
        }
        return image;
    };
    Assets.getPlayerImage = function () {
        var image = document.querySelector("img#asset_player");
        if (image == null) {
            throw Error("No assets found");
        }
        return image;
    };
    return Assets;
}());
export { Assets };
