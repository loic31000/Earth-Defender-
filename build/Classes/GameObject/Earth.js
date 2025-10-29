var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Assets } from "../Assets.js";
import { GameObject } from "./GameObject.js";
import { Alien } from "./Alien.js";
var Earth = /** @class */ (function (_super) {
    __extends(Earth, _super);
    function Earth() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.health = 3;
        return _this;
    }
    Earth.prototype.getHealth = function () {
        return this.health;
    };
    Earth.prototype.start = function () {
        this.setImage(Assets.getEarthImage());
        this.getImage().width = this.getGame().CANVAS_WIDTH; // couvre toute la largeur du canvas
        this.getImage().height = 80; // taille fixe
        this.setPosition({
            x: 0,
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height
        });
    };
    Earth.prototype.collide = function (other) {
        if (other instanceof Alien) {
            this.health = Math.max(0, this.health - 1);
            console.log("Terre touch\u00E9e, PV restant : ".concat(this.health));
            this.getGame().destroy(other);
            if (this.health === 0) {
                this.getGame().over();
            }
        }
    };
    return Earth;
}(GameObject));
export { Earth };
