var visitedNodesInOrder = [];
var nodesInShortestPathOrder = [];
var dest_row, dest_col;

function bestfs(grid, row, col) {
  const n = grid[row][col];
  n.isVisited = true;
  n.previousNode = null;
  n.distance = 0;
  var q = [];
  q.push(n);// push the start pos into the queue

  // while the queue is not empty
  while (q.length > 0) {
    var node = q.shift(); // take the front node from the queue
    sortNodesByDistance(q);
    visitedNodesInOrder.push(node);
    if (node.row === dest_row && node.col === dest_col) return;
    var unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

    for (const to of unvisitedNeighbors) {
      if (to.isWall) continue;
      if (to.isVisited === false) {
        q.push(to);
        sortNodesByDistance(q);
        to.previousNode = node;
        to.isVisited = true;
        to.distance = node.distance + 1;
      }
    }
  }
}
//give the euclid distance between two co-ordinates
function get_euclid_distance(x1, y1, x2, y2) {
  var v1 = Math.pow(x1 - x2, 2);
  v1 = v1 * v1;
  var v2 = Math.pow(y1 - y2, 2);
  v2 = v2 * v2;
  return Math.pow(v1 + v2, 0.5);
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => {
    return (
      get_euclid_distance(nodeA.row, nodeA.col, dest_row, dest_col) -
      get_euclid_distance(nodeB.row, nodeB.col, dest_row, dest_col)
    );
  });
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  //We are only concerned about the unvisited neighbors
  return neighbors.filter((node) => !node.isVisited);
}

export function solve_bestfs(grid, start_node, end_node) {
  visitedNodesInOrder = [];
  nodesInShortestPathOrder = [];
  dest_row = end_node.row;
  dest_col = end_node.col;
  bestfs(grid, start_node.row, start_node.col);
  return visitedNodesInOrder;
}

// Backtracks from the finishNode to find the shortest path.
 
export function getNodesInShortestPathOrderBestFS(end_node) {
  let currentNode = end_node;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
  //array consisting the nodes leads to the shortest path
}
