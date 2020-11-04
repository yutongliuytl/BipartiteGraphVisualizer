const w = window.innerWidth;
const h = window.innerHeight;

const mobile = w >= 1000 ? false:true;
const label_dist = mobile ? 25:50;

const color = {A:"#FFCC88", B:"#82E0AA",  C:"#61ABFF", D:"#BB8FCE"};
const svg = d3.select("svg").attr("width", w).attr("height", h*.8);

let graphData = randomData();

const bP = viz.biPartite()
  .data(graphData)
  .min(12)
  .pad(1)
  .height(h*.65)
  .width(w*.7)
  .barSize(35)
  .fill(d => color[d.primary])

const g = d3.select("g").attr("class","graph").call(bP);

d3.select(self.frameElement).style("height", "800px");

g.selectAll(".viz-biPartite-mainBar")
  .on("mouseover", mouseover)
  .on("mouseout", mouseout);

g.selectAll(".viz-biPartite-mainBar").append("text").attr("class","group")
  .attr("x", d => (d.part=="primary" ? -label_dist:label_dist))
  .attr("y", d => +6) // half of font-size
  .text(d => d.key)
  .attr("id", d => d.key)
  .attr("text-anchor", d => (d.part === "primary" ? "end":"start"));

g.selectAll(".viz-biPartite-mainBar").append("text").attr("class","value")
  .attr("x", d => (d.part=="primary"? -label_dist*1.5: label_dist*1.5))
  .attr("y", d => +6) // half of font-size
  .text(d => d.value)
  .attr("id", d => `${d.key}-val`)
  .attr("text-anchor", d => (d.part === "primary"? "end" : "start"));


function mouseover(d){

  bP.mouseover(d);
  
  g.selectAll(".viz-biPartite-mainBar").select(".value")
  .text(d => d.value);
}

function mouseout(d){

  bP.mouseout(d);
  
  g.selectAll(".viz-biPartite-mainBar").select(".value")
  .text(d => d.value);
}
d3.select(self.frameElement).style("height", "800px");


function update(){
  graphData = randomData();
  g.call(bP.data(graphData));

  g.selectAll(".viz-biPartite-mainBar")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);
  
  g.selectAll(".viz-biPartite-mainBar").append("text").attr("class","group")
    .attr("x", d => (d.part === "primary" ? -label_dist:label_dist))
    .attr("y", d => +6)
    .text(d => d.key)
    .attr("id", d => d.key)
    .attr("text-anchor", d => (d.part === "primary" ? "end":"start"));

  g.selectAll(".viz-biPartite-mainBar").append("text").attr("class","value")
    .attr("x", d => (d.part === "primary" ? -label_dist*1.5:label_dist*1.5))
    .attr("y", d => +6)
    .text(d => d.value)
    .attr("id", d => `${d.key}-val`)
    .attr("text-anchor", d => (d.part === "primary" ? "end":"start"));
}

