import React from 'react';
import { Handle, Position } from 'reactflow';
import { Database, Zap, Filter, Target, Settings, Code, X } from 'lucide-react';

interface CustomNodeProps {
  data: {
    label: string;
    type: string;
    onDelete: (id: string) => void;
  };
  id: string;
  selected: boolean;
}

const getNodeConfig = (type: string) => {
  switch (type) {
    case 'data-source':
      return {
        icon: <Database className="w-4 h-4" />,
        bgColor: 'bg-blue-500',
        borderColor: 'border-blue-500',
        textColor: 'text-blue-600',
        bgLight: 'bg-blue-50',
        bgDark: 'dark:bg-blue-900/20'
      };
    case 'processing':
      return {
        icon: <Zap className="w-4 h-4" />,
        bgColor: 'bg-green-500',
        borderColor: 'border-green-500',
        textColor: 'text-green-600',
        bgLight: 'bg-green-50',
        bgDark: 'dark:bg-green-900/20'
      };
    case 'filter':
      return {
        icon: <Filter className="w-4 h-4" />,
        bgColor: 'bg-yellow-500',
        borderColor: 'border-yellow-500',
        textColor: 'text-yellow-600',
        bgLight: 'bg-yellow-50',
        bgDark: 'dark:bg-yellow-900/20'
      };
    case 'output':
      return {
        icon: <Target className="w-4 h-4" />,
        bgColor: 'bg-red-500',
        borderColor: 'border-red-500',
        textColor: 'text-red-600',
        bgLight: 'bg-red-50',
        bgDark: 'dark:bg-red-900/20'
      };
    case 'config':
      return {
        icon: <Settings className="w-4 h-4" />,
        bgColor: 'bg-purple-500',
        borderColor: 'border-purple-500',
        textColor: 'text-purple-600',
        bgLight: 'bg-purple-50',
        bgDark: 'dark:bg-purple-900/20'
      };
    default:
      return {
        icon: <Code className="w-4 h-4" />,
        bgColor: 'bg-gray-500',
        borderColor: 'border-gray-500',
        textColor: 'text-gray-600',
        bgLight: 'bg-gray-50',
        bgDark: 'dark:bg-gray-900/20'
      };
  }
};

const CustomNode: React.FC<CustomNodeProps> = ({ data, id, selected }) => {
  const config = getNodeConfig(data.type);

  return (
    <div className={`relative min-w-[160px] rounded-lg shadow-md border-2 transition-all hover:shadow-lg ${
      selected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
    } ${config.borderColor} ${config.bgLight} ${config.bgDark} dark:border-gray-600`}>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded ${config.bgColor} text-white`}>
              {config.icon}
            </div>
            <span className={`text-xs font-medium ${config.textColor} dark:text-gray-300`}>
              {data.type.replace('-', ' ').toUpperCase()}
            </span>
          </div>
          <button
            onClick={() => data.onDelete(id)}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
          >
            <X className="w-3 h-3 text-red-500" />
          </button>
        </div>
        
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {data.label}
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
    </div>
  );
};

export default CustomNode;