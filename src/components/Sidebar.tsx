import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Plus, 
  Sun, 
  Moon, 
  Download, 
  LayoutDashboard, 
  ChevronLeft, 
  ChevronRight,
  Activity,
  Settings,
  Zap,
  GitBranch,
  Trash2,
  Eye,
  EyeOff,
  Database,
  Filter,
  Target,
  Code
} from 'lucide-react';
import { Node } from 'reactflow';

interface SidebarProps {
  onAddNode: () => void;
  onAutoLayout: () => void;
  onExport: () => void;
  onClearAll: () => void;
  isValidDag: boolean;
  dagStatus: string;
  nodes: Node[];
  onNodeSelect: (nodeId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const getNodeIcon = (type: string) => {
  switch (type) {
    case 'data-source': return <Database className="w-3 h-3 sm:w-4 sm:h-4" />;
    case 'processing': return <Zap className="w-3 h-3 sm:w-4 sm:h-4" />;
    case 'filter': return <Filter className="w-3 h-3 sm:w-4 sm:h-4" />;
    case 'output': return <Target className="w-3 h-3 sm:w-4 sm:h-4" />;
    case 'config': return <Settings className="w-3 h-3 sm:w-4 sm:h-4" />;
    default: return <Code className="w-3 h-3 sm:w-4 sm:h-4" />;
  }
};

const getNodeColor = (type: string) => {
  switch (type) {
    case 'data-source': return 'text-blue-600 dark:text-blue-400';
    case 'processing': return 'text-green-600 dark:text-green-400';
    case 'filter': return 'text-yellow-600 dark:text-yellow-400';
    case 'output': return 'text-red-600 dark:text-red-400';
    case 'config': return 'text-purple-600 dark:text-purple-400';
    default: return 'text-gray-600 dark:text-gray-400';
  }
};

const Sidebar: React.FC<SidebarProps> = ({ 
  onAddNode, 
  onAutoLayout, 
  onExport, 
  onClearAll,
  isValidDag, 
  dagStatus, 
  nodes,
  onNodeSelect,
  isOpen,
  onToggle
}) => {
  const [showAllNodes, setShowAllNodes] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const displayedNodes = showAllNodes ? nodes : nodes.slice(0, 3);
  const hasMoreNodes = nodes.length > 3;

  return (
    <>
      <div className={`fixed left-0 top-0 h-full transition-all duration-300 z-40 ${isOpen ? 'w-64 sm:w-72' : 'w-0'}`}>
        <div className="h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 shadow-lg overflow-y-auto">
          {isOpen && (
            <div className="p-3 sm:p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <GitBranch className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Pipeline Editor</h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Build your DAG</p>
                </div>
              </div>

              {/* DAG Status */}
              <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg border ${isValidDag ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className={`w-4 h-4 sm:w-5 sm:h-5 ${isValidDag ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                  <span className={`text-sm sm:text-base font-medium ${isValidDag ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                    {isValidDag ? 'Valid DAG' : 'Invalid DAG'}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm ${isValidDag ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {dagStatus}
                </p>
              </div>

              {/* Node List */}
              {nodes.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Nodes ({nodes.length})
                    </h3>
                    {hasMoreNodes && (
                      <button
                        onClick={() => setShowAllNodes(!showAllNodes)}
                        className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        {showAllNodes ? (
                          <>
                            <EyeOff className="w-3 h-3" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3" />
                            View More
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-32 sm:max-h-48 overflow-y-auto">
                    {displayedNodes.map((node) => (
                      <button
                        key={node.id}
                        onClick={() => onNodeSelect(node.id)}
                        className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors text-left"
                      >
                        <div className={getNodeColor(node.data.type)}>
                          {getNodeIcon(node.data.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                            {node.data.label}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                            {node.data.type.replace('-', ' ')}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="space-y-3 sm:space-y-4 flex-1">
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">Node Operations</h3>
                  <div className="space-y-2">
                    <button
                      onClick={onAddNode}
                      className="w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                      Add Node
                    </button>
                    
                    {nodes.length > 0 && (
                      <button
                        onClick={onClearAll}
                        className="w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        Clear All
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">Layout</h3>
                  <button
                    onClick={onAutoLayout}
                    disabled={nodes.length < 2}
                    className="w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
                    Auto Layout
                  </button>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">Export</h3>
                  <button
                    onClick={onExport}
                    disabled={nodes.length === 0}
                    className="w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    Export Pipeline
                  </button>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">Settings</h3>
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
                  >
                    {theme === 'light' ? <Moon className="w-4 h-4 sm:w-5 sm:h-5" /> : <Sun className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight">
                  Use keyboard shortcuts:<br />
                  <span className="font-mono">Delete</span> to remove selected items<br />
                  <span className="font-mono">Click edge</span> to select and delete connections
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button - Fixed dark theme visibility */}
      <button
        onClick={onToggle}
        className={`fixed top-4 z-50 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${isOpen ? 'left-56 sm:left-64' : 'left-4'}`}
      >
        {isOpen ? <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />}
      </button>
    </>
  );
};

export default Sidebar;