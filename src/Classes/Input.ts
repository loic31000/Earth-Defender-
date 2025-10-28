export class Input {
    private static axisX: Direction = 0;

    public static getAxisX(): Direction { 
        return this.axisX;
    }

    public static listen() {

        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                // Vers la droite 
                case "d":
                case "D":
                    Input.axisX = 1;
                    break;
                // Vers la gauche
                case "q":
                case "Q":
                    Input.axisX = -1;
                    break;
                default:
                    break;
            }
        });

        document.addEventListener("keyup", (event) => {
            switch (event.key) {
                // Player Stops
                case "d":
                case "D":
                case "q":
                case "Q":
                    Input.axisX = 0;
                    break;

                default:
                    break;
            }
        });

    }
}

export type Direction = 0 | 1 | -1; // Type de direction