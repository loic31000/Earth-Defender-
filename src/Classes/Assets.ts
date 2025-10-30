export class Assets {
  // Classe statique fournissant les accès aux différentes images du jeu via le DOM

  public static getDefaultImage(): HTMLImageElement {
    // Récupère l'image par défaut, utilisée en cas d'absence d'image spécifique

    const image: HTMLImageElement = document.querySelector("img#asset_default");
    // Cherche dans le document HTML l'élément <img> avec l'id 'asset_default'

    if (image == null) throw Error("No assets found");
    // Si l'image n'existe pas, lance une erreur pour indiquer le problème

    return image;
    // Retourne l'image trouvée
  }

  public static getPlayerImage(): HTMLImageElement {
    // Récupère l'image représentant le joueur

    const image: HTMLImageElement = document.querySelector("img#asset_player");
    if (image == null) throw Error("No assets found");
    return image;
  }

  public static getAlienImage(): HTMLImageElement {
    // Récupère l'image représentant un alien

    const image: HTMLImageElement = document.querySelector("img#asset_alien");
    if (image == null) throw Error("No alien asset found");
    return image;
  }

  public static getStarImage(): HTMLImageElement {
    // Récupère l'image représentant une étoile pour l'arrière-plan

    const image: HTMLImageElement = document.querySelector("img#asset_star");
    if (image == null) throw Error("No star asset found");
    return image;
  }

  public static getLaserImage(): HTMLImageElement {
    // Récupère l'image du laser tiré par le joueur

    const image: HTMLImageElement = document.querySelector("img#asset_laser");
    if (image == null) throw Error("No laser asset found");
    return image;
  }

  public static getEarthImage(): HTMLImageElement {
    // Récupère l'image représentant la Terre

    const image: HTMLImageElement = document.querySelector("img#asset_earth");
    if (image == null) throw Error("No earth asset found");
    return image;
  }

  public static getHeartImage(): HTMLImageElement {
    // Récupère l'image représentant un cœur, pour afficher la santé/PV

    const image: HTMLImageElement = document.querySelector("img#asset_heart");
    if (image == null) throw Error("No heart asset found");
    return image;
  }
}
