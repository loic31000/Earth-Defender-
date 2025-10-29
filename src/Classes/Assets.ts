export class Assets {
  public static getDefaultImage(): HTMLImageElement {
    // Méthode statique qui récupère l'image par défaut du DOM avec l'id 'asset_default'
    const image: HTMLImageElement = document.querySelector("img#asset_default");
    if (image == null) {
      // Si aucune image n'est trouvée, lève une erreur
      throw Error("No assets found");
    }
    return image; // Retourne l'image récupérée
  }

  public static getPlayerImage(): HTMLImageElement {
    // Méthode statique qui récupère l'image du joueur avec l'id 'asset_player'
    const image: HTMLImageElement = document.querySelector("img#asset_player");
    if (image == null) {
      throw Error("No assets found");
    }
    return image;
  }

  public static getAlienImage(): HTMLImageElement {
    // Méthode statique qui récupère l'image de l'alien avec l'id 'asset_alien'
    const image: HTMLImageElement = document.querySelector("img#asset_alien");
    if (image == null) throw Error("No alien asset found");
    return image;
  }
  
  public static getStarImage(): HTMLImageElement {
    // Méthode statique qui récupère l'image de l'étoile avec l'id 'asset_star'
    const image: HTMLImageElement = document.querySelector("img#asset_star");
    if (image == null) throw Error("No star asset found");
    return image;
  }
}

