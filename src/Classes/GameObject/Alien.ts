import { Assets } from "../Assets.js"
import { GameObject } from "./GameObject.js"

export class Alien extends GameObject{
    private speed : number = 1;

    protected start(): void {
        // Définissez l'image de l'alien
        this.setImage(Assets.getAlienImage());

        
        // Faites-le apparaître à une position aléatoire dans le canvas
        // Codez ici ...
        this.setPosition({
            x: Math.random() * this.getGame().CANVAS_WIDTH,
            y: Math.random() * this.getGame().CANVAS_HEIGHT/4 - 50
        });
    }

    protected update(): void {
        // Faites avancer l'alien vers le bas du Canvas
        // Codez ici ...   
        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y += this.speed,
        }) 
    }
}
