// Graph Nodes

const leftNodes = ["A", "B", "C", "D"];
const rightNodes = ["W", "X", "Y", "Z"];


function shuffle(a) {

  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


function randomData(){

  let leftNodesData = [...leftNodes];
  let rightNodesData = [...rightNodes];
  let data = [];
  let lastIndexLeft = leftNodesData.length - 1;
  let totalLeft = leftNodesData.length * 100;
  
  shuffle(leftNodesData);

  leftNodesData.forEach((ln, leftInd) => {
    let lastIndexRight = rightNodesData.length - 1;
    let init = totalRight = leftInd === lastIndexLeft ? 
      totalLeft : Math.max(60, Math.floor(totalLeft * 0.5 * Math.random()));

    shuffle(rightNodesData);

    rightNodesData.forEach((rn, rightInd) => {
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