function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randomData(){
  let leftNodes = ["A", "B", "C", "D"];
  let rightNodes = ["W", "X", "Y", "Z"];
  let data = [];
  let lastIndexLeft = leftNodes.length - 1;
  let totalLeft = leftNodes.length * 100;
  
  shuffle(leftNodes);

  leftNodes.forEach((ln, leftInd) => {
    let lastIndexRight = rightNodes.length - 1;
    let init = totalRight = leftInd === lastIndexLeft ? 
      totalLeft : Math.max(60, Math.floor(totalLeft * 0.5 * Math.random()));

    shuffle(rightNodes);

    rightNodes.forEach((rn, rightInd) => {
      if (rightInd === lastIndexRight){
        data.push([ln, rn, Math.max(0, totalRight)]);
      } else {
        weight = Math.max(10, Math.floor(totalRight * 0.5 * Math.random()));
        data.push([ln, rn, weight]);
      }
      totalRight -= weight;
    });

    totalLeft -= init; 
  })

  return data
};