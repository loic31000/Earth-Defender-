import { GameObject } from "./GameObject.js";
import { Input } from "../Input.js";
import { Assets } from "../Assets.js";


export class Player extends GameObject {
    private speed: number = 10;
    protected start(): void {
        this.setImage(Assets.getPlayerImage());
        this.setPosition({
            x: this.getGame().CANVAS_WIDTH / 2,
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height - 10,

        });

    }

    protected update(): void {
        this.setPosition({
            x: this.getPosition().x += this.speed*Input.getAxisX(),
            y: this.getPosition().y
        })
    }
}