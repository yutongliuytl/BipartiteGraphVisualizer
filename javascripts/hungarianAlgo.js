
// Minimum Cost Perfect Matching Algorithm on Bipartite Graphs (Hungarian Algorithm)
// Worst case: O(n^2) where n is the number of vertices

class BipartiteGraph {


  // vertices: string[], every element is a string vertex
  // edges: string[2][], every element is an array of length 2 representing the edge
  // bipartition: string[][2], contains 2 elements for each partition of strings

  constructor(vertices, edges, bipartition) {
    this.vertices = vertices;
    this.edges = edges;
    [ this.first, this.second ] = bipartition;
  }


  // Output: A minimum cost perfect matching or a deficient set

  HungarianAlgo() {

    let matchings = [];
  }
}