
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
    this.pathRowInit = null;
    this.pathColInit = null;
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
      3: () => this.countColAssignments(),
      4: () => this.handleUncoveredZeros(),
      5: () => this.modifyAssignment(),
      6: () => this.rebalanceWeights(),
    }

    let curr = 1;

    while (true) {
      console.log(curr);
      curr = algoSteps[curr]();
      if (!curr) break;
    }
  }


  // Step 1

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


  // Step 2

  findUniqueZero() {

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

    return 3;
  }


  // Step 3

  countColAssignments() {

    this.colCover.clear();
    this.rowCover.clear();

    this.matchMatrix.forEach(row => {
      row.forEach((match, j) => {
        if(match && !this.colCover.has(j)) this.colCover.add(j);
      })
    })

    return this.colCover.size >= this.first.length ? 0 : 4;
  }


  // Step 4

  handleUncoveredZeros() {

    while(true) {
      let [row, col] = this.getUnusedZero();
      if (row === -1) return 6;

      console.log(row, col);
      
      this.matchMatrix[row][col] = 2;
      const assignedCol = this.findAssignedCol(row);
      if(assignedCol >= 0) {
        col = assignedCol;
        this.rowCover.delete(row);
        this.rowCover.add(col);
      } else {
        this.pathColInit = col;
        this.pathRowInit = row;
        return 5;
      }
    }
  }

  getUnusedZero() {

    this.minMatrix.forEach((row, i) => {
      row.forEach((value, j) => {
        if(!value && !this.rowCover.has(i) && !this.colCover.has(j)) return [i, j];
      });
    });

    return [-1, -1];
  }

  findAssignedCol(row) {

    this.matchMatrix[row].forEach((_, col) => {
      if(this.matchMatrix[row][col] === 1) return col;
    })

    return -1;
  }


  // Step 5

  modifyAssignment() {

    let count = 0;
    let path = [[this.pathRowInit, this.pathColInit]];

    while(true) {
      const assignedRow = this.findAssignedRow(path[count][1]);
      if(assignedRow < 0) break;
      path.push([assignedRow, path[count][1]]);
      count++;
    
      const unassignedCol = this.findUnassignedMinCol(path[count][0]);
      path.push([path[count][0], unassignedCol]);
      count++;
    }

    this.augmentPath(path);
    this.eraseUnassigned();

    return 3;
  }

  findAssignedRow(col) {

    this.matchMatrix.forEach((row, ind) => {
      if(row[col] === 1) return ind;
    })

    return -1;
  }

  findUnassignedMinCol(row) {
    
    this.matchMatrix[row].forEach((_, col) => {
      if(this.matchMatrix[row][col] === 2) return col;
    })

    return -1;
  }

  augmentPath(path) {

    path.forEach(([row, col]) => {
      this.matchMatrix[row][col] = (this.matchMatrix[row][col] === 1) ? 0 : 1;
    });
  }

  eraseUnassigned() {
    this.matchMatrix = this.matchMatrix.map(row => {
      return row.map(match => (match === 2) ? 0 : match);
    });
  }


  // Step 6

  rebalanceWeights() {

    console.log(this.minMatrix);
    const minWeight = this.findMinWeight();

    this.minMatrix = this.minMatrix.map((row, i) => {
      return row.map((weight, j) => {
        if(this.rowCover.has(i)) weight += minWeight;
        if(!this.colCover.has(j)) weight -= minWeight;
        return weight;
      });
    });

    // return 0;
    return 4;
  }

  findMinWeight() {

    let minValue = Number.MAX_VALUE;
    this.minMatrix.forEach((row, i) => {
      row.forEach((weight, j) => {
        if(!this.rowCover.has(i) && !this.colCover.has(j)) minValue = Math.min(minValue, weight);
      });
    });

    return minValue;
  }

}

// Testing: var test = new BipartiteGraph([['A', 'B', 'C'], ['X', 'Y', 'Z']], [['A', 'Y', 1],['A', 'X', 2], ['A', 'Z', 3], ['B', 'X', 6], ['B', 'Y', 5], ['B', 'Z', 4], ['C', 'X', 9], ['C', 'Y', 8], ['C', 'Z', 7]])