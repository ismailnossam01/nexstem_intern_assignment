import { Node, Edge } from 'reactflow';

export interface PipelineExport {
  nodes: Node[];
  edges: Edge[];
  metadata: {
    exportDate: string;
    nodeCount: number;
    edgeCount: number;
    isValid: boolean;
  };
}

export function exportPipeline(nodes: Node[], edges: Edge[], isValid: boolean): void {
  const exportData: PipelineExport = {
    nodes,
    edges,
    metadata: {
      exportDate: new Date().toISOString(),
      nodeCount: nodes.length,
      edgeCount: edges.length,
      isValid
    }
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  const exportFileDefaultName = `pipeline_${new Date().toISOString().split('T')[0]}.json`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}