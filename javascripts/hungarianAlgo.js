
// Minimum Cost Perfect Matching Algorithm on Bipartite Graphs (Hungarian Algorithm)
// Worst case: O(n^2) where n is the number of vertices

class BipartiteGraph {

  // edges: string[3][], every element is an array of length 3 representing the edge and its weight (a, b, weight)
    // where a is in first (partition), b is in second (partition)
  // bipartition: string[][2], contains 2 elements for each partition of strings

  constructor(bipartition, edges) {

    this.edges = edges;
    [ this.first, this.second ] = bipartition;
    this.edgeMatrix = this.buildEdgeMatrix();
  }

  
  // Creates the edge matrix used in the Hungarian Algorithm

  buildEdgeMatrix() {

    let matrix = [];
    this.first.forEach(vertex => {
      const edges = this.edges.filter(edge => edge.includes(vertex)).sort().map(edge => edge[2]);
      matrix.push(edges);
    });

    return matrix;
  }


  // Output: A minimum cost perfect matching or a deficient set

  HungarianAlgo() {

    let matchings = [];
    let minMatrix = [...this.edgeMatrix];

    const minRows = this.getMinRows(minMatrix);
    minMatrix = minMatrix.map((row, ind) => row.map(value => value - minRows[ind]));
    console.log(minMatrix);
    const minCols = this.getMinCols(minMatrix);
    console.log(minRows, minCols);
  }


  getMinRows(matrix) {
    return matrix.map(row => Math.min.apply(null, row));
  }

  
  getMinCols(matrix) {
    
    if(!matrix) throw new Error('Matrix is empty.');
    const transpose = matrix[0].map((val,ind) => matrix.map(x => x[ind]));
    return this.getMinRows(transpose);
  }
}