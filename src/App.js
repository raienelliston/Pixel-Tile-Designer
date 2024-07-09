import logo from './logo.svg';
import PixalCanvas from './lib/pixal_canvas';
import ToolOverlay from './lib/tool_overlay';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PixalCanvas />
        <ToolOverlay />
      </header>
    </div>
  );
}

export default App;
