/***************************************
 * KEYBOARD
 ***************************************/
/*
D = activer/désactiver le Displacement
S = activer/désactiver la Shadow
M = activer/désactiver le Mouvement de la souris
FLECHE GAUCHE = background précédent
FLECHE DROITE = background suivant
ESPACE ou 2 = skipper une animation, possible de garder appuyé
1 = activer/désactiver la présence du sticker
 */

/***************************************
 * PREFERENCES
 ***************************************/
var OPTIONS = {
  SEEDS: {
    // aquatic: {
    //   name: "aquatic",
    //   displacement: "mapWater"
    // },
    // vine: {
    //   name: "vine",
    //   displacement: "mapWind"
    // },
    cactus: {
      name: "cactus",
      displacement: "mapHeat"
    }
  },
  WORLDS: {
    plants: {
      name: "plants",
      seed: "aquatic",
      svgName: "assets/plantes06-halffull.svg",
      svgAdultName: "plante",
      positioningType: "attach", // Peut être : attach / outside / inside / path
      anchorWorld: "plants",
      worldsToDodge: ["plants"],
      morphingEnabled: true,
      texturesFrom: 1,
      texturesTo: 4,
      fadingTexturesPerPlant: 2,
      itemScale: 1.0,
      getMorphDuration: function(numberOfPlants) {
        var d = numberOfPlants * 600 + 4000;
        return Math.min(d, 10000);
      },
      getSpawnInterval: function(numberOfPlants) {
        var add = Math.max(7 - numberOfPlants, 1) * 300;
        return add + Math.random() * Math.random() * Math.random() * 8000;
      }
    },
    leafs: {
      name: "leafs",
      seed: "vine",
      svgName: "assets/plantes06-halffull.svg",
      svgAdultName: "plante",
      positioningType: "attach", // Peut être : attach / outside / inside / path
      anchorWorld: "leafs",
      worldsToDodge: ["leafs"],
      morphingEnabled: true,
      texturesFrom: 1,
      texturesTo: 4,
      fadingTexturesPerPlant: 2,
      itemScale: 1.0,
      getMorphDuration: function(numberOfPlants) {
        var d = numberOfPlants * 600 + 4000;
        return Math.min(d, 10000);
      },
      getSpawnInterval: function(numberOfPlants) {
        var add = Math.max(7 - numberOfPlants, 1) * 300;
        return add + Math.random() * Math.random() * Math.random() * 8000;
      }
    },
    cactuses: {
      name: "cactuses",
      seed: "cactus",
      svgName: "assets/plantes06-halffull-illustratorV.svg",
      svgAdultName: "plante",
      positioningType: "grouped",
      withAnchor: false,
      anchorWorld: "cactuses",
      worldsToDodge: [],
      morphingEnabled: true,
      loopMorphing: false,
      texturesFrom: 7,
      texturesTo: 8,
      fadingTexturesPerPlant: 3,
      itemScale: 0.8,
      getMorphDuration: function() {
        return 3000;
      },
      getSpawnInterval: function() {
        return 2500;
      }
    },
    flowers: {
      name: "flowers",
      seed: "vine",
      svgName: "assets/svg/Stars_Baby_Point_New.svg",
      svgAdultName: "star",
      positioningType: "inside",
      anchorWorld: "leafs",
      worldsToDodge: ["flowers"],
      morphingEnabled: true,
      texturesFrom: 7,
      texturesTo: 8,
      fadingTexturesPerPlant: 1,
      itemScale: 0.25,
      getMorphDuration: function() {
        return 5000;
      },
      getSpawnInterval: function() {
        return 1500;
      }
    }
    // lianes: {
    //   name: "lianes",
    //   svgName: "assets/svg/lianes01.svg",
    //   svgAdultName: "star",
    //   positioningType: "stretch",
    //   morphingEnabled: false,
    //   outlineAnimation: true,
    //   texturesFrom: 7,
    //   texturesTo: 8,
    //   fadingTexturesPerPlant: 1,
    //   itemScale: 1
    // }
    // marines: {
    //   name: "marines",
    //   svgName: "assets/svg/Fish_Point.svg",
    //   svgAdultName: "fish",
    //   positioningType: "path",
    //   morphingEnabled: false,
    //   texturesFrom: 5,
    //   texturesTo: 6,
    //   fadingTexturesPerPlant: 2,
    //   itemScale: 0.8,
    //   getMorphDuration: function() {
    //     return 5000;
    //   },
    //   getSpawnInterval: function() {
    //     return 1500;
    //   }
    // }
  },
  SEED_NAMES: [],
  // File loading
  numberOfTextures: 17,
  textureSubfolder: "03",
  textureExtension: "jpg",
  svgPath: "assets/svg/path02.svg",
  // Textures
  textureFadeDuration: 8 * 1000,
  // Growth
  growthElasticity: 0, // Entre 0 et 1000
  growthEasing: "easeOutSine", // growthElasticity doit être égal à zéro pour que ça ait un effet
  // Background
  firstBackgroundId: "gradient03", // Une des id dans index.html
  backgroundColor: "black",
  slideBackgroundColor: "white",
  // Interaction
  useTogglePresence: true,
  useMouseMove: false,
  useClick: false,
  stickerDelay: 1000,
  firstPlantWithCursor: false,
  // Effects
  dropShadowEnabled: true,
  displacementEnabled: true,
  displacementFiles: [
    { name: "mapWater", url: "assets/textures/displacement_map.png" },
    { name: "mapWind", url: "assets/textures/displacement_map_wind01.png" },
    { name: "mapHeat", url: "assets/textures/displacement_map_heat01.jpg" }
  ],
  displacementScaleX: 30,
  displacementScaleY: 30,
  transparentPixiCanvas: true
};

/***************************************
 * PREFERENCES UN PEU PLUS AVANCEES
 ***************************************/
// Remplace les getSpawnInterval vides par getMorphDuration.
for (var name in OPTIONS.WORLDS) {
  if (OPTIONS.WORLDS.hasOwnProperty(name)) {
    var W = OPTIONS.WORLDS[name];
    if (!W.getSpawnInterval) W.getSpawnInterval = W.getMorphDuration;
  }
}

// Générer une liste des noms des graines
for (var seedName in OPTIONS.SEEDS) {
  if (OPTIONS.SEEDS.hasOwnProperty(seedName)) {
    OPTIONS.SEED_NAMES.push(seedName);
  }
}

// Générer le nom des fichiers.
OPTIONS.textureFiles = [];
for (let i = 0; i < OPTIONS.numberOfTextures; i++) {
  let file = "assets/textures/" + OPTIONS.textureSubfolder + "/";
  file += String(i + 1);
  file += "." + OPTIONS.textureExtension;
  OPTIONS.textureFiles.push(file);
}

// Gérer les résolutions d'écrans
OPTIONS.resolutionZoom = window.innerWidth / 1920;
OPTIONS.plantScale *= OPTIONS.resolutionZoom;
OPTIONS.displacementScaleX *= OPTIONS.resolutionZoom;
OPTIONS.displacementScaleY *= OPTIONS.resolutionZoom;
