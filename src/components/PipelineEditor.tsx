import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Connection,
  Edge,
  Node,
  ConnectionMode,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useNotifications } from '../contexts/NotificationContext';
import { validateDAG } from '../utils/dagValidation';
import { getLayoutedElements } from '../utils/autoLayout';
import { exportPipeline } from '../utils/exportUtils';
import Sidebar from './Sidebar';
import NodeCreationModal from './NodeCreationModal';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const PipelineEditor: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { addNotification } = useNotifications();
  const { fitView } = useReactFlow();

  // DAG validation
  const validation = validateDAG(nodes, edges);

  // Handle connection creation
  const onConnect = useCallback((params: Connection) => {
    // Prevent self-connections
    if (params.source === params.target) {
      addNotification({
        type: 'error',
        message: 'Cannot connect node to itself'
      });
      return;
    }

    const newEdge = {
      ...params,
      id: `edge-${Date.now()}`,
      animated: true,
      style: { stroke: '#6366f1', strokeWidth: 2 }
    };

    setEdges((eds) => addEdge(newEdge, eds));
    
    addNotification({
      type: 'success',
      message: 'Connection created successfully'
    });
  }, [setEdges, addNotification]);

  // Handle node creation
  const handleCreateNode = (name: string, type: string) => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { 
        label: name,
        type: type,
        onDelete: handleDeleteNode
      },
    };

    setNodes((nds) => nds.concat(newNode));
    
    addNotification({
      type: 'success',
      message: `Node "${name}" created successfully`
    });
  };

  // Handle node deletion
  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter(node => node.id !== nodeId));
    setEdges((eds) => eds.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    
    addNotification({
      type: 'success',
      message: 'Node deleted successfully'
    });
  }, [setNodes, setEdges, addNotification]);

  // Handle clear all
  const handleClearAll = useCallback(() => {
    if (nodes.length === 0 && edges.length === 0) {
      addNotification({
        type: 'info',
        message: 'Pipeline is already empty'
      });
      return;
    }

    setNodes([]);
    setEdges([]);
    
    addNotification({
      type: 'success',
      message: 'Pipeline cleared successfully'
    });
  }, [nodes.length, edges.length, setNodes, setEdges, addNotification]);

  // Handle node selection from sidebar
  const handleNodeSelect = useCallback((nodeId: string) => {
    setNodes((nds) => 
      nds.map((node) => ({
        ...node,
        selected: node.id === nodeId
      }))
    );
    
    // Find the node and center view on it
    const selectedNode = nodes.find(node => node.id === nodeId);
    if (selectedNode) {
      fitView({ 
        nodes: [selectedNode], 
        padding: 0.3,
        duration: 800
      });
    }
  }, [setNodes, nodes, fitView]);

  // Handle auto layout
  const handleAutoLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
    
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    
    setTimeout(() => {
      fitView({ padding: 0.1 });
    }, 100);
    
    addNotification({
      type: 'success',
      message: 'Auto layout applied'
    });
  }, [nodes, edges, setNodes, setEdges, fitView, addNotification]);

  // Handle export
  const handleExport = useCallback(() => {
    exportPipeline(nodes, edges, validation.isValid);
    
    addNotification({
      type: 'success',
      message: 'Pipeline exported successfully'
    });
  }, [nodes, edges, validation.isValid, addNotification]);

  // Handle edge click for selection
  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    event.stopPropagation();
    setEdges((eds) => 
      eds.map((e) => ({
        ...e,
        selected: e.id === edge.id
      }))
    );
  }, [setEdges]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        const selectedNodes = nodes.filter(node => node.selected);
        const selectedEdges = edges.filter(edge => edge.selected);
        
        if (selectedNodes.length > 0) {
          setNodes((nds) => nds.filter(node => !node.selected));
          setEdges((eds) => eds.filter(edge => 
            !selectedNodes.some(node => edge.source === node.id || edge.target === node.id)
          ));
          
          addNotification({
            type: 'success',
            message: `${selectedNodes.length} node(s) deleted`
          });
        }
        
        if (selectedEdges.length > 0) {
          setEdges((eds) => eds.filter(edge => !edge.selected));
          
          addNotification({
            type: 'success',
            message: `${selectedEdges.length} connection(s) deleted`
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges, setNodes, setEdges, addNotification]);

  // Update validation notifications
  useEffect(() => {
    if (nodes.length > 0) {
      addNotification({
        type: validation.isValid ? 'success' : 'warning',
        message: validation.message,
        duration: 2000
      });
    }
  }, [validation.isValid, validation.message, nodes.length, addNotification]);

  return (
    <div className="w-full h-screen bg-gray-50 dark:bg-gray-900 relative">
      <Sidebar
        onAddNode={() => setIsModalOpen(true)}
        onAutoLayout={handleAutoLayout}
        onExport={handleExport}
        onClearAll={handleClearAll}
        isValidDag={validation.isValid}
        dagStatus={validation.message}
        nodes={nodes}
        onNodeSelect={handleNodeSelect}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className={`h-full transition-all duration-300 ${sidebarOpen ? 'ml-64 sm:ml-72' : 'ml-0'}`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          className="bg-gray-50 dark:bg-gray-900"
        >
          <Background 
            color="#6366f1" 
            gap={20} 
            className="dark:opacity-20"
          />
          <Controls 
            position="bottom-left"
            className="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-lg"
            style={{ 
              left: sidebarOpen ? '20px' : '20px',
              bottom: '20px',
              marginLeft: sidebarOpen ? '256px' : '0px',
              transition: 'margin-left 0.3s ease'
            }}
          />
          <MiniMap 
            nodeColor={(node) => {
              const nodeType = node.data?.type || 'custom';
              switch (nodeType) {
                case 'data-source': return '#3b82f6';
                case 'processing': return '#10b981';
                case 'filter': return '#f59e0b';
                case 'output': return '#ef4444';
                case 'config': return '#8b5cf6';
                default: return '#6b7280';
              }
            }}
            className="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-lg"
            position="bottom-right"
          />
        </ReactFlow>
      </div>

      <NodeCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateNode={handleCreateNode}
      />
    </div>
  );
};

export default PipelineEditor;