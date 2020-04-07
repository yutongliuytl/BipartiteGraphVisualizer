var w = window.innerWidth;
var h = window.innerHeight;

var mobile = w >= 1000 ? false:true;
label_dist = mobile ? 25:50;

var color = {A:"#82E0AA", B:"#5DADE2",  C:"#BB8FCE", D:"#16A085"};
var svg = d3.select("svg").attr("width", w).attr("height", h*.8);

var bP = viz.biPartite()
  .data(randomData())
  .min(12)
  .pad(1)
  .height(h*.65)
  .width(w*.7)
  .barSize(35)
  .fill(d=>color[d.primary])

var g = d3.select("g").attr("class","graph").call(bP);

d3.select(self.frameElement).style("height", "800px");

g.selectAll(".viz-biPartite-mainBar")
  .on("mouseover",mouseover)
  .on("mouseout",mouseout);

g.selectAll(".viz-biPartite-mainBar").append("text").attr("class","group")
  .attr("x",d=>(d.part=="primary"? -label_dist:label_dist))
  .attr("y",d=>+6)
  .text(d=>d.key)
  .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

g.selectAll(".viz-biPartite-mainBar").append("text").attr("class","percent")
  .attr("x",d=>(d.part=="primary"? -label_dist*1.5: label_dist*1.5))
  .attr("y",d=>+6)
  .text(function(d){ return d3.format("0.0%")(d.percent)})
  .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));


function mouseover(d){

  bP.mouseover(d);
  
  g.selectAll(".viz-biPartite-mainBar").select(".percent")
  .text(function(d){ return d3.format("0.0%")(d.percent)});
}

function mouseout(d){

  bP.mouseout(d);
  
  g.selectAll(".viz-biPartite-mainBar").select(".percent")
  .text(function(d){ return d3.format("0.0%")(d.percent)});
}
d3.select(self.frameElement).style("height", "800px");


function update(){
  g.call(bP.data(randomData()))

  g.selectAll(".viz-biPartite-mainBar")
    .on("mouseover",mouseover)
    .on("mouseout",mouseout);
  
  g.selectAll(".viz-biPartite-mainBar").append("text").attr("class","group")
    .attr("x",d=>(d.part=="primary"? -label_dist:label_dist))
    .attr("y",d=>+6)
    .text(d=>d.key)
    .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

  g.selectAll(".viz-biPartite-mainBar").append("text").attr("class","percent")
    .attr("x",d=>(d.part=="primary"? -label_dist*1.5: label_dist*1.5))
    .attr("y",d=>+6)
    .text(function(d){ return d3.format("0.0%")(d.percent)})
    .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
}

