import React from 'react';
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import PipelineEditor from './components/PipelineEditor';
import NotificationContainer from './components/NotificationContainer';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ReactFlowProvider>
          <div className="w-full h-screen">
            <PipelineEditor />
            <NotificationContainer />
          </div>
        </ReactFlowProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;