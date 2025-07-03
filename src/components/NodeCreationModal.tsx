import React, { useState } from 'react';
import { X, Database, Zap, Filter, Target, Settings, Code } from 'lucide-react';

interface NodeType {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface NodeCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateNode: (name: string, type: string) => void;
}

const nodeTypes: NodeType[] = [
  {
    id: 'data-source',
    name: 'Data Source',
    icon: <Database className="w-4 h-4" />,
    color: 'bg-blue-500',
    description: 'Input data from external sources'
  },
  {
    id: 'processing',
    name: 'Processing',
    icon: <Zap className="w-4 h-4" />,
    color: 'bg-green-500',
    description: 'Transform and process data'
  },
  {
    id: 'filter',
    name: 'Filter',
    icon: <Filter className="w-4 h-4" />,
    color: 'bg-yellow-500',
    description: 'Filter data based on conditions'
  },
  {
    id: 'output',
    name: 'Output',
    icon: <Target className="w-4 h-4" />,
    color: 'bg-red-500',
    description: 'Send data to external destinations'
  },
  {
    id: 'config',
    name: 'Configuration',
    icon: <Settings className="w-4 h-4" />,
    color: 'bg-purple-500',
    description: 'Configure pipeline settings'
  },
  {
    id: 'custom',
    name: 'Custom',
    icon: <Code className="w-4 h-4" />,
    color: 'bg-gray-500',
    description: 'Custom processing logic'
  }
];

const NodeCreationModal: React.FC<NodeCreationModalProps> = ({ isOpen, onClose, onCreateNode }) => {
  const [nodeName, setNodeName] = useState('');
  const [selectedType, setSelectedType] = useState(nodeTypes[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nodeName.trim()) {
      onCreateNode(nodeName.trim(), selectedType.id);
      setNodeName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm max-h-[90vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Create Node</h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Node Name
              </label>
              <input
                type="text"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white text-sm"
                placeholder="Enter node name..."
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Node Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {nodeTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`p-2 rounded-lg border-2 transition-all hover:shadow-md ${
                      selectedType.id === type.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className={`p-1 rounded ${type.color} text-white`}>
                        {type.icon}
                      </div>
                      <span className="text-xs font-medium text-gray-900 dark:text-white">
                        {type.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight">
                        {type.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!nodeName.trim()}
                className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NodeCreationModal;