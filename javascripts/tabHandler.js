var graphTab = document.querySelector("#graph");
var algorithmTab = document.querySelector("#algorithm");

var tab1 = document.querySelector("#tab1");
var tab2 = document.querySelector("#tab2");

function goAlgoTab() {
  algorithmTab.style.display = "";
  graphTab.style.display = "none";
  tab1.classList.remove("active");
  tab2.classList.add("active");
}

function goGraphTab() {
  algorithmTab.style.display = "none";
  graphTab.style.display = "";  
  tab1.classList.add("active");
  tab2.classList.remove("active");
}