
// Minimum Cost Perfect Matching Algorithm on Bipartite Graphs (Hungarian Algorithm)
// Worst case: O(n^2) where n is the number of vertices

class BipartiteGraph {

  // edges: string[3][], every element is an array of length 3 representing the edge and its weight (a, b, weight)
    // where a is in first (partition), b is in second (partition)
  // bipartition: string[][2], contains 2 elements for each partition of strings

  constructor(bipartition, edges) {

    // Defining the graph G = (V, E)
    this.edges = edges;
    [this.first, this.second] = bipartition;

    // For the Hungarian Algorithm
    this.edgeMatrix = this.buildEdgeMatrix();
    this.minMatrix = [...this.edgeMatrix];
    this.matchMatrix = this.edgeMatrix.map(row => row.map(val => 0));
    this.rowCover = new Set();
    this.colCover = new Set();
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

    const algoSteps = {
      1: () => this.substractMinRow(),
      2: () => this.findUniqueZero(),
    }

    let curr = 1;
    while (true) {
      console.log(curr);
      curr = algoSteps[curr]();
      if (!curr) break;
    }
  }


  substractMinRow() {

    const minRows = this.getMinRows(this.minMatrix);
    this.minMatrix = this.minMatrix.map((row, ind) => row.map(value => value - minRows[ind]));
    return 2;
  }

  getMinRows(matrix) {

    return matrix.map(row => Math.min.apply(null, row));
  }

  getMinCols(matrix) {

    if(!matrix) throw new Error('Matrix is empty.');
    const transpose = matrix[0].map((val,ind) => matrix.map(x => x[ind]));
    return this.getMinRows(transpose);
  }


  findUniqueZero() {

    this.rowCover.clear();
    this.colCover.clear();

    this.minMatrix.forEach((row, i) => {
      for(const [j, value] of row.entries()) {
        if (value === 0 && !this.rowCover.has(i) && !this.colCover.has(j)) {
          this.matchMatrix[i][j] = 1;
          this.rowCover.add(i);
          this.colCover.add(j);
          break;
        }
      }
    });

    return 0;
  }
}

// Testing: var test = new BipartiteGraph([['A', 'B', 'C'], ['X', 'Y', 'Z']], [['A', 'Y', 1],['A', 'X', 2], ['A', 'Z', 3], ['B', 'X', 6], ['B', 'Y', 5], ['B', 'Z', 4], ['C', 'X', 9], ['C', 'Y', 8], ['C', 'Z', 7]])