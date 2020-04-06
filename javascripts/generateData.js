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
  let lastIndex = leftNodes.length - 1;
  
  shuffle(leftNodes);

  leftNodes.forEach(ln => {
    let total = 100;
    let count = 0;

    shuffle(rightNodes);

    rightNodes.forEach(rn => {
      if (count === lastIndex){
        data.push([ln, rn, total]);
      } else {
        weight = Math.max(5, Math.floor(total*0.75*Math.random()));
        data.push([ln, rn, weight]);
      }
      total -= weight;
      count += 1;
    });
  })

  return data
};