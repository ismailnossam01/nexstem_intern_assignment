# Pipeline Editor (DAG Builder) 🚀

A professional React-based Pipeline Editor that allows users to visually create and manage Directed Acyclic Graphs (DAGs). This tool simulates how real-time data pipelines or processing workflows are constructed using interconnected nodes.

[Pipeline Editor Demo https://nexstempipelineeditor.netlify.app/](https://nexstempipelineeditor.netlify.app/)

## 🎥 Demo Media

### 📺 Screen Recording
[Click here to watch the video demo](https://github.com/ismailnossam01/nexstem_intern_assignment/blob/main/media/Screencast%20from%202025-07-03%2022-31-26.webm)

### 📸 Screenshots

#### 🖼️ Light Mode Editor
![Light Mode](https://github.com/ismailnossam01/nexstem_intern_assignment/blob/main/media/Screenshot%20from%202025-07-03%2022-35-16.png)

#### 🌑 Dark Mode Editor
![Dark Mode](./public/screenshots/editor-dark.png)


## 🌟 Features

### Core Functionality
- **Visual Node Creation**: Add nodes with custom names and types through an intuitive compact modal interface
- **Interactive Edge Drawing**: Connect nodes with directional edges using drag-and-drop
- **Real-time DAG Validation**: Live validation with status indicators for cycle detection and connectivity
- **Node & Edge Management**: Delete nodes and connections using keyboard shortcuts or UI controls
- **Auto Layout**: Automatically arrange nodes in a clean, hierarchical layout using Dagre algorithm

### Advanced Features
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile
- **Node Types**: Six different node types with color-coded icons and descriptions
- **Sidebar Navigation**: Collapsible sidebar with node list and quick navigation
- **Export Functionality**: Export pipeline configurations as JSON files
- **Mini Map**: Overview of the entire pipeline with zoom and pan controls
- **Notifications**: Toast notifications for user actions and validation feedback

### User Experience
- **Professional UI**: Clean, modern interface with smooth animations and transitions
- **Keyboard Shortcuts**: Delete key for removing selected elements
- **Visual Feedback**: Hover states, selection indicators, and status messages
- **Mobile Optimized**: Touch-friendly interface with responsive breakpoints
- **Compact Modal**: Streamlined node creation modal that fits perfectly on all screen sizes
- **Adaptive Controls**: ReactFlow controls positioned to avoid sidebar overlap with proper dark theme support

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full TypeScript support
- **Vite** - Fast build tool and development server

### UI & Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework for rapid styling
- **Lucide React** - Beautiful, customizable SVG icons
- **CSS Grid & Flexbox** - Modern layout techniques for responsive design

### Graph Visualization
- **ReactFlow 11.10.4** - Powerful library for building interactive node-based graphs
- **Dagre 0.8.5** - Graph layout algorithm for automatic node positioning

### Development Tools
- **ESLint** - Code linting with React and TypeScript rules
- **PostCSS** - CSS processing with Autoprefixer
- **Vite Plugin React** - Fast refresh and optimized builds

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/ismailnossam01/nexstem_intern_assignment.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🎯 How It Works

### Node Management
1. **Adding Nodes**: Click "Add Node" button to open compact creation modal
2. **Node Types**: Choose from 6 predefined types (Data Source, Processing, Filter, Output, Configuration, Custom)
3. **Node Properties**: Each node has a unique ID, label, type, and position
4. **Node Selection**: Click nodes to select them, use sidebar list for navigation

### Edge Creation
1. **Connection Handles**: Nodes have source (right) and target (left) handles
2. **Drawing Edges**: Drag from source handle to target handle to create connections
3. **Connection Rules**: Prevents self-connections and invalid handle combinations
4. **Edge Selection**: Click edges to select them for deletion

### DAG Validation
The system validates the graph structure in real-time:

- **Minimum Nodes**: Must have at least 2 nodes
- **Cycle Detection**: Uses Depth-First Search (DFS) algorithm to detect cycles
- **Connectivity**: Ensures all nodes are connected to at least one edge
- **Direction Rules**: Enforces proper source-to-target connections

### Auto Layout Algorithm
Uses the Dagre library to automatically arrange nodes:

1. **Graph Analysis**: Converts ReactFlow graph to Dagre format
2. **Layout Calculation**: Applies hierarchical layout algorithm
3. **Position Update**: Updates node positions with smooth transitions
4. **View Fitting**: Automatically adjusts zoom and pan to fit all nodes

## 🏗️ Architecture & Code Structure

### Component Hierarchy
```
App.tsx
├── ThemeProvider (Context)
├── NotificationProvider (Context)
├── ReactFlowProvider
├── PipelineEditor (Main Component)
│   ├── Sidebar
│   ├── NodeCreationModal
│   ├── CustomNode
│   └── NotificationContainer
```

### Key Components

#### PipelineEditor.tsx
- Main orchestrator component
- Manages nodes and edges state
- Handles all user interactions
- Implements keyboard shortcuts
- Coordinates validation and layout
- **NEW**: Dynamic ReactFlow controls positioning based on sidebar state

#### Sidebar.tsx
- Collapsible navigation panel
- Node list with quick selection
- Control buttons for all actions
- Theme toggle and settings
- DAG status display
- **NEW**: Improved responsive design with proper state management
- **FIXED**: Dark theme visibility for toggle button

#### CustomNode.tsx
- Reusable node component
- Type-based styling and icons
- Connection handles
- Delete functionality

#### NodeCreationModal.tsx
- **UPDATED**: Compact modal for creating new nodes
- **NEW**: Optimized for mobile with smaller dimensions (max-w-xs on mobile, max-w-sm on desktop)
- **NEW**: Reduced padding and spacing for better screen utilization
- **NEW**: 2-column grid layout for node types
- **NEW**: Smaller icons and text for compact design
- Type selection interface
- Form validation
- Responsive design

### State Management
- **Local State**: Uses React hooks (useState, useEffect, useCallback)
- **Context API**: Theme and notification management
- **ReactFlow State**: Node and edge management through ReactFlow hooks
- **NEW**: Sidebar state management for proper control positioning

### Utility Functions

#### dagValidation.ts
- Implements cycle detection algorithm
- Validates graph connectivity
- Returns validation status and messages

#### autoLayout.ts
- Integrates Dagre layout algorithm
- Converts between ReactFlow and Dagre formats
- Calculates optimal node positions

#### exportUtils.ts
- Handles pipeline export functionality
- Generates JSON with metadata
- Creates downloadable files

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Actions and highlights
- **Success**: Green (#10B981) - Valid states and confirmations
- **Warning**: Yellow (#F59E0B) - Warnings and filters
- **Error**: Red (#EF4444) - Errors and deletions
- **Purple**: (#8B5CF6) - Configuration and settings
- **Gray**: Various shades for neutral elements

### Typography
- **Font Family**: System fonts (Inter, SF Pro, Segoe UI)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Font Sizes**: Responsive scaling from 12px to 24px

### Spacing System
- **Base Unit**: 4px (0.25rem)
- **Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px
- **Consistent Margins**: Applied throughout the interface

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚧 Challenges Faced & Solutions

### 1. Graph Cycle Detection
**Challenge**: Implementing efficient cycle detection for DAG validation
**Solution**: 
- Used Depth-First Search (DFS) with recursion stack tracking
- Maintained visited nodes set to avoid redundant checks
- Implemented early termination for performance optimization

```typescript
function detectCycle(nodes: Node[], edges: Edge[]): boolean {
  const graph: Record<string, string[]> = {};
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  
  // DFS implementation with cycle detection
  function dfs(nodeId: string): boolean {
    if (recursionStack.has(nodeId)) return true; // Cycle found
    if (visited.has(nodeId)) return false;
    
    visited.add(nodeId);
    recursionStack.add(nodeId);
    
    for (const neighbor of graph[nodeId] || []) {
      if (dfs(neighbor)) return true;
    }
    
    recursionStack.delete(nodeId);
    return false;
  }
}
```

### 2. Responsive Design with ReactFlow
**Challenge**: Making ReactFlow components responsive across different screen sizes
**Solution**:
- Implemented responsive breakpoints using Tailwind CSS
- Created adaptive sidebar widths and modal sizes
- Used responsive font sizes and spacing
- Optimized touch interactions for mobile devices

### 3. **NEW**: Modal Size Optimization for Mobile
**Challenge**: Original modal was too large for mobile screens, causing poor user experience
**Solution**:
- **Reduced modal dimensions**: Changed from `max-w-md` to `max-w-xs` on mobile
- **Compact grid layout**: Used 2-column grid instead of larger layouts
- **Optimized spacing**: Reduced padding from `p-6` to `p-4`
- **Smaller icons**: Reduced icon sizes from `w-5 h-5` to `w-4 h-4`
- **Streamlined content**: Simplified descriptions and button text

### 4. **FIXED**: ReactFlow Controls Positioning and Dark Theme
**Challenge**: ReactFlow controls were overlapped by the sidebar and toggle button had poor dark theme visibility
**Solution**:
- **Proper margin-based positioning**: Used `marginLeft` instead of `left` for better control positioning
- **Smooth transitions**: Implemented CSS transitions for control movement
- **Dark theme fix**: Added proper text colors and border colors for toggle button
- **Consistent spacing**: Controls now stay exactly next to the sidebar edge

```typescript
<Controls 
  style={{ 
    left: '20px',
    bottom: '20px',
    marginLeft: sidebarOpen ? '256px' : '0px',
    transition: 'margin-left 0.3s ease'
  }}
/>

// Toggle button with proper dark theme support
className="fixed top-4 z-50 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
```

### 5. State Management Complexity
**Challenge**: Managing complex state interactions between nodes, edges, and UI components
**Solution**:
- Used React Context for global state (theme, notifications)
- Leveraged ReactFlow's built-in state management hooks
- Implemented useCallback for performance optimization
- Created custom hooks for reusable logic

### 6. Auto Layout Integration
**Challenge**: Integrating Dagre layout algorithm with ReactFlow's coordinate system
**Solution**:
- Created conversion functions between ReactFlow and Dagre formats
- Implemented smooth transitions for position updates
- Added automatic view fitting after layout application
- Handled edge cases for empty or single-node graphs

### 7. Real-time Validation Performance
**Challenge**: Ensuring validation doesn't impact performance with large graphs
**Solution**:
- Implemented debounced validation using useEffect dependencies
- Optimized cycle detection algorithm for better performance
- Used memoization for expensive calculations
- Added early returns for simple validation cases

### 8. Cross-browser Compatibility
**Challenge**: Ensuring consistent behavior across different browsers
**Solution**:
- Used modern CSS features with fallbacks
- Tested on multiple browsers and devices
- Implemented vendor prefixes through Autoprefixer
- Used standardized APIs and polyfills where needed

### 9. Accessibility Considerations
**Challenge**: Making the graph interface accessible to all users
**Solution**:
- Added keyboard navigation support
- Implemented proper ARIA labels and roles
- Ensured sufficient color contrast ratios
- Added focus indicators for interactive elements

## 🔧 Configuration Files

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
      },
    },
  },
};
```

### TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx"
  }
}
```

## 📱 Mobile Optimization

### Touch Interactions
- Optimized touch targets (minimum 44px)
- Smooth scrolling and pan gestures
- Touch-friendly modal interfaces
- Responsive button sizes

### Performance
- Lazy loading for large graphs
- Optimized re-renders with React.memo
- Efficient event handling
- Minimal bundle size

### Layout Adaptations
- Collapsible sidebar for mobile
- **NEW**: Compact modal sizing for better mobile experience
- Adaptive font sizes
- Touch-optimized controls
- **FIXED**: Dynamic control positioning to avoid overlaps with proper dark theme support


## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] Node creation and deletion
- [ ] Edge drawing and removal
- [ ] DAG validation accuracy
- [ ] Auto layout functionality
- [ ] Theme switching
- [ ] Export functionality
- [ ] Responsive behavior
- [ ] Keyboard shortcuts
- [ ] **NEW**: Modal responsiveness on mobile
- [ ] **FIXED**: Control accessibility with sidebar toggle
- [ ] **FIXED**: Dark theme visibility for all UI elements

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Performance Considerations

### Optimization Techniques
- React.memo for component memoization
- useCallback for function memoization
- Efficient re-rendering strategies
- Optimized bundle splitting
- Lazy loading for large components

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

**Built with ❤️ using React, TypeScript, and modern web technologies**

### Recent Updates (v1.2)
- ✅ **Fixed Dark Theme Toggle**: Improved visibility and contrast for navbar toggle button in dark mode
- ✅ **Optimized Control Positioning**: ReactFlow controls now positioned right next to navbar edge instead of screen center
- ✅ **Enhanced Responsive Design**: Better margin-based positioning system for controls
- ✅ **Improved Accessibility**: Better color contrast and hover states for all interactive elements
- ✅ **Smooth Transitions**: Added proper CSS transitions for control movement and theme changes
