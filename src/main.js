var filenames = ["assets/new-version.svg", "assets/old-version.svg"];

for (var i = 0; i < filenames.length * 2; i++) {
  // Load each file twice, one with applyMatrix = true and once with = false.
  var doApplyMatrix = Boolean(i >= filenames.length);
  var index = i % 2;

  // Load each SVG
  project.importSVG(filenames[index], {
    applyMatrix: doApplyMatrix,
    onLoad: function(didMatrix, filename, svg) {
      // didMatrix and filename are given bound by bind(this, ...)
      console.log("============== " + filename + " ==============");
      if (didMatrix)
        console.log("============== with applyMatrix = ", didMatrix);

      for (var i = 0; i < svg.children.length; i++) {
        console.log(svg.children[i].name, svg.children[i].applyMatrix);
        if (!svg.children[i] || !svg.children[i].children) continue;
        for (var j = 0; j < svg.children[i].children.length; j++) {
          console.log(
            svg.children[i].children[j].name,
            svg.children[i].children[j].applyMatrix
          );
        }
      }
    }.bind(this, doApplyMatrix, filenames[index]),
    onError: function(name, err) {
      console.error("Could not load SVG " + name, err);
    }.bind(this, filenames[index]),
    insert: true
  });
}
