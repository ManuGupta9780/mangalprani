import * as constants from "../Pvisual/Constants";
import { dijkstras, getNodesInShortestPathOrder } from "./dijkstra2";
import { solve_dfs, getNodesInShortestPathOrderDFS } from "./DFS";
import { solve_bfs, getNodesInShortestPathOrderBFS } from "./BFS2";

import { solve_mbfs, getNodesInShortestPathOrderMBFS } from "./BFSmultiple";// for bidirectional BFS

import { solve_astar, getNodesInShortestPathOrderASTAR } from "./Astar";
import {
  solve_bestfs,
  getNodesInShortestPathOrderBestFS,
} from "./BestFirstSearch";

function get_paths(
  state_grid,
  start_row,
  start_col,
  end_row,
  end_col,
  algo_type
) {
  var grid = JSON.parse(JSON.stringify(state_grid));
  var start_node = grid[start_row][start_col];
  var end_node = grid[end_row][end_col];
  var visitedNodesInOrder = [];
  var nodesInShortestPathOrder = [];
//call for switching the path finding algo
  switch (algo_type) {
    case constants.DIJK: {
      visitedNodesInOrder = dijkstras(grid, start_node, end_node);
      nodesInShortestPathOrder = getNodesInShortestPathOrder(end_node);
      break;
    }
    case constants.DFS_NORM: {
      visitedNodesInOrder = solve_dfs(grid, start_node, end_node, 1);
      nodesInShortestPathOrder = getNodesInShortestPathOrderDFS();
      break;
    }
    case constants.DFS_RAND: {
      visitedNodesInOrder = solve_dfs(grid, start_node, end_node, 0);
      nodesInShortestPathOrder = getNodesInShortestPathOrderDFS();
      break;
    }
    case constants.BFS: {
      visitedNodesInOrder = solve_bfs(grid, start_node, end_node);
      nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(end_node);
      break;
    }
    case constants.BESTFS: {
      visitedNodesInOrder = solve_bestfs(grid, start_node, end_node);
      nodesInShortestPathOrder = getNodesInShortestPathOrderBestFS(end_node);
      break;
    }
    case constants.MBFS: {
      visitedNodesInOrder = solve_mbfs(grid, start_node, end_node);
      nodesInShortestPathOrder = getNodesInShortestPathOrderMBFS();
      break;
    }
    case constants.ASTAR: {
      visitedNodesInOrder = solve_astar(grid, start_node, end_node);
      nodesInShortestPathOrder = getNodesInShortestPathOrderASTAR(end_node);
      break;
    }
    default:
      break;
  }

  return [visitedNodesInOrder, nodesInShortestPathOrder];
    //return the path both the visited node as well as the shortest one
}

function middle_case(
  state_grid,
  start_row,
  start_col,
  end_row,
  end_col,
  mid_row,
  mid_col,
  algo_type
) {
  var visitedNodesInOrder = [];
  var visitedNodesInOrder2 = [];
  var nodesInShortestPathOrder = [];
  var nodesInShortestPathOrder2 = [];
  var ret;

  ret = get_paths(
    state_grid,
    start_row,
    start_col,
    mid_row,
    mid_col,
    algo_type
  );
  visitedNodesInOrder = ret[0];
  nodesInShortestPathOrder = ret[1];

  ret = get_paths(state_grid, mid_row, mid_col, end_row, end_col, algo_type);
  visitedNodesInOrder2 = ret[0];
  nodesInShortestPathOrder2 = ret[1];

  for (let i in visitedNodesInOrder2) {
    visitedNodesInOrder.push(visitedNodesInOrder2[i]);
  }
  for (let i in nodesInShortestPathOrder2) {
    nodesInShortestPathOrder.push(nodesInShortestPathOrder2[i]);
  }

  return [visitedNodesInOrder, nodesInShortestPathOrder];
}

export function solve_algorithm(
  state_grid,
  start_row,
  start_col,
  end_row,
  end_col,
  mid_row,
  mid_col,
  algo_type
) {
  if (mid_row === -1) {
    return get_paths(
      state_grid,
      start_row,
      start_col,
      end_row,
      end_col,
      algo_type
    );
  } else {
    return middle_case(
      state_grid,
      start_row,
      start_col,
      end_row,
      end_col,
      mid_row,
      mid_col,
      algo_type
    );
  }
}
