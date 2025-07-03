import { Node, Edge } from 'reactflow';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export function validateDAG(nodes: Node[], edges: Edge[]): ValidationResult {
  // Check minimum nodes
  if (nodes.length < 2) {
    return {
      isValid: false,
      message: 'DAG must have at least 2 nodes'
    };
  }

  // Check if all nodes are connected
  const connectedNodes = new Set<string>();
  edges.forEach(edge => {
    connectedNodes.add(edge.source);
    connectedNodes.add(edge.target);
  });

  const unconnectedNodes = nodes.filter(node => !connectedNodes.has(node.id));
  if (unconnectedNodes.length > 0) {
    return {
      isValid: false,
      message: `${unconnectedNodes.length} node(s) are not connected`
    };
  }

  // Check for cycles using DFS
  const hasCycle = detectCycle(nodes, edges);
  if (hasCycle) {
    return {
      isValid: false,
      message: 'Cycle detected in the graph'
    };
  }

  return {
    isValid: true,
    message: 'Valid DAG - All nodes connected, no cycles detected'
  };
}

function detectCycle(nodes: Node[], edges: Edge[]): boolean {
  const graph: Record<string, string[]> = {};
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  // Build adjacency list
  nodes.forEach(node => {
    graph[node.id] = [];
  });

  edges.forEach(edge => {
    if (graph[edge.source]) {
      graph[edge.source].push(edge.target);
    }
  });

  // DFS to detect cycle
  function dfs(nodeId: string): boolean {
    if (recursionStack.has(nodeId)) {
      return true; // Cycle found
    }
    
    if (visited.has(nodeId)) {
      return false;
    }

    visited.add(nodeId);
    recursionStack.add(nodeId);

    for (const neighbor of graph[nodeId] || []) {
      if (dfs(neighbor)) {
        return true;
      }
    }

    recursionStack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) {
        return true;
      }
    }
  }

  return false;
}